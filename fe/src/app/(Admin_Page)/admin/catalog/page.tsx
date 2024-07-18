'use client';

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/src/app/Components/ui/Tables/table";




const page = () => {
  return (<div>
    <div className="py-6">
    <strong className="text-gray-200 lg:text-2xl">Tất cả danh mục</strong>
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

  </div>)
}

export default page