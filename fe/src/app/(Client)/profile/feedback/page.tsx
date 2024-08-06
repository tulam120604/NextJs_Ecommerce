'use client'

import { Get_Item_Order } from "@/src/app/_lib/Tanstack_Query/Order/Query_order";
import { Button } from "@/src/app/Components/ui/Shadcn/button";
import { DataTable } from "@/src/app/Components/ui/Tables/data_table";
import { Textarea } from "@/src/app/Components/ui/textarea";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const parameters = useSearchParams();
    let params_rating: any = parameters.get('_rating') ?? '';
    const data = Get_Item_Order(params_rating);
    console.log(data?.data?.data_item);

    const columns: ColumnDef<any>[] = [
        {
            cell: ({ row }) => (
                <div className="flex gap-x-4 lg:gap-x-8">
                    <Link href={'/' + row?.original?.product_id?._id}>
                        <Image width={100} height={100} loading="lazy" className="w-[100px] h-[100px] border" src={row?.original?.product_id?.feature_product} alt="Loading..." />
                    </Link>
                    <div className="w-full flex flex-col gap-y-3 pt-2">
                        <Link href={'/' + row?.original?.product_id?._id} className="line-clamp-2">{row?.original?.product_id?.short_name}</Link>
                        {
                            (row?.original?.color_item || row?.original?.size_attribute_item) &&
                            <span className="text-sm">Phân loại : {row?.original?.color_item} - {row?.original?.size_attribute_item}</span>
                        }
                    </div>
                </div>
            ),
            header: " ",
        },
        {
            cell: ({ row }) => (
                <div className="flex flex-col gap-y-2 text-end">
                    <span className="text-red-600">{row?.original?.price_item?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                    <div>X {row?.original?.quantity}</div>
                    <span className="text-red-600">{row?.original?.total_price_item?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                </div>
            ),
            header: " ",
        },
    ]
    return (
        <div className="pl-4">
            {data?.data?.data_item &&
            <div className="*:text-gray-900">
                <DataTable data={data?.data?.data_item} columns={columns} />
            </div>
            }
            <span>Đánh giá</span>
            <div className="grid w-full gap-2 py-4">
                <Textarea placeholder="Nhập đánh giá của bạn." />
                <div>
                    <Button>Gửi</Button>
                </div>
            </div>
        </div>

    )
}
