import Link from 'next/link';
import { unstable_noStore as noStore } from 'next/cache';
import React from 'react'
import List_Products from '../../Components/Products/List_Products';
import { getLimit } from '../../_lib/Fn_Items/products';

const Products_Home = async () => {
    noStore();
    // const respon = await getRespon();
    // console.log(respon);
    const data = await getLimit(42);
    return (
        <div className='lg:w-[1440px] mx-auto md:w-[90vw] mb:w-[342px] flex flex-col mb:py-7 border-b'>
            {data?.status === 404 ? (<><div className='min-h-[70vh] grid place-items-center'>
                <div className='flex flex-col gap-y-2'>
                    Ôi hỏng!
                    <span>Có vẻ như đã có lỗi xảy ra :(( </span>
                    <Link className='underline text-sky-500' href={'/'}>Trở về trang chủ!</Link>
                </div>
            </div></>) : (<>
                <div className="mx-auto lg:w-[1440px] md:w-[90vw] w-[342px] relative text-center">
                    <strong className="relative text-[#05422C] font-medium bg-white lg:text-xl px-4 mb:text-lg">Gợi ý cho bạn</strong>
                    <div className="absolute w-full h-[1px] bg-gray-400 top-1/2 z-[-1]"></div>
                </div>
                <List_Products data={data} />
                {
                    Array.isArray(data) &&
                    <div className='flex justify-center mt-4'>
                        <Link href={'/products'} className='border px-4 py-1 rounded bg-gray-900 hover:bg-gray-700 duration-300 text-white'>Xem Thêm</Link>
                    </div>
                }

            </>)}
        </div>)
}

export default Products_Home