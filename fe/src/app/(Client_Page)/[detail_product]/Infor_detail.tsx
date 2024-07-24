import Quantity_Items_Detail from "./quantity_Items";

const Infor_Detail_Product = ({ dataProps }: any) => {
  // const isClient = typeof window !== 'undefined';
  // console.log(isClient);
  const propsData = {
    price: dataProps?.price_product,
    attribute: dataProps?.attributes,
    id_item: dataProps?._id,
    stock: dataProps?.stock,
    data_attribute: dataProps?.attributes
  };
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
            {/* <Price_item dataProps={dataProps}/> */}
          </div>
        </div>
        <div className="py-5 *:w-full rounded-xl lg:-mt-5 -mt-1">
          {/* quantity */}
          <Quantity_Items_Detail data_Item_Detail={propsData} />
        </div>
        {/* different */}
        <span className="flex items-center gap-x-10 text-[#717378]">Xuất xứ<p className="text-[#060709]">:&nbsp;&nbsp;&nbsp; Việt Nam</p></span>
      </div>
    </div>
  )
}

export default Infor_Detail_Product