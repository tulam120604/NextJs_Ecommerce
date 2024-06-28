import Image from "next/image"

const Img_Detail_Product = () => {
  return (
    <div className="w-full h-full">
          <div className="w-full flex flex-col lg:items-center lg:gap-y-6 gap-y-3.5">
            <div className="handle_show_Image width={100} height={100}_product relative cursor-pointer w-full lg:h-[520px] mb:h-[342px] bg-white overflow-hidden grid place-items-center rounded-xl">
              <Image width={400} height={400} className="bg-[#F4F4F4] w-full h-full lg:p-8 mb:p-4" src="/Images/tao.png" alt='' />
              <div className="absolute bottom-0 cursor-pointer hover:scale-110 duration-300 right-0 -translate-x-1/2 -translate-y-1/2 lg:w-10 lg:h-10 mb:w-8 mb:h-8 lg:p-2.5 mb:p-2 rounded-[50%] bg-white grid place-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link">
                  <path d="M15 3h6v6" />
                  <path d="M10 14 21 3" />
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                </svg>
              </div>
            </div>
            <div className="*:lg:w-16 *:lg:h-16 *:mb:w-14 *:mb:h-14 *:p-2 *:bg-[#F4F4F4] *:rounded-lg *:duration-300 *:cursor-pointer flex items-center gap-x-4">
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