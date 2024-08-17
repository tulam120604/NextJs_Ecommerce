/* eslint-disable @next/next/no-img-element */
'use client';

import Link from "next/link"
import { Suspense, useEffect } from "react";
import Loading from "./_component/loading";
import { Query_List_Items_Dashboard } from "@/src/app/_lib/Tanstack_Query/Items/query";
import Image from "next/image"
import { Mutation_Items } from "@/src/app/_lib/Tanstack_Query/Items/mutationFn";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/src/app/_Components/ui/alert-dialog";
import Pagination_Component from "./_component/Pagination";
import { ChevronUp, Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCheck_user, useToken } from "@/src/app/_lib/Custome_Hooks/User";
import Loading_Dots from "@/src/app/_Components/Loadings/Loading_Dots";
import io from 'socket.io-client';
import { Auth_Wrap_Seller } from "../_Auth_Wrap/Page";


const Page = () => {
  let id_user;
  const socket = io('http://localhost:3000');
  const token = useToken();
  const user = useCheck_user();
  const searchParams = useSearchParams();
  const role_user = ['admin_global', 'admin_local'];
  let page = Number(searchParams.get('_page')) ?? 1;
  if (!role_user.includes(user?.check_email?.role)) {
    if (user?.check_email?.role === 'seller') {
      id_user = user?.check_email?._id
    }
  }
  const { data, isLoading } = Query_List_Items_Dashboard(token.accessToken, page, 10, id_user);
  const { on_Submit } = Mutation_Items({
    action: "REMOVE"
  });
  // close socket 
  useEffect(() => {
    socket.on("connect_error", () => {
      socket.disconnect();
    })
    return () => { socket.disconnect() };
  }, [socket]);

  if (isLoading) {
    return <Loading />
  };

  function handle_Remove(idItem?: { id_item: string, name_item: string }) {
    const item = {
      accessToken: token.accessToken,
      refeshToken: token,
      id_item: idItem?.id_item
    }
    on_Submit(item);
    socket.emit('send_message', idItem);
  }

  // render items and attributes
  function Data_table({ dataTable }: any) {
    return (<>
      <div className="grid text-gray-900 grid-cols-[70px_180px_150px_100px_150px_100px_150px_auto] gap-x-4 items-center justify-between p-4 text-sm whitespace-nowrap">
        <span>Ảnh</span>
        <span>Tên</span>
        <span>Thể loại</span>
        <span>Doanh số</span>
        <span>Giá tiền</span>
        <span>Số lượng</span>
        <span>Xuất xứ</span>
        <span>Thao tác</span>
      </div>
      {
        dataTable?.map((data: any) => {
          return (
            <div key={data?._id} className="flex flex-col w-full text-gray-800 border-t border-gray-300 text-sm">
              <div className="grid grid-cols-[70px_180px_150px_100px_150px_100px_150px_auto] gap-x-4 items-center justify-between p-4">
                {/* image */}
                <Image width={100} height={100} className="rounded border" src={data?.feature_product} alt="Loading..." />
                {/* name */}
                <span className="line-clamp-3">{data?.short_name}</span>
                {/* category */}
                <span className="line-clamp-2">{data?.category_id?.category_name}</span>
                {/* sales */}
                <span className="line-clamp-2">{0}</span>
                {/* price */}
                <span className="line-clamp-2">{data?.price_product}</span>
                {/* stock */}
                <span className="line-clamp-2">{data?.stock}</span>
                {/* made in */}
                <span className="line-clamp-2">{data?.made_in}</span>
                {/* options */}
                <div className="flex justify-center items-center gap-x-2 *:duration-200">
                  <Link href={`/adminstrations/list_products/${data?._id}`} className="hover:scale-110 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-pen-line"><path d="m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" /><path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" /><path d="M8 18h1" /></svg>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Trash2 className="text-red-600 w-5 h-5" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận xóa sản phẩm?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Bạn chắc chắn xóa sản phẩm mã {data?._id} ? Bạn có thể khôi phục tại thùng rác.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-500" onClick={() => handle_Remove({ id_item: data?._id, name_item: data?.short_name })}>Xác nhận</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              {/* options */}

              {
                data?.attributes &&
                <details className="group [&_summary::-webkit-details-marker]:hidden" open={true}>
                  <summary
                    className="flex cursor-pointer items-center justify-between px-4 py-1 w-[100px] mx-auto ">
                    <span className="group-open:block hidden">Đóng</span>
                    <span className="group-open:hidden">Hiện</span>
                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                     <ChevronUp className="h-4"/>
                    </span>
                  </summary>
                  {
                    data?.attributes &&
                    (
                      data?.attributes?.varriants?.map((item: any) => (
                        item?.size_item?.map((value: any) => (
                          <div key={item?._id} className="grid border-t duration-200 border-gray-300 gap-x-4 
                          grid-cols-[100px_180px_150px_100px_150px_100px_150px_40px] items-center text-start justify-between py-4">
                            <div></div>
                            {/* attributes */}
                            <div className="flex gap-x-2 w-full">
                              <span className="line-clamp-3">{item?.color_item}</span>,
                              <span className="line-clamp-3">{value?.name_size}</span>
                            </div>
                            {/* div giả */}
                            <div></div>
                            {/* sales */}
                            <span>0</span>
                            {/* price */}
                            <span className="line-clamp-1 text-red-600">{value?.price_attribute?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                            {/* quantity */}
                            <div>
                              {
                                value?.stock_item > 0 ?
                                  <span className="line-clamp-2">{value?.stock_item}</span> :
                                  <span className="line-clamp-2 text-red-500">Hết hàng!</span>
                              }
                            </div>
                          </div>
                        ))
                      ))
                    )
                  }
                </details>
              }
            </div>
          )
        })
      }
    </>)
  }
  return (
    <Suspense fallback={<div className="w-screen h-screen fixed top-0 left-0 grid place-items-center"><Loading_Dots /></div>}>
      <Auth_Wrap_Seller>
        <div className=" flex flex-col gap-y-6 py-4 rounded">
        <strong className='text-2xl'>Danh sách sản phẩm</strong>
          {/* {(Array.isArray(data)) ? (<> */}
          <div className="sticky z-[2] top-20">
            <Link className="border-none text-gray-100 text-sm h-full px-5 py-2.5 rounded bg-[#2563EB] hover:bg-[#2563EB88] duration-300" href={'/adminstrations/list_products/create_item'}>Thêm sản phẩm +</Link>
          </div>
          {
            data?.status === 401 ? <span className="text-gray-900 text-center">Xác minh danh tính không thành công! Vui lòng đăng nhập lại!!</span> :
              data?.data ? (<>
                {isLoading ? <div className="w-screen h-screen fixed top-0 left-0 grid place-items-center"><Loading_Dots /></div> :
                  <div className="bg-white rounded-lg border px-4">
                    <Data_table dataTable={data?.data?.docs} />
                  </div>
                }
              </>)
                : <span className="text-gray-200">Không có dữ liệu</span>
          }
          <div className="text-gray-100">
            <Pagination_Component totalPages={data?.data?.totalPages} currentPage={data?.data?.page} />
          </div>
        </div>
      </Auth_Wrap_Seller>
    </Suspense>
  )
}

export default Page