/* eslint-disable @next/next/no-img-element */
'use client';

import Link from "next/link"
import { Suspense, useEffect, useState } from "react";
import LoadingPage from "@/src/app/Components/Loadings/LoadingPage";
import { Query_Recycle_Items_Admin } from "@/src/app/_lib/Tanstack_Query/Items/query";
import { Mutation_Items } from "@/src/app/_lib/Tanstack_Query/Items/mutationFn";
import Trash_Icon from "@/src/app/Components/Icons/trash";
import Loading from "../loading";
import Re_store from "@/src/app/Components/Icons/re_store";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/src/app/Components/ui/Tables/table";

const Page = () => {
    const [dataToken, set_DataToken] = useState();
    const [page, setPage] = useState<number>(1);
    const { data, isLoading } = Query_Recycle_Items_Admin(dataToken, page);
    const { on_Submit, loading } = Mutation_Items({
        action: 'RESTORE'
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
    function previous() {
        // if (page > 1) {
        //     setPage(page - 1)
        // }
    }
    function next() {
        // setPage(page + 1);
    };
    function handle_Restore(idItem?: string | number) {
        const item = {
            token: dataToken,
            id_item: idItem
        };
        on_Submit(item);
    }

    return (
        <Suspense fallback={<LoadingPage />}>
            <div className="flex flex-col gap-y-6 pb-6 rounded">
                <div className="flex items-center justify-between gap-x-20 sticky top-0 py-6">
                    <strong className="text-gray-200 lg:text-2xl">Danh sách sản phẩm đã xóa</strong>
                    <Link href={'/admin/list_products/'} className="*:w-[25px] *:h-[30px] text-white hover:underline hover:text-sky-500 cursor-pointer">
                        Quay lại
                    </Link>
                </div>
                {(Array.isArray(data)) ? (<>

                    {data.length > 0 ?
                        <Table className="rounded">
                            <TableCaption>A list of your recent invoices.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tên</TableHead>
                                    <TableHead>Thể loại</TableHead>
                                    <TableHead>Danh mục</TableHead>
                                    <TableHead>Ảnh</TableHead>
                                    <TableHead>Giá</TableHead>
                                    <TableHead>Số lượng bán</TableHead>
                                    <TableHead>Options</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data?.map((item: any) => (
                                    <TableRow key={item?._id}>
                                        <TableCell key={item?._id}>{item?.short_name}</TableCell>
                                        <TableCell key={item?._id}>{item?.type_product}</TableCell>
                                        <TableCell key={item?._id}>{item?.category_id?.category_name}</TableCell>
                                        <TableCell key={item?._id}><img loading="lazy" className="w-16 h-16" width={80} height={80} src={item.feature_product} alt=""></img></TableCell>
                                        <TableCell key={item?._id}>{item?.price_product}</TableCell>
                                        <TableCell key={item?._id}>{item?.stock_item}</TableCell>
                                        <TableCell key={item?._id} className="flex items-center h-full gap-x-4 !py-9 *:duration-300">
                                                <button className="hover:scale-110" onClick={() => handle_Restore(item._id)}>
                                                    <Re_store />
                                                </button>
                                                <button className="hover:scale-110 text-red-500">
                                                    <Trash_Icon />
                                                </button>
                                        </TableCell>
                                    </TableRow>))}
                            </TableBody>
                        </Table>
                        : <span className="text-gray-100">Thùng rác trống!</span>}
                    <div className="w-full flex justify-end text-white *:border *:px-1 *:py-0.5 *:rounded *:duration-200 gap-x-4">
                        {page > 1 ? <button onClick={previous} className="hover:bg-white hover:text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
                        </button> : ''}
                        <button onClick={next} className="hover:bg-white hover:text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                        </button>
                    </div>
                </>)
                    : <span className="text-white">Bạn không có quyền truy cập !</span>}
            </div>
        </Suspense>
    )
}

export default Page