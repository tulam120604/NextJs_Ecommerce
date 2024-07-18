import Image from "next/image"
import Quantity_Items_Detail from "./quantity_Items";

const Infor_Detail_Product = ({ dataProps }: any) => {
  return (
    <div className="h-full w-full *:w-full lg:mt-0 mb:mt-[42px]">
      <div className="flex flex-col gap-y-2 lg:gap-y-6">
        {/* row 1 */}
        <div className="flex flex-col lg:gap-y-2">
          <strong className="lg:text-2xl lg:mt-[1px] mb:mt-3.5 mb:text-xl lg:tracking-[-1.2px] font-medium lg:leading-[38.4px]">{dataProps?.short_name}</strong>
          <div className="flex flex-col gap-y-2 justify-between">
            <section className="lg:w-[163px] mb:w-[157px] mb:mt-[8px] lg:mt-0 h-[21px] *:lg:text-sm *:mb:text-xs flex justify-between items-start">
              <div className="flex items-start lg:gap-x-0 mb:gap-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <strong>4.6/5</strong>
              </div>
              <div className="flex gap-x-2">
                <strong>135</strong>
                <span className="text-[#C8C9CB]">Reviews</span>
              </div>
            </section>
            <div className="flex items-center gap-x-2 items-end">
              <span className="font-medium text-[#EB2606] lg:text-2xl lg:font-normal lg:tracking-[0.7px] mb:text-base flex items-center lg:gap-x-3 lg:mt-0.5 mb:gap-x-2">
                <del className="font-light text-sm text-[#9D9EA2]">200.00 đ</del>{dataProps?.price_product?.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
            </div>
          </div>
        </div>
        {/* row 2 */}
        <div className="flex flex-col gap-y-2 lg:pb-0 mb:pb-[21px]">
          <span className="text-sm tracking-[1px] text-[#717378]">Mô tả ngắn</span>
          <p className="text-[14px] text-[#46494F]">Jungle Diamonds is a slightly indica dominant hybrid strain
            (60% indica/40% sativa) created through
            crossing the infamous Slurricane X Gorilla Glue #4 strains.</p>
        </div>
        {/* row 4 */}
        <div className="py-5 *:w-full rounded-xl lg:-mt-5 -mt-1">
          {/* quantity */}
          <Quantity_Items_Detail data_Item_Detail={{price : dataProps?.price_product, attribute :dataProps?.attributes, id_item : dataProps?._id}}/>
        </div>
        {/* different */}
          <span className="flex items-center gap-x-10 font-light text-[#717378]">Xuất xứ<p className="font-normal text-[#060709]">:&nbsp;&nbsp;&nbsp; Việt Nam</p></span>
      </div>
    </div>
  )
}

export default Infor_Detail_Product