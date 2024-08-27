import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function status_order(item: any) {
    switch (+item) {
        case 1:
            return <span>Chờ xác nhận</span>;
        case 2:
            return <span className='flex items-center text-green-500'><CircleCheck className='h-4' />Đã xác nhận</span>;
        case 3:
            return <span>Đang chuẩn bị hàng</span>;
        case 4:
            return <span>Đang vận chuyển</span>;
        case 5:
            return <span className='flex items-center text-sky-500'><CircleCheck className='h-4' />Giao thành công</span>;
        case 6:
            return <span className='text-red-500'>ĐÃ HỦY</span>;
        default: return;
    }
}

export const columns: ColumnDef<any>[] = [
    {
        cell: ({ row }) => (
            <div className='flex flex-col gap-y-2 text-sm'>
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
                    <Image width={70} height={100} className='h-[90px] rounded border' src={item?.product_id?.gallery[0]} alt='Loading...' />
                    <div className='flex flex-col gap-y-1 *:text-sm'>
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
                <span>Ngày đặt : {row?.original?.date_time?.slice(0, 10)}</span>
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
        cell: ({ row }) =>
            <Link href={`orders/detail_order?id=${row?.original?._id}`} className='hover:text-sky-600 text-sky-500 underline duration-100'>Chi tiết</Link>
        ,
        'header': "Thao tác"
    }
]