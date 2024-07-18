/* eslint-disable @next/next/no-img-element */
import Image from "next/image"

const Img_Detail_Product = ({dataProps} : any) => {
  return (
    <div className="w-full h-full">
          <div className="w-full flex flex-col lg:items-center lg:gap-y-6 gap-y-3.5">
            <div className="relative cursor-pointer w-full lg:h-[520px] mb:h-[342px] bg-white overflow-hidden rounded">
              <img width={400} height={400} className="bg-[#F4F4F4] w-full h-full lg:p-4 mb:p-2" src={dataProps?.feature_product} alt='' />
            </div>
            <div className="*:lg:w-16 *:lg:h-16 *:mb:w-14 *:mb:h-14 *:p-2 *:bg-[#F4F4F4] *:rounded *:duration-300 *:cursor-pointer flex items-center gap-x-4">
              <button className="hover:scale-110">
                <Image width={100} height={100} src="/Images/tao.png" alt='' />
              </button>
              <button className="hover:scale-110">
                <Image width={100} height={100} src="/Images/tao.png" alt='' />
              </button>
              <button className="hover:scale-110">
                <Image width={100} height={100} src="/Images/tao.png" alt='' />
              </button>
              <button className="hover:scale-110">
                <Image width={100} height={100} src="/Images/tao.png" alt='' />
              </button>
            </div>
          </div>
        </div>
  )
}

export default Img_Detail_Product