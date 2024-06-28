'use client';

import Image from 'next/image'
import React, { useState } from 'react'
import Filter_Products from './Filter'
import Product_Item from '@/app/Components/Products/Product_Item'
import Link from 'next/link'
import { Paginate_Item } from '@/app/_lib/Tanstack_Query/Items/query'
import { Loading_Component } from '@/app/Components/Loadings/LoadingPage';

const Render_Products = () => {
    const [page, setPage] = useState<number>(1);
    // data server
    // const {data, isPending} = Paginate_Item(page);

    // if (isPending) {
    //     return (
    //         <div className='w-full'>
    //             <Loading_Component/>
    //         </div>
    //     )
    // }

    // fake data render html
    const data = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
    const firstData = data.slice(0, 12);
    const lastData = data.slice(12)
    return (
        <div className="w-full flex flex-col mb:items-center lg:items-start *:lg:px-6">
            <div className="mb:w-[342px] md:w-full flex justify-between items-center lg:my-0 my-10">
                <div className='flex justify-between w-full items-center relative'>
                    <div className='flex items-center text-sm gap-x-2 font-medium capitalize text-gray-700'>
                    <Link href={'/'} className='hover:text-black'>Trang chủ</Link>/
                    <Link href={'/products'} className='hover:text-black'>Sản phẩm</Link>
                    </div>

                    <div className="lg:hidden group cursor-pointer">
                        <strong className="mb:text-sm flex items-center lg:text-base font-medium whitespace-nowrap">Bộ lọc sản phẩm <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:rotate-180 duration-300" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg></strong>
                        <div className='absolute z-[2] rounded-lg shadow-2xl top-[100%] right-0 bg-white px-4 w-[40vw] hidden group-hover:block
                        before:w-full before:h-6 before:bg-none before:absolute before:top-0 before:right-0 before:-translate-y-1/2'><Filter_Products /></div>
                    </div>
                </div>
            </div>
            {/* render products */}
            <div className="mb:w-[342px] lg:shadow-xl lg:w-full md:w-full grid lg:py-8 rounded-lg lg:grid-cols-[23.5%_23.5%_23.5%_23.5%] md:grid-cols-[30%_30%_30%] mb:grid-cols-[159px_159px] lg:gap-y-8 mb:gap-y-6 text-center justify-between">
               {
                firstData?.map((item : any) => {
                    return (
                        <Product_Item key={item} dataProps={item}/>
                    )
                })
               }
            </div>
            {/* contentratest */}
            <div className="lg:w-full lg:shadow-xl mb:w-full lg:rounded-3xl lg:my-8 mb:my-2 lg:h-[460px] mb:h-[671px] bg-gradient-to-r from-[#05422C] lg:pl-[56px] lg:pr-[88px] to-[#648A7C] mb:py-6 flex lg:flex-row mb:flex-col items-center justify-between">
                {/* left */}
                <div className="lg:w-[341px] lg:h-[348px] mb:h-[239px] w-[342px] text-white flex flex-col justify-between">
                    <span className="lg:text-sm mb:text-xs opacity-30 lg:tracking-[4px] mb:tracking-[2px]">CONCENTRATES</span>
                    <strong className="lg:text-[32px] lg:leading-[38px] mb:text-[24px] lg:font-semibold lg:tracking-[-1.4px] lg:-mt-1 mt-1.5 font-medium tracking-[-0.5px]">Mix
                        And Match Shatter/<br className="lg:hidden" />Budder 28g <br className="hidden lg:block" /> (4 X 7G)</strong>
                    <section className="w-[163px] h-[21px] lg:translate-y-2.5 *:text-sm flex justify-between items-center lg:mt-0 mt-2.5">
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            <strong>4.6/5</strong>
                        </div>
                        |
                        <div className="flex gap-x-2">
                            <strong>135</strong>
                            <span className="text-[#C8C9CB]">Reviews</span>
                        </div>
                    </section>
                    <div className="flex *:text-xs *:py-[7px] *:px-[10px] gap-x-2 my-3 *:border *:rounded">
                        <button>28g</button>
                        <button>1/2lb</button>
                        <button>1/4lb</button>
                    </div>
                    <div className="flex justify-between items-center">
                        <button className="bg-[#17AF26] lg:w-[172px] lg:h-[56px] lg:px-0 px-[19px] mb:h-[40px] grid place-items-center rounded-[100px] lg:text-base text-sm text-white">
                            Add to Cart
                        </button>
                        <span className="font-normal lg:text-xl mb:text-lg text-[#F2BC1B]">$102.00 <del className="lg:text-sm mb:text-mb text-white">$200.00</del></span>
                    </div>
                </div>
                {/* right */}
                <div className="relative lg:w-[373px] mb:w-[342px] h-[344px] flex flex-col items-center justify-between">
                    <div className="w-full h-[322px] bg-[#ffffff12] grid place-items-center rounded-2xl overflow-hidden">
                        <Image width={100} height={100} className='w-full h-full' src="/Images/tao.png" alt='' />
                    </div>
                    {/* *****  */}
                    <div className="*:relative flex *:w-1.5 *:h-1.5 *:rounded-[50%] gap-x-2 *:after:content-[''] *:after:absolute *:after:-top-1/2 *:after:-left-1/2 *:after:rounded-[50%] *:after:bg-[#ffffff20]">
                        <button className="bg-[#ffffff] after:w-3 after:h-3" />
                        <button className="bg-[#ffffff20] hover:after:w-3 hover:after:h-3 hover:bg-white" />
                        <button className="bg-[#ffffff20] hover:after:w-3 hover:after:h-3 hover:bg-white" />
                        <button className="bg-[#ffffff20] hover:after:w-3 hover:after:h-3 hover:bg-white" />
                    </div>
                    {/* back and next */}
                    <div className="absolute top-1/2 -translate-y-full w-full flex justify-between *:w-7 *:h-7 *:rounded-[50%] *:bg-white *:grid *:place-items-center">
                        <button className="-translate-x-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </button>
                        <button className="translate-x-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* products */}
            <div className="lg:w-full lg:shadow-xl mb:w-[342px] md:w-full grid mt-8 lg:mb-8 pb-[30px] rounded-lg lg:grid-cols-[23.5%_23.5%_23.5%_23.5%] md:grid-cols-[30%_30%_30%] mb:grid-cols-[159px_159px] lg:gap-y-8 gap-y-6 text-center justify-between">
            {
                lastData?.map((item : any) => {
                    return (
                        <Product_Item key={item} dataProps={item}/>
                    )
                })
               }
            </div>
            {/* list page */}
            <div className="lg:w-full flex lg:flex-row mb:flex-col justify-between items-center lg:pt-6 pt-[18px] mb:gap-y-5 lg:gap-y-0">
                {/* show page */}
                <span className="lg:w-auto  mb:w-full text-[#717378] lg:text-sm mb:text-xs">Showing 1-30 of 393
                    results</span>
                {/* list page */}
                <div className="md:w-auto mb:w-[342px] flex items-center justify-left *:w-9 *:h-9 *:rounded-[50%] *:grid *:place-items-center md:gap-x-3 gap-x-1 text-xs lg:text-sm">
                    <button className="border">
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>
                    {/* **** */}
                    <button onClick={() => setPage(1)} className="bg-[#F2F6F4]">1</button>
                    <button onClick={() => setPage(2)} className="hover:bg-[#f2f6f4]">2</button>
                    <button onClick={() => setPage(3)} className="hover:bg-[#f2f6f4]">3</button>
                    <button onClick={() => setPage(4)} className="hover:bg-[#f2f6f4]">4</button>
                    <span className="hover:bg-[#f2f6f4]">...</span>
                    <button className="hover:bg-[#f2f6f4]">55</button>
                    {/* **** */}
                    <button className="border">
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>



    )
}

export default Render_Products