'use client';

import Image from "next/image"
import Link from "next/link"

const Mini_Cart = () => {
    return (
        <div className="w-full p-4 bg-white">
            <span className="hidden">Không có sản phẩm nào !</span>
            <div className="">
                <div className="border-b pb-6 flex justify-between item-center">
                    <strong className="text-base font-normal text-[#060709]">Giỏ hàng của bạn</strong>
                    <span className="text-[#9D9EA2] text-sm font-light">(0)</span>
                </div>
                {/* list items and check out */}
                <div className="items_cart hidden_scroll_y">
                    {/* list item */}
                    <div className="hidden_scroll_y max-h-[40vh] flex flex-col gap-y-5 overflow-y-scroll mt-5">
                        {/* item */}
                        <div className="flex gap-x-4 border-b pb-5">
                            <Image width={100} height={100} className="w-14 h-14 p-2 border rounded-xl" src="/Images/img_product.png" alt='' />
                            <div className="w-full flex flex-col gap-y-5">
                                <section className="w-full flex flex-col gap-y-1.5">
                                    <div className="flex lg:items-center mb:items-start font-normal justify-between text-[#05422C]">
                                        <span>Shipwreck Edibles Gummy</span>
                                        <button className="w-6 h-6 rounded-[50%] border text-[#9D9EA2] font-light text-xs grid place-items-center">x</button>
                                    </div>
                                    <div className="w-full flex justify-between items-center">
                                       <div className="flex items-center gap-x-4">
                                       <span className="flex gap-x-2 text-[#717378] font-light">5x</span>
                                       <p className="font-normal">$13.00</p>
                                       </div>
                                       <p>$65.00</p>
                                    </div>
                                </section>
                            </div>
                        </div>

                    </div>
                    {/* check out */}
                    <div className="flex items-center justify-between pt-4 border-t">
                        <span className="tracking-[1px] text-[#717378]">Có 5 sản phẩm</span>
                        <Link className="bg-[#17AF26] text-white px-4 py-1 rounded" href={'/cart'}>Xem giỏ hàng</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mini_Cart