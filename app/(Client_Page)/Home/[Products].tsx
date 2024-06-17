import Product_Item from '@/app/Components/Products/Product_Item';
import Link from 'next/link';
import React from 'react'

const Products_Home = () => {

    const arr = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <div className="lg:w-[1200px] mx-auto sm:w-[95vw] mb:w-[342px] flex flex-col lg:py-4 mb:py-7">
            <div className="mx-auto lg:w-[1200px] md:w-[90vw] w-[342px] flex justify-between items-center">
                <strong className="relative bg-white lg:text-[32px] mb:text-[24px] lg:leading-[70px] mb:leading-[38.5px]">
                 Danh sách sản phẩm</strong>
                 <Link className='underline cursor-pointer text-[#17af26]' href=''>Xem tất cả</Link>
            </div>
            <div className="grid lg:py-16 pb:my-10 snap-x lg:grid-cols-[276px_276px_276px_276px] mb:grid-cols-[159px_159px] justify-between lg:gap-y-8 mb:gap-y-[29px] mb:pt-10">
                {
                    arr?.map((item) => {
                        return (
                            <Product_Item key={item} />
                        )
                    })
                }
            </div>
        </div>

    )
}

export default Products_Home