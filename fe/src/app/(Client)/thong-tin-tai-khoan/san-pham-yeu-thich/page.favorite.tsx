'use client'

import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots'
import List_Products from '@/src/app/_Components/Products/List_Products'
import { Infor_user } from '@/src/app/_lib/Query_APIs/Auth/Query_Auth'
import { List_favorites } from '@/src/app/_lib/Query_APIs/Favorites/Query_Feedback'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Page_favorite = () => {
  const routing = useRouter();
  const { data: data_user, isLoading: loading_user } = Infor_user();
  useEffect(() => {
    if (!data_user?.data) {
      routing.push('/login')
    }
  }, [data_user, routing]);

  const { data, isLoading, isError } = List_favorites();
  return (
    <div className='ml-10 min-h-[70vh] '>
      {isError ? (<><div className='grid place-items-center'>
        <div className='flex flex-col gap-y-2'>
          Ôi hỏng!
          <span>Có vẻ như đã có lỗi xảy ra :(( </span>
          <Link className='underline text-sky-500' href={'/'}>Trở về trang chủ!</Link>
        </div>
      </div></>) :
        (<>
          {
            isLoading || loading_user ?
              <Loading_Dots /> :
              (data?.data?.docs < 1 || !data?.data?.docs) ?
                (<div className='grid place-items-center translate-y-full'>
                  <div className='flex flex-col items-center gap-y-6 my-auto'>
                    <Image width={100} height={100} src='/Images/document_icon.png' alt='store88' />
                    <span className='flex items-center'>Chưa có sản phẩm yêu thích! <Link className='underline' href={'/products'}>Tìm ngay</Link></span>
                  </div>
                </div>)
                :
                <div className='*:lg:grid-cols-5'>
                  <div className='mb-5'>
                    <strong className='text-lg'>Sản phẩm yêu thích</strong>
                  </div>
                  <List_Products data={data?.data?.docs} />
                </div>
          }
        </>)}
    </div>
  )
}

export default Page_favorite