'use client';

import Link from 'next/link'

const Banner = () => {
  return (

    <div className="w-full border flex justify-center bg-gradient-to-r from-[#386957] to-[#134d38]">
      <div className="lg:w-[1440px] lg:pt-0 pt-10 mb:w-[342px] md:w-[95vw] md:h-[620px] mb:h-[494px] justify-between">
        {/* about */}
        <div className="flex flex-col *:flex *:flex-col md:py-[80px] mb:py-[57px]">
          <div>
            <span className="text-[#F2BC1B] mb:text-sm md:text-base tracking-[4px] mb:-translate-y-0.5 lg:translate-y-0">BEST
              SELLER</span>
            <strong className="lg:text-[64px] lg:w-[664px] mb:text-[32px] font-medium lg:leading-[70.4px] mb:leading-[38px] lg:tracking-[-3.4px] mb:tracking-[-1.2px] lg:my-4 mb:my-[10.5px] text-white">BEST
              DISPENSARY TO BUY WEED ONLINE</strong>
            <span className="text-white lg:text-[22px] lg:mt-2 mb:mt-1.5 lg:tracking-[0.5px]">Vitamins &amp; Supplements</span>
          </div>
          <div className="flex flex-col *:text-white">
            <Link className="bg-[#17AF26] lg:mt-11 mb:mt-6 lg:text-lg lg:w-[185px] mb:w-[145px] grid place-items-center lg:h-[64px] mb:h-[56px] rounded border-none hover:scale-110 duration-300" href="">Xem chi tiết</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner