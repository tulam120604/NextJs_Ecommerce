/* eslint-disable @next/next/no-img-element */
'use client';

import Link from "next/link"
import { Suspense } from "react";
import Loading from "./_component/loading";
import { Query_List_Items_Dashboard } from "@/src/app/_lib/Tanstack_Query/Items/query";
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import { Mutation_Items } from "@/src/app/_lib/Tanstack_Query/Items/mutationFn";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/src/app/Components/ui/alert-dialog";
import Pagination_Component from "./_component/Pagination";
import { Trash2 } from "lucide-react";
import { DataTable } from "@/src/app/Components/ui/Tables/data_table";
import { useSearchParams } from "next/navigation";
import { useToken } from "@/src/app/_lib/Custome_Hooks/User";
import Loading_Dots from "@/src/app/Components/Loadings/Loading_Dots";

const Page = () => {
  const token = useToken();
  const searchParams = useSearchParams();
  let page = Number(searchParams.get('_page')) ?? 1;
  const { data, isLoading } = Query_List_Items_Dashboard(token.accessToken, page, 10);
  const { on_Submit } = Mutation_Items({
    action: "REMOVE"
  });

  if (isLoading) {
    return <Loading />
  };

  const columns: ColumnDef<any>[] = [
    {
      cell: ({ row }) => (
        <div className="max-w-[200px] line-clamp-3">{row?.original?.short_name}</div>
      ),
      header: "Tên sản phẩm",
    },
    {
      accessorKey: "category_id.category_name",
      header: "Danh mục",
    },
    {
      cell: ({ row }) => (
        <Image width={100} height={100} className="w-[100px] h-[100px] rounded" src={row?.original?.feature_product} alt="Loading..." />
      ),
      header: "Ảnh",
    },
    {
      cell: ({ row }) => {
        return (
          row?.original?.attributes?.varriants?.map((item: any) => {
            return (<div key={row?.original?._id} className="max-w-[200px]">
              <span>{item.color_item}</span>
              {
                item?.size_item.map((i: any) => {
                    return (<>
                    {
                      i?.name_size && <span>&#160; &#10539; &#160;</span>
                    }
                    <span key={i._id}>{i?.name_size}</span> <br />
                    </>)
                })
              }
            </div>)
          }))
      },
      header: "Phân loại",
    },
    {
      cell: ({ row }) => {
        return (row?.original?.price_product ?
          <span className="text-red-600">{row?.original?.price_product?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span> :
          row?.original?.attributes?.varriants?.map((item: any) => {
            return (<div key={row?.original?._id} className="max-w-[200px]">
              {
                item?.size_item.map((i: any) => {
                  if (i.name_size) {
                    return (<>
                      <span key={i._id} className="text-red-600">{i?.price_attribute?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span> <br />
                    </>)
                  }
                  else {
                    return <span key={i._id} className="text-red-600">{i?.price_attribute?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                  }
                })
              }
            </div>)
          }))

      },
      header: "Đơn giá",
    },
    {
      accessorKey: "count_stock",
      header: "Số lượng",
    },
    {
      accessorKey: "made_in",
      header: "Xuất xứ",
    },
    {
      cell: ({ row }) => (<div className="flex items-center gap-x-2 *:duration-200">
        <Link href={`/admin/list_products/${row?.original?._id}`} className="hover:scale-110 ">
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
                Bạn chắc chắn xóa sản phẩm mã {row?.original?._id} ? Bạn có thể khôi phục tại thùng rác.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Hủy</AlertDialogCancel>
              <AlertDialogAction className="bg-red-500" onClick={() => handle_Remove(row?.original?._id)}>Xác nhận</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>),
      header: "Thao tác",
    },
  ]

  function handle_Remove(idItem?: string | number) {
    const item = {
      accessToken: token.accessToken,
      refeshToken: token,
      id_item: idItem
    }
    on_Submit(item);
  }
  return (
    <Suspense fallback={<Loading_Dots />}>
      <div className=" flex flex-col gap-y-6 py-6 rounded">
        <strong className="text-gray-200 lg:text-2xl">Danh mục sản phẩm</strong>
        {/* {(Array.isArray(data)) ? (<> */}
        <div className="flex items-center gap-x-20 sticky z-[2] top-[70px] bg-[#101824] py-4">
          <div className="flex gap-x-2">
            <Link className="border-none text-gray-100 text-sm h-full px-5 py-2.5 rounded bg-[#2563EB] hover:bg-[#2563EB88] duration-300" href={'/admin/list_products/add_item'}>Thêm sản phẩm +</Link>
          </div>
          <Link href={'/admin/list_products/recycle'} className="absolute right-0 *:w-[25px] *:h-[30px] cursor-pointer">
            <Trash2 className="text-red-600" />
            {/* <span className="absolute font-semibold !w-[18px] grid place-items-center bg-white text-black !h-[20px] rounded-xl text-xs -top-[10%] -right-[15%]">1</span> */}
          </Link>
        </div>
        {
          data?.status === 401 ? <span className="text-gray-200 text-center">Xác minh danh tính không thành công! Vui lòng đăng nhập lại!!</span> :
            data?.data ? (<>
              {isLoading ? <Loading_Dots /> :
                <DataTable columns={columns} data={data?.data?.docs} />
              }
            </>)
              : <span className="text-gray-200">Không có dữ liệu</span>
        }
        <div className="text-gray-100">
          <Pagination_Component totalPages={data?.data?.totalPages} currentPage={data?.data?.page} />
        </div>
        {/* </>)
          : <span className="text-white">Bạn không có quyền truy cập !</span>} */}
      </div>
    </Suspense>
  )
}

export default Page