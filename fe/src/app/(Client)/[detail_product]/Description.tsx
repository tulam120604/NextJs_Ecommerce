'use client'


import Image from 'next/image'
import React from 'react'
import { Button } from '../../Components/ui/Shadcn/button'

const Description = ({ dataProps }: any) => {
    return (
        <>
            {/* description */}
            <div className="flex flex-col rounded">
                {/* menu description */}
                <div className='p-4 rounded bg-white'>
                    <span className="text-xl">Mô tả</span>
                    {/* text description */}
                    <div className="show_description my-4">
                        {dataProps?.des_product}
                    </div>
                </div>
                {/* detail comment */}
                <section className="show_review mt-8 rounded p-4 bg-white">
                    <span className="text-xl flex gap-x-2">Đánh giá
                        <p>(350)</p>
                    </span>
                    <div className="flex flex-col text-sm text-[#46494F] leading-[21px] gap-y-4 lg:pt-6 mb:pt-5 mb:pb-0">
                        {/* content comment 1 */}
                        <div className="border-t lg:p-6 mb:p-5">
                            {/* user and time comment */}
                            <div className="flex items-center *:flex *:items-center gap-x-4 border-b border-[#F4F4F4] pb-4 mb-4">
                                <Image width={36} height={36} src="/Images/vikki_user_icon.png" alt='' />
                                <strong className="text-base text-[#1A1E26] font-medium gap-x-4">Vikki Starr <span className="text-sm text-[#9D9EA2] font-light">|</span> <span className="text-sm text-[#9D9EA2] font-light">January 15, 2023</span></strong>
                            </div>
                            {/* text comment */}
                            <p className="text-[#1A1E26] text-base">Absolutely love TopShelfBC; affordable on any budget and such fast
                                delivery, straight to my door! I
                                recommend them to all my friends and family for their 420 needs.</p>
                        </div>
                        {/* content comment 2 */}
                        <div className="border-t lg:p-6 mb:p-5">
                            {/* user and time comment */}
                            <div className="flex items-center *:flex *:items-center gap-x-4 border-b border-[#F4F4F4] pb-4 mb-4">
                                <Image width={36} height={36} src="/Images/vikki_user_icon.png" alt='' />
                                <strong className="text-base text-[#1A1E26] font-medium gap-x-4">Terry Baskey <span className="text-sm text-[#9D9EA2] font-light">|</span> <span className="text-sm text-[#9D9EA2] font-light">January 15, 2023</span></strong>
                            </div>
                            <p className="text-[#1A1E26] text-base">Best damn place to buy your canabis at great prices.</p>
                        </div>
                        {/*btn show more */}
                        <div className="flex justify-center my-1">
                            <Button>Xem thêm</Button>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Description