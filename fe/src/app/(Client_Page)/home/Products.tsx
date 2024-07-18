'use client';

import { Limit_Item } from '@/src/app/_lib/Tanstack_Query/Items/query';
import Link from 'next/link';
import React from 'react'
import List_Products from '../../Components/Products/List_Products';
import LoadingLandingPage from './loading';

const Products_Home = () => {
    const { data, isLoading } = Limit_Item(10);
    if (isLoading) {
        return <LoadingLandingPage />
    }
    return (
        <div className='lg:w-[1440px] mx-auto md:w-[90vw] mb:w-[342px] flex flex-col mb:py-7 border-b'>
            <div className="mx-auto lg:w-[1440px] md:w-[90vw] w-[342px] relative text-center">
                <strong className="relative text-[#05422C] font-medium bg-white lg:text-xl px-4 mb:text-lg">Gợi ý cho bạn</strong>
                <div className="absolute w-full h-[1px] bg-gray-400 top-1/2 z-[-1]"></div>
            </div>
            <List_Products data={data} />
            <div className='flex justify-center mt-4'>
                <Link href={'/products'} className='border px-4 py-1 rounded bg-gray-900 hover:bg-gray-700 duration-300 text-white'>Xem Thêm</Link>
            </div>
        </div>)
}

export default Products_Home