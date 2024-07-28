'use client';

import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="w-full px-6 py-4">
      <div className='flex items-center justify-between'>
      <span className='lg:text-2xl text-xl'>Hồ sơ của tôi</span>
      <Link className='text-sm underline' href={'/admin/dashboard'}>Đăng kí bán hàng</Link>
      </div>
      <table className='lg:w-[50%] w-[80%] mx-auto'>
        <thead>
          <tr>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr className='*:my-6'>
            <td className='flex items-center justify-between'>
              Tên đăng nhập
              <div className='lg:w-[70%] w-[40%] border py-1 lg:py-2 px-4 rounded text-gray-600'>ahihihi 123</div>
            </td>
            <td className='flex items-center justify-between'>
              Email tài khoản
              <div className='lg:w-[70%] w-[40%] border py-1 lg:py-2 px-4 rounded text-gray-600'>ahihihi***@*******</div>
            </td>
            <td className='flex items-center justify-between'>
              Số điện thoại
              <Link href={''} className='lg:w-[70%] w-[40%] underline px-4 rounded text-sky-600'>thêm</Link>
            </td>
          </tr>
        </tbody>
      </table>
      <section className='flex items-center justify-between my-5 py-5 border-t'>
        <span className='lg:text-2xl text-xl'>Địa chỉ</span>
        <button className='border h-full py-1 lg:py-2 rounded bg-black text-white hover:bg-gray-700 duration-200 px-6'>Thêm địa chỉ +</button>
      </section>
      <div className="rounded-lg py-3 border">
        <dl className="text-sm px-4">
          <div className="grid grid-cols-2 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Tên</dt>
            <dd className="text-gray-700 sm:col-span-2">Họ và tên</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Số điện thoại</dt>
            <dd className="text-gray-700 sm:col-span-2">0123456jqk</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Vị trí</dt>
            <dd className="text-gray-700 sm:col-span-2">123 ngõ ahihi - đường abc - quận jqk - huyện xyz - Việt Nam</dd>
          </div>
          <button className="text-gray-700 sm:col-span-2 py-1 items-right px-4 border mt-4 rounded bg-yellow-500 text-white hover:scale-105 duration-300">sửa</button>
          <button className="text-gray-700 sm:col-span-2 py-1 items-right px-4 border mt-4 rounded bg-sky-500 text-white mx-6 hover:scale-105 duration-300">Đặt làm mặc định</button>
        </dl>
      </div>
    </div>

  )
}

export default page