import { columns } from "@/_Components/Data_Table/Column_Detail";
import { DataTable } from "@/_Components/Data_Table/page";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { fetchData, updateData } from "@/redux/Hooks/Thunk";
import { I_Order } from "@/Types/Type";
import { CircleCheck } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export default function Detail_Item() {
  const [searchParams] = useSearchParams();
  const id_order = searchParams.get('id') ?? undefined
  const { data, status } = useSelector((data: any) => data?.order);
  const disPath = useDispatch<any>()
  useEffect(() => {
    disPath(fetchData({
      id: id_order,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjgwMDcwMzQ1ZGQ0ZmI0MzM5MDg2NjgiLCJpYXQiOjE3MjUxMDQyODMsImV4cCI6MTcyNTE5MDY4M30.oo14LEpoc6shbXeJgVrYRdiW-vrg1FjTbSD1qUdxWnY'
    }))
  }, [disPath, id_order]);

  function change_status_item(id: string | number, status: string | number) {
    const dataBody = {
      id_order: id,
      status: status,
      user_id: '6680070345dd4fb433908668'
    }
    disPath(updateData(dataBody))
  }

  if (status === 'loading') {
    return <span>Loading...</span>
  }

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
        return <span className='flex items-center text-sky-500'>Giao thành công<CircleCheck className='h-4' /></span>;
      case 6:
        return <span className='text-red-500'>ĐÃ HỦY</span>;
      default: return;
    }
  }

  function btn_change_status_item_order(item: I_Order, status: number | string, status_item_order: string | number) {
    console.log(item)
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <Button className={`${status_item_order === 5 ? 'bg-green-500 hover:!bg-green-700' : 'bg-red-500 hover:!bg-red-700'} rounded h-auto text-xs`}>
            {status_item_order === 5 ? 'Xác nhận giao hàng thành công' : 'Hoàn về'}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {
                status_item_order === 5 ? `Xác nhận đơn hàng ${item?.code_order} đã được giao thành công tới tay khách hàng?` :
                  status_item_order === 6 && `Xác nhận hoàn đơn hàng ${item?.code_order} về kho?`
              }
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction className="bg-green-500" onClick={() => change_status_item(item?._id, status_item_order)}>Xác nhận</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return (
    <div className='rounded bg-white py-10 -translate-y-7'>
      <strong className='text-xl'>Chi tiết đơn hàng</strong>
      <div className='mt-6'>
        <span className='text-sm flex gap-x-3'>Trạng thái: {status_order(data?.data_order_by_id?.status_item_order)}</span>
        <div className='-translate-y-8'>
          {
            data?.data_order_by_id &&
            <DataTable data={data?.data_order_by_id?.items_order} columns={columns} />
          }
        </div>
        <div className='text-sm mt-2 pt-6 border-t'>
          <span>Thông tin khách hàng</span>
          <div className='my-2 flex flex-col gap-y-2 *:grid *:grid-cols-[150px_auto]'>
            <span>Tên: <p>{data?.data_order_by_id?.infor_user?.name_user}</p></span>
            <span>Số điện thoại: <p>{data?.data_order_by_id?.infor_user?.phone}</p></span>
            <span>Email: <p>{data?.data_order_by_id?.infor_user?.email_user}</p></span>
            <span>Địa chỉ: <p>{data?.data_order_by_id?.infor_user?.address}</p></span>
          </div>
        </div>
        <div className='flex justify-center mt-10'>
          {
            (data?.data_order_by_id?.status_item_order === '4') &&
            <div className='flex gap-2'>
              {/* Confirm don hang */}
              {btn_change_status_item_order(data?.data_order_by_id, 4, 5)}
              {/* Tu choi don hang */}
              {btn_change_status_item_order(data?.data_order_by_id, 6, 6)}
            </div>
          }
        </div>
      </div>
    </div>
  )
}

