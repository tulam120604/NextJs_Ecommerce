import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

export const columns: ColumnDef<any>[] = [
    {
        cell: ({ row }) => (
            <div className="flex gap-x-4 lg:gap-x-8">
                <Link to={'/' + row?.original?.product_id?._id}>
                    <img width={100} height={100} loading="lazy" className="w-[100px] h-[100px] border" src={row?.original?.product_id?.gallery[0]} alt="Loading..." />
                </Link>
                <div className="w-full flex flex-col gap-y-3">
                    <Link to={'/' + row?.original?.product_id?._id} className="line-clamp-2">{row?.original?.product_id?.short_name}</Link>
                    {
                        (row?.original?.color_item || row?.original?.size_attribute_item) &&
                        <span className="text-sm">Phân loại : {row?.original?.color_item} , {row?.original?.size_attribute_item}</span>
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