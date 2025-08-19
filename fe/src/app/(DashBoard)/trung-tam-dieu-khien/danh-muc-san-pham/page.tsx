'use client';

import Loading_Dots from "@/src/app/_Components/Loadings/Loading_Dots";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/src/app/_Components/ui/Tables/table";
import { Suspense } from "react";

const page = () => {
  return (<Suspense fallback={<div className="w-screen h-screen fixed top-0 left-0 grid place-items-center"><Loading_Dots /></div>}>
      <div className="py-6">
        <strong className="text-gray-200 lg:text-xl">Tất cả danh mục</strong>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Mã</TableHead>
            <TableHead>Tên danh mục</TableHead>
            <TableHead>Số lượng sản phẩm</TableHead>
            <TableHead className="text-right">Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
  </Suspense>)
}

export default page