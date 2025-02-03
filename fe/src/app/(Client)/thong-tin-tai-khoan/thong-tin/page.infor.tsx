'use client';

import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots';
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { Button } from '@/src/app/_Components/ui/Shadcn/button';
import Address_component from '../_components/address';
import { eventEmit } from '@/src/app/_Components/ui/Header/Event_emit';
import { Infor_user } from '@/src/app/_lib/Query_APIs/Auth/Query_Auth';
import User_address from './user_address';

const Page_infor = () => {
  const form_create_address = useRef<HTMLDivElement>(null);
  const bg_form_create_address = useRef<HTMLDivElement>(null);
  const { data: data_user, isLoading: loading_user } = Infor_user('cookie');
  // console.log(data_user)
  // address 
  function handle_Show_Form_Create_Address() {
    form_create_address?.current?.classList?.remove('left-3/4');
    form_create_address?.current?.classList?.add('left-1/2', 'scale-100');
    bg_form_create_address?.current?.classList?.remove('hidden');
    bg_form_create_address?.current?.classList?.add('block');
  }
  function handle_Close_Form_Create_Address() {
    form_create_address?.current?.classList?.add('left-3/4', 'scale-0');
    form_create_address?.current?.classList?.remove('left-1/2', 'scale-100');
    bg_form_create_address?.current?.classList?.add('hidden');
    bg_form_create_address?.current?.classList?.remove('block');
  }

  useEffect(() => {
    eventEmit.on('close_form_create_address', () => { handle_Close_Form_Create_Address() })
  }, [])

  return (
    <div className="w-full px-6 py-4">
      {
        loading_user ?
          <Loading_Dots /> :
          <>
            <div className='flex items-center justify-between'>
              <span className='lg:text-xl text-sm'>Hồ sơ của tôi</span>
              {
                data_user?.data?.role === 'user' ?
                  <Link className='lg:text-sm text-xs underline' href={'/thong-tin-tai-khoan/dang-ki-ban-hang'}>Kênh phân phối</Link> :
                  data_user?.data?.role === 'seller' ?
                    <Link className='lg:text-sm text-xs underline' href={'/trung-tam-dieu-khien/bang-dieu-khien/tong-quan'}>Đi đến kho phân phối</Link> :
                    <Link className='lg:text-sm text-xs underline' href={'/trung-tam-dieu-khien/bang-dieu-khien/tong-quan'}>Trung tâm điều khiển</Link>
              }
            </div>
            <table className='lg:w-[80%] mx-auto'>
              <tbody>
                <tr className='*:my-6'>
                  <td className='flex items-center justify-between lg:text-sm text-xs'>
                    Tên hiển thị
                    <div className='lg:w-[70%] w-[50%] border py-1 lg:py-2 px-4 rounded text-gray-600'>{data_user?.data && data_user?.data?.user_name}</div>
                  </td>
                  <td className='flex items-center justify-between lg:text-sm text-xs'>
                    Email
                    <div className='lg:w-[70%] w-[50%] border py-1 lg:py-2 px-4 rounded text-gray-600 overflow-hidden flex justify-between items-center tracking-[1px]'>
                      <span>{data_user?.data?.email?.slice(0, 2) + '*****' + data_user?.data?.email?.slice(7)}</span>
                    </div>
                  </td>
                  <td className='flex items-center justify-between lg:text-sm text-xs'>
                    Số điện thoại
                    {
                      data_user?.data && data_user?.data?.phone ?
                        <div className='lg:w-[70%] w-[50%] border py-1 lg:py-2 px-4 rounded text-gray-600 overflow-hidden'>{data_user?.data && data_user?.data?.phone}</div>
                        :
                        <Link href={''} className='lg:w-[70%] w-[40%] underline px-4 rounded text-sky-600'>thêm</Link>
                    }
                  </td>
                </tr>
              </tbody>
            </table>
            <section className='flex items-center justify-between my-5 py-5 border-t'>
              <span className='lg:text-xl text-sm'>Địa chỉ</span>
              <Button className='lg:text-sm text-xs px-2 lg:py-2 py-1.5 h-auto bg-[#597BFE] hover:bg-[#6f8bfc]' onClick={handle_Show_Form_Create_Address}>Thêm địa chỉ +</Button>
            </section>
            <div ref={form_create_address} className='fixed -translate-x-1/2 -translate-y-1/2 scale-0 duration-200 top-1/2 left-3/4 z-[11]'>
              <Address_component id_user={data_user?.data?._id} />
            </div>
            <div onClick={handle_Close_Form_Create_Address} ref={bg_form_create_address}
              className='fixed hidden w-screen h-screen top-0 left-0 z-[10] bg-[#33333355]'></div>
            <User_address _id_user={data_user?.data?._id} />
          </>
      }
    </div >
  )
}

export default Page_infor