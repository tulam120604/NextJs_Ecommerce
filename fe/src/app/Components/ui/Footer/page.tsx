'use client';

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className="w-full bg-[#01100B]">
            <div className="relative pt-20 lg:w-[1440px] md:w-[90vw] mb:w-[342px] mx-auto">
                {/* ***** */}
                <div className="flex lg:flex-row mb:flex-col lg:gap-x-16 lg:gap-y-0 gap-y-8 *:w-full">
                    <div className="lg:w-[385px]">
                        <Link className='text-2xl font-extrabold font-sans text-white' href={'/'}>
                            Store88
                        </Link>
                        <p className="text-[#9D9EA2] mt-1 font-normal lg:w-full w-[276px]">
                            #1 Canadian top rated online dispensary that meets the customers needs
                            in every single medical marijuana aspect. The team here at TopShelfBC is
                            heavily involved in the Canadian cannabis industry for over 15 years. We
                            strive to provide the top quality products, service and care at the
                            lowest prices you ll ever find.
                        </p>
                    </div>
                    <div className="lg:pl-[77px]">
                        <div className="lg:mb-[27px] mb-[25px]">
                            <h2 className="text-xl text-white tracking-[0.2px] uppercase translate-y-[2px] mb-[24px]">Quick Link</h2>
                            <ul className="columns-2 *:lg:mb-[13px] *:mb-[13.5px] gap-x-8">
                                <li>
                                    <a href="" className="text-[#9D9EA2] text-sm">Track Your Order</a>
                                </li>
                                <li>
                                    <a href="" className="text-[#9D9EA2] text-sm">Shop All</a>
                                </li>
                                <li>
                                    <a href="" className="text-[#9D9EA2] text-sm">Flower</a>
                                </li>
                                <li>
                                    <a href="" className="text-[#9D9EA2] text-sm">Edibles</a>
                                </li>
                                <li>
                                    <a href="" className="text-[#9D9EA2] text-sm">Concentrates</a>
                                </li>
                                <li>
                                    <a href="" className="text-[#9D9EA2] text-sm">Refunds</a>
                                </li>
                                <li>
                                    <a href="" className="text-[#9D9EA2] text-sm">Mushrooms</a>
                                </li>
                                <li>
                                    <a href="" className="text-[#9D9EA2] text-sm">Promotions / Bundles</a>
                                </li>
                                <li>
                                    <a href="" className="text-[#9D9EA2] text-sm">Support</a>
                                </li>
                                <li>
                                    <a href="" className="text-[#9D9EA2] text-sm">Reward</a>
                                </li>
                                <li>
                                    <a href="" className="text-[#9D9EA2] text-sm">Blog</a>
                                </li>
                                <li>
                                    <a href="" className="text-[#9D9EA2] text-sm">Shipping Faq</a>
                                </li>
                            </ul>
                        </div>
                        <div className="mb-4">
                            <h2 className="text-xl text-white uppercase tracking-[0.3px] translate-y-[1px] mb-6">CONTACT US</h2>
                            <ul>
                                <li>
                                    <a href="" className="text-[#9D9EA2] text-sm">info@topshelfbc.cc</a>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-10">
                            <h2 className="text-xl text-white uppercase mb-[23px]">More</h2>
                            <ul className="lg:columns-2 *:mb-[13px] lg:gap-x-8">
                                <li>
                                    <a href="" className="text-[#9D9EA2] text-sm">Buy weed online in Canada</a>
                                </li>
                                <li>
                                    <a href="" className="text-[#9D9EA2] text-sm">Buy weed online in New Brunswick</a>
                                </li>
                                <li>
                                    <a href="" className="text-[#9D9EA2] text-sm">Buy weed online in Prince Edward Island</a>
                                </li>
                                <li>
                                    <a href="" className="text-[#9D9EA2] text-sm">Buy weed online in Northwest Territories</a>
                                </li>
                                <li>
                                    <a href="" className="text-[#9D9EA2] text-sm">Buy weed online in Saskatchewan</a>
                                </li>
                                <li>
                                    <a href="" className="text-[#9D9EA2] text-sm">Buy weed online in Manitoba</a>
                                </li>
                                <li>
                                    <a href="" className="text-[#9D9EA2] text-sm">Buy weed online in Quitebec</a>
                                </li>
                                <li>
                                    <a href="" className="text-[#9D9EA2] text-sm">Buy weed online in British Columbia</a>
                                </li>
                                <li>
                                    <a href="" className="text-[#9D9EA2] text-sm">Buy weed online in Ontario</a>
                                </li>
                                <li>
                                    <a href="" className="text-[#9D9EA2] text-sm">Buy weed online in Alberta</a>
                                </li>
                            </ul>
                        </div>
                        <div className="mb:hidden lg:block ">
                            <div className="flex gap-x-4 mt-[25px]">
                                <Image width={56} height={32} src="/Images/mastercard_v1.png" className='w-14 h-8' alt="" />
                                <Image width={56} height={32} src="/Images/mastercard_v2.png" className='w-14 h-8' alt="" />
                                <Image width={56} height={32} src="/Images/mastercard_v3.png" className='w-14 h-8' alt="" />
                                <Image width={56} height={32} src="/Images/mastercard_v4.png" className='w-14 h-8' alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row items-center lg:justify-between border-[#46494F] border-t pt-10 pb-8 mt-16">
                    <p className="order-2 lg:order-1 text-[#9D9EA2] text-base">
                        © 2022 Top Shelf BC. All Rights Reserved.
                    </p>
                    <ul className="order-1 lg:order-2 flex items-center gap-x-8 -translate-y-[0.7px]">
                        <li><a href="" className="text-[#9D9EA2] text-sm">Out Of Stock</a></li>
                        <li><a href="" className="text-[#9D9EA2] text-sm">Privacy Policy</a></li>
                        <li><a href="" className="text-[#9D9EA2] text-sm">Terms &amp; Conditions</a></li>
                    </ul>
                </div>
            </div>
        </footer>

    )
}

export default Footer