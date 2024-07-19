/* eslint-disable @next/next/no-img-element */
'use client';

import Link from "next/link"
import Image from "next/image";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/src/app/Components/ui/Tables/table";
import Search_Component from "@/src/app/Components/Forms/search";
import { Suspense, useEffect, useState } from "react";
import LoadingPage from "@/src/app/Components/Loadings/LoadingPage";
import Loading from "./loading";
import { Query_List_Items_Admin } from "@/src/app/_lib/Tanstack_Query/Items/query";
import Swal from "sweetalert2";
import { Mutation_Items } from "@/src/app/_lib/Tanstack_Query/Items/mutationFn";
import Trash_Icon from "@/src/app/Components/Icons/trash";

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

  function handle_Remove(idItem?: string | number) {
    Swal.fire({
      title: "Xác nhận xóa sản phẩm?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận!",
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        const item = {
          token: dataToken,
          id_item: idItem
        }
        on_Submit(item);
        Swal.fire({
          title: "Xóa sản phẩm thành công! Bạn có thể khôi phục tại thùng rác.",
          icon: "success"
        });
      }
    });
  }

  return (
    <Suspense fallback={<LoadingPage />}>
      <div className=" flex flex-col gap-y-6 py-6 rounded">
        <strong className="text-gray-200 lg:text-2xl">Danh mục sản phẩm</strong>
        {/* {(Array.isArray(data)) ? (<> */}
        <div className="flex items-center gap-x-20 sticky z-[2] top-[70px] bg-[#101824] py-4">
          <Search_Component />
          <div className="flex gap-x-2">
            <Link className="border-none text-gray-100 h-full px-5 py-2.5 rounded bg-black hover:bg-gray-800 duration-300" href={'/admin/list_products/add_item'}>Thêm sản phẩm +</Link>
            <Link className="border-none text-gray-100 h-full px-5 py-2.5 rounded bg-black hover:bg-gray-800 duration-300" href={'/admin/list_products/add_item'}>Thêm danh mục+</Link>
          </div>
          <Link href={'/admin/list_products/recycle'} className="absolute right-0 *:w-[25px] *:h-[30px] cursor-pointer">
            <Trash_Icon />
            {/* <span className="absolute font-semibold !w-[18px] grid place-items-center bg-white text-black !h-[20px] rounded-xl text-xs -top-[10%] -right-[15%]">1</span> */}
          </Link>
        </div>
        <Table className="rounded">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Tên</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead>Ảnh</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Số lượng</TableHead>
              <TableHead>Xuất xứ</TableHead>
              <TableHead>Options</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item: any) => (
              <TableRow key={item?._id}>
                <TableCell className="max-w-[200px]" key={item?._id}>{item?.short_name}</TableCell>
                <TableCell key={item?._id}>{item?.category_id?.category_name}</TableCell>
                <TableCell key={item?._id}><img loading="lazy" className="w-16 h-16" width={80} height={80} src={item.feature_product} alt=""></img></TableCell>
                <TableCell key={item?._id}>{item?.price_product}</TableCell>
                <TableCell key={item?._id}>{item?.count_stock}</TableCell>
                <TableCell key={item?._id}>{item?.made_in}</TableCell>
                <TableCell key={item?._id} className="flex items-center !py-9 gap-x-4 *:duration-300">
                  <Link className="hover:scale-110 " href={''}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="lucide lucide-receipt-text"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" /><path d="M14 8H8" /><path d="M16 12H8" /><path d="M13 16H8" /></svg>
                  </Link>
                  <Link href={`/admin/list_products/${item._id}`} className="hover:scale-110 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-pen-line"><path d="m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" /><path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" /><path d="M8 18h1" /></svg>
                  </Link>
                  <button className="hover:scale-110 text-red-500" onClick={() => handle_Remove(item._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                  </button>
                </TableCell>
              </TableRow>))}
          </TableBody>
        </Table>

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