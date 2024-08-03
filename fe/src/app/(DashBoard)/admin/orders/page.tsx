'use client';

import useToken from '@/src/app/_lib/Custome_Hooks/Token';
import { List_Order_Dashboard } from '@/src/app/_lib/Tanstack_Query/Order/Query_order';
import { DataTable } from '@/src/app/Components/ui/Tables/data_table';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import React from 'react'

const Page = () => {
  const token = useToken();
  const { data } = List_Order_Dashboard(token.accessToken);


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
          console.log(item);
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
    }
    ,
    {
      cell: ({ row }) => (
        status_order(row?.original?.status_item_order)
      ),
      'header': "Trạng thái"
    }
  ]
  return (
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
  )
}

export default Page