import Link from 'next/link';
import React from 'react'
import List_Products from '../../../Components/Products/List_Products';
import Loading_Dots from '@/src/app/Components/Loadings/Loading_Dots';

const Products_Home = ({ dataProps }: any) => {
    // const respon = await getRespon();
    // console.log(respon);
    return (
        <div className='lg:w-[1440px] mx-auto md:w-[90vw] mb:w-[342px] flex flex-col mb:py-7 border-b'>
            {dataProps?.status === 404 ? (<><div className='min-h-[70vh] grid place-items-center'>
                <div className='flex flex-col gap-y-2'>
                    Ôi hỏng!
                    <span>Có vẻ như đã có lỗi xảy ra :(( </span>
                    <Link className='underline text-sky-500' href={'/'}>Trở về trang chủ!</Link>
                </div>
            </div></>) :
                (<>
                    <div className="mx-auto lg:w-[1440px] md:w-[90vw] w-[342px] relative text-center mb-4 lg:mb-8">
                        <strong className="relative z-[2] text-[gray-800 font-medium bg-[#F5F5FA] lg:text-xl px-4 mb:text-lg">GỢI Ý HÔM NAY</strong>
                        <div className="absolute w-full h-[1px] bg-gray-400 top-1/2 z-[1]"></div>
                    </div>
                    {
                        dataProps?.data?.docs ?
                            <List_Products data={dataProps?.data?.docs} /> :
                            <Loading_Dots />

                    }
                    {
                        Array.isArray(dataProps?.data?.docs) &&
                        <div className='flex justify-center mt-4'>
                            <Link href={'/products'} className='border px-4 py-1 rounded bg-gray-900 hover:bg-gray-700 duration-300 text-white'>Xem Thêm</Link>
                        </div>
                    }
                </>)}
        </div>)
}

export default Products_Home