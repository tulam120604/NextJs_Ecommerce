import Image from 'next/image'
import React from 'react'

const Description = ({dataProps} : any) => {
    return (
        <>
            {/* description */}
            <div className="flex flex-col border-y lg:py-10 lg:mt-10 mb:py-[34px] mb:mt-8">
                {/* menu description */}
                <span className="underline text-xl">Mô tả</span>
                {/* text description */}
                <div className="show_description">
                    <section className="flex flex-col text-sm text-[#46494F] leading-[21px] gap-y-4 lg:py-6 mb:pt-[19px]">
                        <p>{dataProps?.des_product}</p>
                    </section>
                </div>
                {/* detail comment */}
                <section className="show_review">
                    <span className="underline text-xl flex gap-x-2">Đánh giá
                        <p>(350)</p>
                    </span>
                    <div className="flex flex-col text-sm text-[#46494F] leading-[21px] gap-y-4 lg:pt-6 mb:pt-5 mb:pb-0">
                        {/* content comment 1 */}
                        <div className="border rounded lg:p-6 mb:p-5">
                            {/* user and time comment */}
                            <div className="flex items-center *:flex *:items-center gap-x-4 border-b border-[#F4F4F4] pb-4 mb-4">
                                <Image width={36} height={36} src="/Images/vikki_user_icon.png" alt='' />
                                <strong className="text-base text-[#1A1E26] font-medium gap-x-4">Vikki Starr <span className="text-sm text-[#9D9EA2] font-light">|</span> <span className="text-sm text-[#9D9EA2] font-light">January 15, 2023</span></strong>
                            </div>
                            {/* text comment */}
                            <section className="flex flex-col gap-y-4">
                                <nav className="flex items-center gap-x-1">
                                    <Image width={10} height={10} src="/Images/star.png" alt='' />
                                    <Image width={10} height={10} src="/Images/star.png" alt='' />
                                    <Image width={10} height={10} src="/Images/star.png" alt='' />
                                    <Image width={10} height={10} src="/Images/star.png" alt='' />
                                    <Image width={10} height={10} src="/Images/star.png" alt='' />
                                </nav>
                                <p className="text-[#1A1E26] text-base">Absolutely love TopShelfBC; affordable on any budget and such fast
                                    delivery, straight to my door! I
                                    recommend them to all my friends and family for their 420 needs.</p>
                            </section>
                        </div>
                        {/* content comment 2 */}
                        <div className="border rounded lg:p-6 mb:p-5">
                            {/* user and time comment */}
                            <div className="flex items-center *:flex *:items-center gap-x-4 border-b border-[#F4F4F4] pb-4 mb-4">
                                <Image width={36} height={36} src="/Images/vikki_user_icon.png" alt='' />
                                <strong className="text-base text-[#1A1E26] font-medium gap-x-4">Terry Baskey <span className="text-sm text-[#9D9EA2] font-light">|</span> <span className="text-sm text-[#9D9EA2] font-light">January 15, 2023</span></strong>
                            </div>
                            {/* text comment */}
                            <section className="flex flex-col gap-y-4">
                                <nav className="flex items-center gap-x-1">
                                    <Image width={10} height={10} src="/Images/star.png" alt='' />
                                    <Image width={10} height={10} src="/Images/star.png" alt='' />
                                    <Image width={10} height={10} src="/Images/star.png" alt='' />
                                    <Image width={10} height={10} src="/Images/star.png" alt='' />
                                    <Image width={10} height={10} src="/Images/star.png" alt='' />
                                </nav>
                                <p className="text-[#1A1E26] text-base">Best damn place to buy your canabis at great prices.</p>
                            </section>
                        </div>
                        {/*btn show more */}
                        <div className="flex justify-center my-1">
                            <button className="px-5 py-2 text-[#17AF26] text-sm rounded-[100px] border hover:bg-[#F9F9F9] cursor-pointer duration-300">Show
                                More</button>
                        </div>
                        {/* add comment */}
                        <div className="flex flex-col gap-y-6 border-t lg:pt-7 lg:pb-[22px]">
                            <strong className="lg:text-lg">Đánh giá sản phẩm</strong>
                            <section className="flex item-center gap-x-4">
                                <span className="mt-0.5">Xếp hạng</span>
                                <span>:</span>
                                <div className="flex item-center *:w-5 *:h-5 gap-x-1 *:cursor-pointer">
                                    <Image width={100} height={100} src="/Images/star_no_color.png" alt='' />
                                    <Image width={100} height={100} src="/Images/star_no_color.png" alt='' />
                                    <Image width={100} height={100} src="/Images/star_no_color.png" alt='' />
                                    <Image width={100} height={100} src="/Images/star_no_color.png" alt='' />
                                    <Image width={100} height={100} src="/Images/star_no_color.png" alt='' />
                                </div>
                            </section>
                            <form className="-mt-1.5">
                                <span>Nội dung</span>
                                <div className="overflow-hidden lg:p-4 rounded border border-gray-200 shadow-sm focus-within:border-none focus-within:ring-1 focus-within:none mt-2">
                                    <textarea id="OrderNotes" className="w-full resize-none outline-none border-none align-top focus:ring-0 sm:text-sm" rows={3} placeholder="Enter your review" defaultValue={""} />
                                </div>
                                <button className="px-6 hover:bg-gray-700 duration-200 py-2 bg-black rounded text-base text-white mt-4">Submit</button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Description