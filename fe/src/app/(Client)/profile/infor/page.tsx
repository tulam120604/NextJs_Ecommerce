'use client';

import { useCheck_user, useToken } from '@/src/app/_lib/Custome_Hooks/User';
import { List_Address } from '@/src/app/_lib/Tanstack_Query/Auth/Query_Address';
import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/src/app/_Components/ui/Shadcn/button';
import Address_component from '../_components/address';
import { eventEmit } from '@/src/app/_Components/ui/Header/Event_emit';

const Page = () => {
  const form_create_address = useRef<HTMLDivElement>(null);
  const bg_form_create_address = useRef<HTMLDivElement>(null);

  const [client, setClient] = useState<boolean>(false);
  useEffect(() => {
    setClient(true)
  }, [])
  const routing = useRouter();
  let user = useCheck_user() ?? undefined;

  // address 
  const { data, isLoading } = List_Address(user?.check_email?._id);
  function handle_Show_Form_Create_Address() {
    form_create_address?.current?.classList?.remove('-translate-y-[200%]');
    form_create_address?.current?.classList?.add('translate-y-0');
    bg_form_create_address?.current?.classList?.remove('hidden');
    bg_form_create_address?.current?.classList?.add('block');
  }
  function handle_Close_Form_Create_Address() {
    form_create_address?.current?.classList?.add('-translate-y-[200%]');
    form_create_address?.current?.classList?.remove('translate-y-0');
    bg_form_create_address?.current?.classList?.add('hidden');
    bg_form_create_address?.current?.classList?.remove('block');
  }

  useEffect(() => {
    eventEmit.on('close_form_create_address', () => { handle_Close_Form_Create_Address() })
  }, [])

  if (!user) {
    routing.push('/')
  }
  return (
    client ?
      <div className="w-full px-6 py-4">
        <div className='flex items-center justify-between'>
          <span className='lg:text-xl text-lg'>Hồ sơ của tôi</span>
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
          <span className='lg:text-xl text-lg'>Địa chỉ</span>
          <Button onClick={handle_Show_Form_Create_Address}>Thêm địa chỉ +</Button>
        </section>
        <div ref={form_create_address} className='fixed -translate-y-[200%] duration-200 top-1/4 left-1/2 -translate-x-1/2 z-[3]'>
          <Address_component id_user={user?.check_email?._id} />
        </div>
        <div onClick={handle_Close_Form_Create_Address} ref={bg_form_create_address}
          className='fixed hidden w-screen h-screen top-0 left-0 z-[2] bg-[#33333355]'></div>
        {isLoading && <Loading_Dots />}
        <div className='grid grid-cols-2 lg:gap-x-10 gap-6'>
          {data?.data && data?.data.length > 0 ?
            data?.data?.map((item: any) => (
              <div key={item?._id} className="rounded py-3 border border-gray-300 flex justify-between px-4 gap-x-6">
                <div className="text-sm flex flex-col gap-y-2">
                  <span className="text-gray-700 sm:col-span-2">{item?.about_address?.user_name}</span>
                  <span className="text-gray-700 sm:col-span-2">{item?.about_address?.phone}</span>
                  <span className="text-gray-700 sm:col-span-2">{item?.about_address?.address}</span>
                  {item?.status_address &&
                    <span className="text-gray-700 border border-green-600 text-green-600 rounded p-0.5 text-center">Mặc định</span>
                  }
                </div>
                <div className='flex flex-col items-end gap-y-1'>
                  <div>
                    <Link href={''} className="hover:underline text-sky-500 text-sm mx-2">Cập nhật</Link>
                    {!item?.status_address &&
                      <Link href={''} className="hover:underline text-red-500 text-sm">Xóa</Link>
                    }
                  </div>
                  <Button className="!py-1 !h-auto rounded bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-400">Đặt làm mặc định</Button>
                </div>
              </div>
            )) :
            <div className='text-center'>Trống</div>
          }
        </div>
      </div>
      : <span>Loading..</span>
  )
}

export default Page