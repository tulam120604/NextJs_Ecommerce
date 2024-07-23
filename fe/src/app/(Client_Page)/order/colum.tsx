"use client"

import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"


export const columns: ColumnDef<any>[] = [
  {
    cell: ({row}) => (
      <div className="max-w-[200px] line-clamp-3">{row?.original?.product_id.short_name}</div>
    ),
    header: "Tên sản phẩm",
  },
  {
    cell: ({row}) => (
      <Image width={100} height={100} className="w-[100px] h-[100px] border" src={row?.original?.product_id?.feature_product} alt="Loading..." />
    ),
    header: "Ảnh",
  },
  {
    cell : ({row}) => (
      <span className="text-red-600">{row?.original?.price_item.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
    ),
    header: "Đơn giá",
  },
  {
    accessorKey: "quantity",
    header: "Số lượng",
  },
  {
    cell : ({row}) => (
      <span className="text-red-600">{row?.original?.price_item.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
    ),
    header: "Thành tiền",
  },
]