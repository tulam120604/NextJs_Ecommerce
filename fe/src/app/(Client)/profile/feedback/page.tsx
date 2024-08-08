'use client'

import { Mutation_Feedback } from "@/src/app/_lib/Tanstack_Query/Feedback/Mutation_Feedback";
import { Get_Item_Order } from "@/src/app/_lib/Tanstack_Query/Order/Query_order";
import Loading_Dots from "@/src/app/Components/Loadings/Loading_Dots";
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
    let id_user: any;
    if (typeof window !== 'undefined') {
        id_user = JSON.parse(localStorage.getItem('account') || '{}') ?? '';
    }

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
    // add feedback
    // user_id, item_id, content_feedback
    const mutation_feedback = Mutation_Feedback('ADD');
    function submit_Feedback(data_Form: any) {
        const dataBody = {
            user_id: id_user?.check_email?._id,
            item_id: data?.data?.data_item[0],
            item_order : data?.data?.data_item[0] ,
            content_feedback: data_Form?.content_feedback
        };
        mutation_feedback.mutate(dataBody);
    }
    return (
        <div className="pl-4">
            <strong>Đánh giá đơn hàng</strong>
            {data?.data?.data_item ? (<>
                <div className="*:text-gray-900 *:!border-white">
                    <DataTable data={data?.data?.data_item} columns={columns} />
                </div>
                <form onSubmit={mutation_feedback.form_feedback.handleSubmit(submit_Feedback)} className="grid w-full gap-2 py-4">
                    <span>Đánh giá</span>
                    <Textarea {...mutation_feedback.form_feedback.register('content_feedback')} placeholder="Nhập đánh giá của bạn." />
                    <div>
                        <Button>Gửi</Button>
                    </div>
                </form>
            </>) :
                <Loading_Dots />
            }
        </div>

    )
}
