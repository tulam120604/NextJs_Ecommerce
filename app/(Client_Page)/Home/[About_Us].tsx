'use client'

import Image from "next/image"

const About_Us = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="lg:w-[1200px] mb:w-[342px] flex flex-col">
        {/* TEXT */}
        <div className="lg:w-[789px] flex flex-col text-center">
          <div className="mx-auto lg:w-[1200px] md:w-[90vw] w-[342px] relative">
            <strong className="relative bg-white lg:text-[32px] px-4 mb:text-[24px] lg:leading-[70px] mb:leading-[38.5px]">
              Dịch vụ &#38; chất lượng sản phẩm của chúng tôit</strong>
            <div className="absolute w-full h-[1px] bg-gray-400 top-1/2 z-[-1]"></div>
          </div>
        </div>
        {/* BOX */}
        <div className="w-full lg:mt-10 mb:mt-4 lg:grid mb:flex mb:flex-col lg:grid-cols-[379px_379px_379px] lg:justify-between lg:gap-y-10 *:mb:mb-6 *:lg:mb-0">
          {/* item */}
          <div className="lg:order-none order-1">
            <div className="flex flex-col lg:gap-y-8 mb:gap-y-1.5 justify-between lg:p-[32px] mb:px-3.5 mb:pb-3.5 rounded-xl border">
              <Image width={50} height={50} className="w-[56px] py-[18px] lg:translate-y-0 translate-y-[3px] px-1 h-[80px]" src="/Images/cskh_icon.png" alt='' />
              <div className="flex flex-col gap-y-6">
                <span className="font-medium lg:text-2xl mb:text-lg lg:tracking-[-0.5px]">Hỗ trợ khách hàng</span>
                <p className="text-[#717378] lg:-mt-1.5 -mt-[6.5px] lg:text-[14px] mb:text-[12px]">Whether it is answering any questions you have
                  before making a purchase, helping out with the buying process itself or taking your feedback under
                  consideration, we are proud to provide high quality customer service that makes you – the customer – the
                  most important person in the transaction.</p>
              </div>
            </div>
          </div>
          {/* item */}
          <div className="lg:order-none order-6">
            <div className="flex flex-col lg:gap-y-8 mb:gap-y-[2px] justify-between lg:p-[32px] mb:px-4 mb:pb-3.5 rounded-xl border">
              <Image width={50} height={50} className="w-[56px] py-4 px-1 lg:translatet-y-0 translate-y-0.5 h-[80px]" src="/Images/cskh_icon_4.png" alt='' />
              <div className="flex flex-col gap-y-6">
                <span className="font-medium lg:text-[24px] lg:tracking-[-0.5px] mb:text-lg mt-1">Chất lượng tốt nhất</span>
                <p className="text-[#717378] lg:-mt-1 -mt-1.5 lg:text-[14px] mb:text-[12px]">All of our cannabis products are tested to ensure
                  that they are the highest quality possible. We work with expert suppliers and are always revising what
                  makes a quality cannabis product to ensure that we have only the best available.
                </p>
              </div>
            </div>
          </div>
          {/* item */}
          <div className="lg:order-none order-3">
            <div className="flex flex-col lg:gap-y-8 mb:gap-y-[2.5px] justify-between lg:pt-[32px] lg:px-[32px] lg:pb-[95px] mb:px-4 mb:pb-3.5 rounded-xl border">
              <Image width={50} height={50} className="w-[56px] py-4 lg:translate-x-0 translate-x-[-2px] px-1 h-[80px]" src="/Images/cskh_icon_3.png" alt='' />
              <div className="flex flex-col gap-y-6">
                <span className="font-medium lg:text-[24px] lg:tracking-[-0.5px] mb:text-lg  mt-1">Bảo hiểm giao hàng</span>
                <p className="text-[#717378] lg:-mt-1 -mt-[6.7px] lg:text-[14px] mb:text-[12px]">If your mail order marijuana becomes lost, stolen,
                  or damaged during transit, we will send you a replacement completely free of charge. Free Canada Post
                  Xpress shipping on all orders over $120</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default About_Us