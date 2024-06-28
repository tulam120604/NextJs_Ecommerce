
import { Loading_Component } from '@/app/Components/Loadings/LoadingPage';
import Product_Item from '@/app/Components/Products/Product_Item';
import { Limit_Item } from '@/app/_lib/Tanstack_Query/Items/query';
import Link from 'next/link';
import React from 'react'

const Products_Home = () => {
    // const {data, isPending} = Limit_Item(10);
    // if (isPending) {
    //     return <Loading_Component/>
    // }

    // fake data render html
    const data = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    return (
        <div className="lg:w-[1440px] mx-auto sm:w-[95vw] mb:w-[342px] flex flex-col lg:py-4 mb:py-7">
            <div className="mx-auto lg:w-full md:w-[90vw] w-[342px] flex justify-between items-center">
                <strong className="relative bg-white lg:text-[32px] mb:text-xl lg:leading-[70px] mb:leading-[38.5px]">
                 Danh sách sản phẩm</strong>
                 <Link className='underline cursor-pointer lg:text-base text-sm text-[#17af26]' href='/products'>Xem tất cả</Link>
            </div>
            <div className="grid lg:py-16 pb:my-10 snap-x lg:grid-cols-[19%_19%_19%_19%_19%] mb:grid-cols-[159px_159px] justify-between lg:gap-y-8 mb:gap-y-[29px] mb:pt-10">
                {
                    data?.map((item : any) => {
                        return (
                            <Product_Item key={item} dataProps={item}/>
                        )
                    })
                }
            </div>
        </div>

    )
}

export default Products_Home