/* eslint-disable @next/next/no-img-element */
'use client';

import Link from "next/link"
import { Suspense, useEffect, useState } from "react";
import { Query_Recycle_Items_Admin } from "@/src/app/_lib/Tanstack_Query/Items/query";
import { Mutation_Items } from "@/src/app/_lib/Tanstack_Query/Items/mutationFn";
import Trash_Icon from "@/src/app/Components/Icons/trash";
import Loading from "../_component/loading";
import Re_store from "@/src/app/Components/Icons/re_store";
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image";
import { toast } from "react-toastify";
import { DataTable } from "@/src/app/Components/ui/Tables/data_table";
import { useToken } from "@/src/app/_lib/Custome_Hooks/User";

const Page = () => {
    const token = useToken();
    const [page, setPage] = useState<number>(1);
    const { data, isLoading } = Query_Recycle_Items_Admin(token.accessToken, page);
    const { on_Submit, loading } = Mutation_Items({
        action: 'RESTORE'
    });
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
            cell: ({ row }) => (
                <span className="text-red-600">{row?.original?.price_product?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
            ),
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
                <button className="hover:scale-110" onClick={() => handle_Restore(row?.original?._id)}>
                    <Re_store />
                </button>
                <button className="hover:scale-110 text-red-500">
                    <Trash_Icon />
                </button>
            </div>),
            header: "options",
        },
    ]
    function handle_Restore(idItem?: string | number) {
        const item = {
            token: token.accessToken,
            id_item: idItem
        };
        on_Submit(item);
        if (loading == 'call_error') {
            toast.error(`Lỗi không thể khôi phục sản phẩm mã ${idItem}`, { autoClose: 600 })
        } else {
            toast.success(`Khôi phục thành công sản phẩm mã ${idItem}`, { autoClose: 600 })
        }
    }

    return (
        <Suspense fallback={'Loading...'}>
            <div className="flex flex-col gap-y-6 pb-6 rounded">
                <div className="flex items-center justify-between gap-x-20 sticky top-0 py-6">
                    <strong className="text-gray-200 lg:text-2xl">Danh sách sản phẩm đã xóa</strong>
                    <Link href={'/admin/list_products/'} className="*:w-[25px] *:h-[30px] text-white hover:underline hover:text-sky-500 cursor-pointer">
                        Quay lại
                    </Link>
                </div>
                {(Array.isArray(data)) ? (<>
                    {
                        data ? (<>
                            {isLoading ? <span>Loading ...</span> :
                                <DataTable columns={columns} data={data} />
                            }
                        </>)
                            : <span className="text-gray-100">Thùng rác trống!</span>
                    }
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

