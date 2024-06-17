import Image from "next/image"

const Product_Item = () => {
    return (
        <div className="flex flex-col gap-y-4 snap-center overflow-hidden h-full rounded-xl">
            {/* Image */}
            <div className="relative group w-full lg:h-[240px] h-[200px] bg-[#F4F4F4] rounded-xl grid place-items-center">
                <Image width={100} height={100} className="w-full h-full p-5 cursor-pointer" src="/Images/tao.png" alt='' />
                <button className="absolute scale-0 group-hover:scale-100 group-hover:translate-y-0 -translate-y-[200%] duration-200 z-[2] px-8 py-4 rounded-[100px] border-none bg-[#1A1E2630] text-sm text-white backdrop-blur-md">Chi tiết</button>
                <section className="absolute top-0 lg:text-base text-sm cursor-default left-0 bg-[#F2BC1B] px-3 lg:py-1.5 py-0.5 text-white">- 20%
                </section>
            </div>
            {/* about */}
            <div className="w-full pb-2 flex flex-col gap-y-2 items-center">
                <strong className="font-light text-center text-[#9D9EA2]">Táo</strong>
                <strong className="text-lg line-clamp-2 font-normal text-[#1A1E26] my-1">Đây là mô tả ngắn của táo</strong>
                <section className="w-[163px] h-[21px] *:text-sm flex justify-between items-start">
                    <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <strong>4.6/5</strong>
                    </div>
                    |
                    <div className="flex gap-x-2">
                        <strong>135</strong>
                        <span className="text-[#C8C9CB]">Đánh giá</span>
                    </div>
                </section>
                <div className="flex my-2 items-center gap-x-2">
                    <span className="text-[#EB2606]">80.00 đ</span><del className="text-gray-500 text-sm">100.000 đ</del>
                </div>
                <button className="bg-[#17AF26] w-[128px] h-[40px] grid place-items-center rounded-[100px] text-sm text-white">
                    Thêm vào giỏ
                </button>
            </div>
        </div>
    )
}

export default Product_Item