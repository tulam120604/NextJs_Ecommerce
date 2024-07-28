/* eslint-disable @next/next/no-img-element */
'use client';

import Link from "next/link"
import { Suspense, useEffect, useState } from "react";
import LoadingPage from "@/src/app/Components/Loadings/LoadingPage";
import Loading from "./loading";
import { Query_List_Items_Admin } from "@/src/app/_lib/Tanstack_Query/Items/query";
import Trash_Icon from "@/src/app/Components/Icons/trash";
import { DataTable } from "./data_table";
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import { Mutation_Items } from "@/src/app/_lib/Tanstack_Query/Items/mutationFn";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/src/app/Components/ui/alert-dialog";
import { Search_Component_Dashboard } from "@/src/app/Components/Forms/search";

const Page = () => {
  const [dataToken, set_DataToken] = useState();
  const [page, setPage] = useState<number>(1);
  const { data, isLoading } = Query_List_Items_Admin(dataToken, page);
  const { on_Submit } = Mutation_Items({
    action: "REMOVE"
  });
  useEffect(() => {
    const data_Token = localStorage.getItem('account');
    if (data_Token) {
      const token_Account = JSON.parse(data_Token);
      set_DataToken(token_Account.token)
    }
  }, [dataToken]);
  if (isLoading) {
    return <Loading />
  };

  function changePage(action: any) {
    switch (action) {
      case "DOW":
        return (page > 1) && setPage(page - 1)
      case "UP":
        return setPage(page + 1)
      default: return
    }
  }

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
        return (row?.original?.price_product ?
          <span className="text-red-600">{row?.original?.price_product?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span> :
          row?.original?.attributes?.varriants?.map((item: any) => {
            return (<div key={row?.original?._id} className="max-w-[200px]">
              <span>{item.color_item + ' - '}</span>
              {
                item?.size_item.map((i: any) => {
                  if (i.name_size) {
                    return (<>
                      <span key={i._id}>{i?.name_size}</span><br />
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
        <Link className="hover:scale-110 " href={''}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="lucide lucide-receipt-text"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" /><path d="M14 8H8" /><path d="M16 12H8" /><path d="M13 16H8" /></svg>
        </Link>
        <Link href={`/admin/list_products/${row?.original?._id}`} className="hover:scale-110 ">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-pen-line"><path d="m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" /><path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" /><path d="M8 18h1" /></svg>
        </Link>
        <AlertDialog>
          <AlertDialogTrigger>
            <Trash_Icon />
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
      header: "options",
    },
  ]

  function handle_Remove(idItem?: string | number) {
    const item = {
      token: dataToken,
      id_item: idItem
    }
    on_Submit(item);
  }

  return (
    <Suspense fallback={<LoadingPage />}>
      <div className=" flex flex-col gap-y-6 py-6 rounded">
        <strong className="text-gray-200 lg:text-2xl">Danh mục sản phẩm</strong>
        {/* {(Array.isArray(data)) ? (<> */}
        <div className="flex items-center gap-x-20 sticky z-[2] top-[70px] bg-[#101824] py-4">
          <Search_Component_Dashboard />
          <div className="flex gap-x-2">
            <Link className="border-none text-gray-100 h-full px-5 py-2.5 rounded bg-black hover:bg-gray-800 duration-300" href={'/admin/list_products/add_item'}>Thêm sản phẩm +</Link>
          </div>
          <Link href={'/admin/list_products/recycle'} className="absolute right-0 *:w-[25px] *:h-[30px] cursor-pointer">
            <Trash_Icon />
            {/* <span className="absolute font-semibold !w-[18px] grid place-items-center bg-white text-black !h-[20px] rounded-xl text-xs -top-[10%] -right-[15%]">1</span> */}
          </Link>
        </div>
        {
          data ? (<>
            {isLoading ? <span>Loading ...</span> :
              <DataTable columns={columns} data={data} />
            }
          </>)
            : <span className="text-gray-200">Không có dữ liệu</span>
        }

        <div className="w-full flex justify-end text-white *:border *:px-1 *:py-0.5 *:rounded *:duration-200 gap-x-4">
          {page > 1 ? <button onClick={() => changePage("DOW")} className="hover:bg-white hover:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
          </button> : ''}
          <button onClick={() => changePage("UP")} className="hover:bg-white hover:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
        {/* </>)
          : <span className="text-white">Bạn không có quyền truy cập !</span>} */}
      </div>
    </Suspense>
  )
}

export default Page