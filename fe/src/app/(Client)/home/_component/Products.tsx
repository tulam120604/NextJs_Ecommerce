import Link from 'next/link';
import React from 'react'
import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots';
import { unstable_noStore as noStore } from 'next/cache';
import { GET_limit_item } from '@/src/app/_lib/Services/Services_Items/products';
import ReloadPage from '@/src/app/_Components/Pages/ReloadPage';
import List_Products from '@/src/app/_Components/Products/List_Products';

const Products_Home = async () => {
    noStore();
    const data = await GET_limit_item(42);
    //   const isClient = typeof window !== 'undefined';
    // console.log(isClient);
    return (
        <div className='max-w-[1440px] mx-auto w-[95vw] flex flex-col mb:py-7 border-b'>
            {(data?.status === 404 || data?.status === 500) ? (<><div className='min-h-[70vh] grid place-items-center'>
                <ReloadPage />
            </div></>) :
                (<>
                    <div className="relative text-center mb-4 lg:mb-8 bg-white py-4 border-b-4 border-gray-700">
                        <strong className="relative z-[2] text-[gray-800 font-medium lg:text-lg px-4">GỢI Ý HÔM NAY</strong>
                    </div>
                    {
                        data?.data?.docs ?
                            ((data?.data?.docs?.length < 1) ? <span className='text-center'>Không có dữ liệu!</span> :
                                <List_Products data={data?.data?.docs} />) :
                            <Loading_Dots />
                    }
                    {
                        Array.isArray(data?.data?.docs) &&
                        (data?.data?.docs > 42) &&
                        <div className='flex justify-center mt-4'>
                            <Link href={'/products'} className='border px-4 py-1 rounded bg-gray-900 hover:bg-gray-700 duration-300 text-white'>Xem Thêm</Link>
                        </div>
                    }
                </>)}
        </div>)
}

export default Products_Home