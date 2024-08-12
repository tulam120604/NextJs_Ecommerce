'use client';

import { useCheck_user, useToken } from '@/src/app/_lib/Custome_Hooks/User';
import { List_Order_Dashboard } from '@/src/app/_lib/Tanstack_Query/Order/Query_order';
import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots';
import { DataTable } from '@/src/app/_Components/ui/Tables/data_table';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import React, { Suspense } from 'react'
import Loading from './loading';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/src/app/_Components/ui/dialog/alert-dialog';
import { Button } from '@/src/app/_Components/ui/Shadcn/button';
import { Mutation_Order } from '@/src/app/_lib/Tanstack_Query/Order/Mutation_order';

const Page = () => {
  const token = useToken();
  const role_user = ['admin_global', 'admin_local'];
  const user = useCheck_user();
  let id_seller: string | undefined;
  if (!role_user.includes(user?.check_email?.role)) {
    if (user?.check_email?.role === 'seller') {
      id_seller = user?.check_email?._id
    }
  }
  const { data, isLoading } = List_Order_Dashboard(token?.accessToken, id_seller);
  if (isLoading) {
    return <Loading />
  }

  // update status order
  // const mutation_status_order = Mutation_Order('UPDATE_STATUS');
  function change_status(id_item: string, status: number) {
    // mutation_status_order.mutate({
    //   order_id: id_item,
    //   status_item_order: status,
    //   action: 'admin'
    // })
  }

  // if (mutation_status_order?.isLoading) {
  //   return <Loading_Dots />
  // }

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
        return <span className='text-green-500'>Giao thành công</span>;
      case 6:
        return <span className='text-red-500'>ĐÃ HỦY</span>;
      default: return;
    }
  }

  const columns: ColumnDef<any>[] = [
    {
      cell: ({ row }) => (
        <div className='flex flex-col gap-y-2'>
          <span>Tên : {row?.original?.infor_user?.name_user}</span>
          <span>Địa chỉ : {row?.original?.infor_user?.address}</span>
          <span>SĐT : {row?.original?.infor_user?.phone}</span>
          <span>Email : {row?.original?.infor_user?.email_user}</span>
        </div>
      ),
      'header': "Khách hàng"
    },
    {
      cell: ({ row }) => (
        row?.original?.items_order?.map((item: any) => {
          return (<div key={item?.product_id?._id} className='flex items-center gap-x-4'>
            <Image width={70} height={100} className='h-[90px] rounded' src={item?.product_id?.feature_product} alt='Loading...' />
            <div className='flex flex-col gap-y-1'>
              <span className='max-w-[200px] line-clamp-1'>{item?.product_id?.short_name}</span>
              <span className='text-red-500'>{item?.price_item?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
              <span>X {item?.quantity}</span>
              <span className='text-red-500'>{item?.total_price_item?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
            </div>
          </div>)
        })
      ),
      'header': "Đơn hàng"
    },
    {
      cell: ({ row }) => (
        <div className='flex flex-col gap-y-2'>
          <span>Ngày đặt : {row?.original?.date_time}</span>
          <span>Mã đơn : {row?.original?.code_order}</span>
        </div>
      ),
      'header': "Thông tin"
    },
    {
      cell: ({ row }) => (
        status_order(row?.original?.status_item_order)
      ),
      'header': "Trạng thái"
    },
    {
      cell: ({ row }) => (row?.original?.status_item_order !== '5' && row?.original?.status_item_order !== '6') &&
        <div className='flex gap-x-2'>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button className="bg-green-500 hover:!bg-green-700">Xác nhận</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Xác nhận đơn hàng {row?.original?.code_order}?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction className="bg-green-500" onClick={() => change_status(row?.original?._id, 2)}>Xác nhận</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button className="bg-red-500 hover:!bg-red-700">Từ chối</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Từ chối đơn hàng {row?.original?.code_order}?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction className="bg-red-500" onClick={() => change_status(row?.original?._id, 6)}>Từ chối</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>,
      'header': "Thao tác"
    }
  ]
  return (
    <Suspense fallback={<div className="w-screen h-screen fixed top-0 left-0 grid place-items-center"><Loading_Dots /></div>}>
      <div className="flex flex-col gap-y-6 py-6 rounded">
        <strong className="text-gray-200 lg:text-2xl">Đơn hàng</strong>
        <div className="text-gray-200">
          {
            data?.data_order ?
              <DataTable data={data?.data_order?.docs} columns={columns} /> :
              <span>không thể xác minh danh tính</span>
          }
        </div>
      </div>
    </Suspense>
  )
}

export default Page