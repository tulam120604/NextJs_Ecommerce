import Image from "next/image"
import Link from "next/link"

const Product_Item = ({dataProps} : any | undefined) => {
    return (
        <div className="flex flex-col gap-y-2 snap-center overflow-hidden h-full rounded">
            {/* Image */}
            <Link href={`/products/${dataProps?._id  ? dataProps?._id : 'detail_products'}`} className="relative group w-full lg:h-[240px] h-[200px] bg-[#F4F4F4] rounded grid place-items-center">
                <Image loading='lazy' width={100} height={100} className="w-full h-full p-5 cursor-pointer" src="/Images/tao.png" alt='' />
                <button className="absolute scale-0 group-hover:scale-100 group-hover:translate-y-0 -translate-y-[200%] duration-200 z-[2] px-8 py-4 rounded-[100px] border-none bg-[#1A1E2630] text-sm text-white backdrop-blur-md">Chi tiết</button>
                <section className="absolute top-0 lg:text-base text-sm cursor-default left-0 bg-[#F2BC1B] px-3 lg:py-1 rounded py-0.5 text-white">- 20%
                </section>
            </Link>
            {/* about */}
            <div className="w-full pb-2 flex flex-col gap-y-1.5 items-center">
                {/* <strong className="font-light text-center text-gray-700">{dataProps ? dataProps.name_product : 'Tao'}</strong> */}
                <strong className="font-light text-center text-gray-700">Tao</strong>
                {/* <strong className="text-base line-clamp-2 font-normal text-[#1A1E26]">{dataProps ? dataProps.title_product : 'Day la mo ta san pham'}</strong> */}
                <strong className="text-base line-clamp-2 font-normal text-[#1A1E26]">Day la mo ta san pham</strong>
                <div className="flex items-center gap-x-2">
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