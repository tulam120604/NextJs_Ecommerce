/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import Btn_Add_Cart from "../Btn/Btn_Add_Cart";

const Product_Item = ({ dataProps }: any) => {
    // console.log(typeof dataProps?.price_product?.toLocaleString('vi', { style: 'currency', currency: 'VND' }))
    return (
        <Link href={`/products/${dataProps?._id}`} className="flex flex-col w-full snap-center border-[1.5px] hover:-translate-y-0.5 border-gray-300 hover:border-red-500 relative duration-150 cursor-pointer h-full rounded overflow-hidden">
            {/* Image */}
            <div className="relative group w-full lg:h-[200px] shadow sm:h-[160px] h-[120px] bg-[#F4F4F4] overflow-hidden rounded grid place-items-center">
                <Image loading='lazy' width={300} height={300} className="w-full h-full cursor-pointer" src={dataProps?.feature_product} alt='Loading...' />
                <section className="absolute top-0 lg:text-base sm:text-sm text-xs cursor-default left-0 bg-[#F2BC1B] px-3 lg:py-1 rounded py-0.5 text-white">- 20%
                </section>
            </div>
            {/* about */}
            <div className="w-full p-4 flex flex-col gap-y-1.5 items-start h-[120px] justify-between">
                <strong className="lg:text-base text-start w-full text-sm line-clamp-2 font-normal text-[#1A1E26]">{dataProps.short_name}</strong>
                <div className="flex items-center gap-x-2">
                <span className="text-[#EB2606]">{(dataProps?.price_product)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                   <del className="text-gray-500 text-sm">100.000 đ</del>
                    {/* <Btn_Add_Cart data_Btn={dataProps?._id} /> */}
                </div>
            </div>
        </Link>
    )
}

export default Product_Item