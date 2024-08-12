'use client';

import { useCheck_user, useToken } from '@/src/app/_lib/Custome_Hooks/User';
import { List_Address } from '@/src/app/_lib/Tanstack_Query/Auth/Query_Address';
import Loading_Dots from '@/src/app/Components/Loadings/Loading_Dots';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Page = () => {
  const token = useToken();
  const [client, setClient] = useState<boolean>(false);
  useEffect(() => {
    setClient(true)
  }, [])
  const routing = useRouter();
  let user = useCheck_user() ?? undefined;
  if (!user) {
    routing.push('/')
  }

  // address 
  const { data, isLoading } = List_Address(user?.check_email?._id, token?.accessToken);

  return (
    client ?
      <div className="w-full px-6 py-4">
        <div className='flex items-center justify-between'>
          <span className='lg:text-2xl text-xl'>Hồ sơ của tôi</span>
          {
            user?.check_email?.role === 'user' ?
              <Link className='text-sm underline' href={'/profile/create_saller'}>Kênh phân phối</Link> :
              user?.check_email?.role === 'seller' ?
                <Link className='text-sm underline' href={'/adminstrations/list_products'}>Đi đến kho phân phối</Link> :
                <Link className='text-sm underline' href={'/adminstrations/dashboard'}>Bảng điều khiển</Link>
          }
        </div>
        <table className='lg:w-[50%] w-[80%] mx-auto'>
          <tbody>
            <tr className='*:my-6'>
              <td className='flex items-center justify-between'>
                Tên đăng nhập
                <div className='lg:w-[70%] w-[40%] border py-1 lg:py-2 px-4 rounded text-gray-600'>{user && user?.check_email?.user_name}</div>
              </td>
              <td className='flex items-center justify-between'>
                Email tài khoản
                <div className='lg:w-[70%] w-[40%] border py-1 lg:py-2 px-4 rounded text-gray-600'>{user && user?.check_email?.email}</div>
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
        {isLoading && <Loading_Dots />}
        {data?.data.length > 0 ?
          data?.data?.map((item: any) => (
            <div key={item?._id} className="rounded-lg py-3 border">
              <dl className="text-sm px-4">
                <div className="grid grid-cols-2 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Tên</dt>
                  <dd className="text-gray-700 sm:col-span-2">{item?.about_address?.user_name}</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Số điện thoại</dt>
                  <dd className="text-gray-700 sm:col-span-2">{item?.about_address?.phone}</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Vị trí</dt>
                  <dd className="text-gray-700 sm:col-span-2">{item?.about_address?.address}</dd>
                </div>
                  <dd className="text-gray-700 sm:col-span-2">{item?.about_address?.status_address}</dd>
                <button className="text-gray-700 sm:col-span-2 py-1 items-right px-4 border mt-4 rounded bg-yellow-500 text-white hover:scale-105 duration-300">sửa</button>
                <button className="text-gray-700 sm:col-span-2 py-1 items-right px-4 border mt-4 rounded bg-sky-500 text-white mx-6 hover:scale-105 duration-300">Đặt làm mặc định</button>
              </dl>
            </div>
          )) :
          <div className='text-center'>Trống</div>
        }


      </div>
      : <span>Loading..</span>
  )
}

export default Page