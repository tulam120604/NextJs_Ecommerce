'use client'

import { Query_Order } from '@/src/app/_lib/Tanstack_Query/Order/Query_order'
import React from 'react'
import { Button } from "@/src/app/Components/ui/Shadcn/button"
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import Link from "next/link"
import { Mutation_Order } from '@/src/app/_lib/Tanstack_Query/Order/Mutation_order'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from '@/src/app/Components/ui/alert-dialog'
import { useRouter } from 'next/navigation'
import { DataTable } from '@/src/app/Components/ui/Tables/data_table'

const Page = () => {
  const routing = useRouter();
  let user_id: any;
  if (typeof window !== 'undefined') {
    if (!localStorage.getItem('account')) {
    }
    const user = JSON.parse(localStorage.getItem('account') || '{}');
    user_id = user?.check_email?._id;
  }
  const data = Query_Order(user_id);
  const mutation_order = Mutation_Order('UPDATE_STATUS');
  function status_order(item: any) {
    switch (+item) {
      case 1:
        return <span>Chờ xác nhận</span>;
      case 2:
        return <span>Đã xác nhận</span>;
      case 3:
        return <span>Đang chuẩn bị hàng</span>;
      case 4:
        return <span>Đang vận chuyển</span>;
      case 5:
        return <span className='text-green-500'>Đơn hàng đã được giao thành công</span>;
      case 6:
        return <span className='text-red-500'>ĐÃ HỦY</span>;
      default: return;
    }
  }
  function cancle_order(id_order: any) {
    const dataClient = {
      id_user: user_id,
      item: {
        order_id: id_order,
        status_item_order: 6
      }
    }
    mutation_order.mutate(dataClient);
  }
  function restore_by_order(item: any) {
    sessionStorage.removeItem('item_order')
    const restore_buy_item_order = {
      items: Object.values(item?.items_order),
      user_id: user_id,
      action: 'restore_buy_item',
      id_order: item?._id,
    };
    sessionStorage.setItem('item_order', JSON.stringify(restore_buy_item_order))
    routing.push('/order')
  }
  const columns: ColumnDef<any>[] = [
    {
      cell: ({ row }) => (
        <Link href={'/' + row?.original?.product_id?._id} className="flex gap-x-4 lg:gap-x-8">
          <Image width={100} height={100} loading="lazy" className="w-[100px] h-[100px] border" src={row?.original?.product_id?.feature_product} alt="Loading..." />
          <div className="w-full flex flex-col gap-y-3">
            <span className="line-clamp-2">{row?.original?.product_id?.short_name}</span>
            {
              (row?.original?.color_item || row?.original?.size_attribute_item) &&
              <span className="text-sm">Phân loại : {row?.original?.color_item} - {row?.original?.size_attribute_item}</span>
            }
          </div>
        </Link>
      ),
      header: " ",
    },
    {
      cell: ({ row }) => (
        <div className="flex flex-col gap-y-2">
          <span className="text-red-600">{row?.original?.price_item?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
          <div className="text-center">X {row?.original?.quantity}</div>
          <span className="text-red-600">{row?.original?.total_price_item?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
        </div>
      ),
      header: " ",
    },
  ]
  //  hidden_scroll_x

  return (
    <div className='w-full relative'>
      <div className='flex hidden_scroll_x z-[1] gap-x-10 overflow-x-auto absolute w-full *:px-2 items-center *:bg-none *:text-sm *:py-3 bg-[#F2F7FF] *:border-b-2 *:border-[#F2F7FF] *:whitespace-nowrap'>
        <button className='hover:border-gray-900 !border-gray-900'>Tất cả ({data?.data?.totalItems && data?.data?.totalItems})</button>
        <button className='hover:border-gray-900'>Chờ xác nhận ({data?.data?.totalItems && data?.data?.totalItems1})</button>
        <button className='hover:border-gray-900'>Đã xác nhận ({data?.data?.totalItems && data?.data?.totalItems2})</button>
        <button className='hover:border-gray-900'>Đang chuẩn bị hàng ({data?.data?.totalItems && data?.data?.totalItems3})</button>
        <button className='hover:border-gray-900'>Đang vận chuyển ({data?.data?.totalItems && data?.data?.totalItems4})</button>
        <button className='hover:border-gray-900'>Giao thành công ({data?.data?.totalItems && data?.data?.totalItems5})</button>
        <button className='hover:border-gray-900'>Đã hủy ({data?.data?.totalItems && data?.data?.totalItems6})</button>
      </div>

      <div className='pt-20'>
        {
          data ?
            data?.data?.data_order?.docs?.map((item: any) =>
              <div className='shadow py-2 mb-6 px-4 lg:px-8' key={item?._id}>
                <span className='px-1 py-2 text-sm'>{status_order(item?.status_item_order)}</span>
                <div className='*:!border-none *:text-gray-900'>
                  <DataTable data={item?.items_order} columns={columns} />
                </div>
                <div key={+item?._id + Math.random()} className='flex justify-end'>
                  {
                    (+item?.status_item_order === 6) ?
                      <Button onClick={() => restore_by_order(item)} className="px-3 py-2 text-sm rounded text-white">Mua lại</Button> :
                      <AlertDialog>
                        <AlertDialogTrigger className="px-3 py-2 text-sm bg-red-500 hover:bg-red-700 rounded text-white">
                          Hủy
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className='text-sm'>Xác nhận hủy đơn hàng {item?.code_order}</AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Hủy</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-500" onClick={() => cancle_order(item?._id)}>Xác nhận</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                  }
                </div>
              </div>
            )
            :
            <div className='grid place-items-center translate-y-full'>
              <div className='flex flex-col items-center gap-y-6'>
                <Image width={100} height={100} src='/Images/document_icon.png' alt=''></Image>
                <span className='flex items-center'>Chưa có đơn hàng nào! <Link className='underline' href={'/shops'}>Đi mua ngay</Link></span>
              </div>
            </div>
        }
      </div>

    </div>)
}

export default Page