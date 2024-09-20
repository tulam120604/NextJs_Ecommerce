'use client';

import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots';
import React, { Suspense } from 'react';
import { Auth_Wrap_Seller } from '../../_Auth_Wrap/Page';
import { Button } from '@/src/app/_Components/ui/Shadcn/button';
import { Checkbox } from '@/src/app/_Components/ui/Shadcn/checkbox';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/src/app/_Components/ui/select';

export default function page() {

  function submitForm(e: any, data: any) {
    e.preventDefault();
    console.log(e)
  }

  return (
    <Suspense fallback={<div className="w-screen h-screen fixed top-0 left-0 grid place-items-center"><Loading_Dots /></div>}>
      <Auth_Wrap_Seller>
        <div className='flex flex-col gap-y-6 py-6 h-full'>
          <strong className='text-xl'>Thuộc tính</strong>
          <section className='grid lg:grid-cols-[38%_auto] lg:gap-x-16'>
            {/* left */}
            <div>
              <span>Thêm mới thuộc tính</span>
              <p className='text-gray-500 text-sm my-4'>Các thuộc tính bổ sung cho phép bạn xác định dữ liệu sản phẩm bổ sung. Bạn có thể sử dụng các thuộc tính đó
                trong thanh bên của cửa hàng bằng cách sử dụng các tiện ích điều hướng theo lớp.</p>
              <form onSubmit={submitForm}>
                <label htmlFor="short_name">Tên:</label>
                <input type="text" id='short_name'
                  className='outline-none py-1.5 px-4 border border-gray-300 rounded w-full text-sm my-1' placeholder='Enter ...' />
                <p className='text-gray-800 opacity-60 text-sm'>Tên cho thuộc tính</p>
                <div className="flex items-center space-x-2 my-4">
                  <Checkbox id="terms" />
                  <label htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Cho phép lưu trữ
                  </label>
                </div>
                <p className='text-sm text-gray-500'>Kích hoạt tính năng này nếu bạn muốn thuộc tính này có lưu trữ sản phẩm trong cửa hàng của bạn.</p>
                <div className='my-4'>
                  <Select>
                    <span>Loại: </span>
                    <SelectTrigger className="w-[180px] !h-auto py-1 mt-1">
                      <SelectValue placeholder="Lựa chọn" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="ux_color">UX Color</SelectItem>
                        <SelectItem value="ux_label">UX Label</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <Button className='py-1.5 h-auto my-4 bg-indigo-600 hover:bg-indigo-800'>Thêm</Button>
              </form>
            </div>
            {/* right */}
            <div className='border rounded bg-white p-4'>
              <span>hello world</span>
            </div>
          </section>
        </div>
      </Auth_Wrap_Seller>
    </Suspense>
  )
}
