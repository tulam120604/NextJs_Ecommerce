import Link from 'next/link';
import React from 'react'
import List_Products from '../../Components/Products/List_Products';
import { getRespon } from '../../_lib/Fn_Items/products';

const Products_Home =async  () => {
    const respon = await getRespon();
    console.log(respon);
    return (
        <div className='lg:w-[1440px] mx-auto md:w-[90vw] mb:w-[342px] flex flex-col mb:py-7 border-b'>
            <div className="mx-auto lg:w-[1440px] md:w-[90vw] w-[342px] relative text-center">
                <strong className="relative text-[#05422C] font-medium bg-white lg:text-xl px-4 mb:text-lg">Gợi ý cho bạn</strong>
                <div className="absolute w-full h-[1px] bg-gray-400 top-1/2 z-[-1]"></div>
            </div>
            <List_Products data={respon?.data?.docs} />
            <div className='flex justify-center mt-4'>
                <Link href={'/products'} className='border px-4 py-1 rounded bg-gray-900 hover:bg-gray-700 duration-300 text-white'>Xem Thêm</Link>
            </div>
        </div>)
}

export default Products_Home