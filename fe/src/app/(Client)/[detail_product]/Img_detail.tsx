/* eslint-disable @next/next/no-img-element */
import Image from "next/image"

const Img_Detail_Product = ({dataProps} : any) => {
  return (
    <div className="w-full h-full p-2">
          <div className="w-full flex flex-col lg:items-center lg:gap-y-6 gap-y-3.5">
            <div className="relative bg-[#F5F5FA] cursor-pointer w-full lg:h-[450px] mb:h-[342px] overflow-hidden rounded border-4">
              <img width={400} height={400} className="bg-white w-full h-full" src={dataProps?.feature_product} alt='' />
            </div>
            <div className="*:lg:w-20 *:lg:h-20 *:mb:w-14 *:border *:mb:h-14 *:overflow-hidden *:bg-white *:rounded *:duration-200 *:cursor-pointer flex items-center gap-x-4">
              <button className="hover:border-gray-800">
                <Image width={100} height={100} src={dataProps?.feature_product} alt='' />
              </button>
              <button className="hover:border-gray-800">
                <Image width={100} height={100} src={dataProps?.feature_product} alt='' />
              </button>
              <button className="hover:border-gray-800">
                <Image width={100} height={100} src={dataProps?.feature_product} alt='' />
              </button>
              <button className="hover:border-gray-800">
                <Image width={100} height={100} src={dataProps?.feature_product} alt='' />
              </button>
            </div>
          </div>
        </div>
  )
}

export default Img_Detail_Product