import Product_Item from "@/app/Components/Products/Product_Item"
import { Query_Items } from "@/app/_lib/Tanstack_Query/Items/query";


const Best_Sellers = () => {

    // const {data} = Query_Items();

    // fake data arr render html
    const data = [1,1,1,1,1,1,1,1,1,1,1,1,1,1]

    return (
        <div className="lg:w-[1440px] md:w-[90vw] w-[342px] mx-auto text-center lg:pt-10 mb:pt-10 mb:pb-5">
            <div className="mx-auto lg:w-[1440px] md:w-[90vw] w-[342px] relative">
                <strong className="relative text-[#05422C] bg-white lg:text-[32px] px-4 mb:text-xl lg:leading-[70px] mb:leading-[38.5px]">
                    Sản phẩm nổi bật</strong>
                <div className="absolute w-full h-[1px] bg-gray-400 top-1/2 z-[-1]"></div>
            </div>
            {/* menu service */}
            <div className="w-full flex justify-center mb:mt-8">
                <div className="hidden_scroll_x flex mb:w-[342px] lg:w-full mb:overflow-x-auto lg:ml-0 flex-nowrap *:px-4
                    *:whitespace-nowrap md:gap-x-[32px] grid-flow-row mb:gap-x-[16px] *:mb:h-[40px] *:sm:h-[48px] *:lg:text-base *:mb:text-sm *:rounded-[100px] *:duration-300">
                    <button className="border bg-[#17AF26] text-white">Bán chạy nhất</button>
                    <button className="border border-gray-300 border-[#17AF26] hover:bg-[#17AF26] hover:text-white">Khuyến mãi</button>
                </div>
            </div>
            {/* products best seler  */}
            <div className="w-full relative lg:my-16 mb:my-[22px] mb:overflow-x-auto hidden_scroll_x">
                <div className="lg:w-[1440px] flex justify-center overflow-hidden">
                    <div className="grid sm:gap-x-[32px] mb:w-[342px] sm:w-[95vw] mb:gap-y-10 sm:gap-y-0 mb:flex-col items-center lg:w-full rounded-xl">
                        {/* product */}
                        <div className="h-full snap-x overflow-x-auto hidden_scroll_x rounded-lg pb-10">
                            <div className="grid grid-flow-col *:lg:shadow-lg lg:auto-cols-[291px] auto-cols-[240px] *:!rounded-lg *:w-full h-full gap-x-[32px] *:pb-4">
                                {
                                    data?.map((item : any) => {
                                        return (
                                            <Product_Item key={item} dataProps={item}/>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* back, next */}
                <div className="lg:w-auto gap-x-10 *:duration-200 *:lg:bg-gray-100 flex justify-center *:shadow-2xl *:w-9 *:h-9 *:grid *:place-items-center *:rounded-[50%] *:bg-gray-100">
                    <button className="hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>
                    <button className="hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div >
            {/* ---- */}
        </div >

    )
}

export default Best_Sellers