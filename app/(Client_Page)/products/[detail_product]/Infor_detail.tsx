import Image from "next/image"

const Infor_Detail_Product = ({dataProps} : any) => {
  return (
    <div className="h-full w-full *:w-full lg:mt-0 mb:mt-[42px]">
      <div className="flex flex-col lg:gap-y-2">
        {/* row 1 */}
        <div className="lg:pb-5 flex flex-col lg:gap-y-2">
          <span className="text-gray-700 font-bold lg:text-base mb:text-sm tracking-[2px]">San pham demo</span>
          <strong className="lg:text-2xl lg:mt-[1px] mb:mt-3.5 mb:text-xl lg:tracking-[-1.2px] font-medium lg:leading-[38.4px]">Tieu de san pham demo</strong>
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
              <span className="font-medium text-[#EB2606] lg:text-xl lg:tracking-[0.7px] mb:text-base flex items-center lg:gap-x-3 lg:mt-0.5 mb:gap-x-2"><del className="font-light lg:text-sm mb:text-sm text-[#9D9EA2]">200.00 đ</del>120.00 đ</span>
              <p className="text-gray-600 font-medium text-xs">1/kg</p>
            </div>
          </div>
        </div>
        {/* row 2 */}
        <div className="flex flex-col gap-y-2 lg:mt-[2px] mt-[3px] lg:pb-0 mb:pb-[21px]">
          <span className="text-sm tracking-[1px] text-[#717378]">Mô tả ngắn</span>
          <p className="text-[14px] text-[#46494F]">Jungle Diamonds is a slightly indica dominant hybrid strain
            (60% indica/40% sativa) created through
            crossing the infamous Slurricane X Gorilla Glue #4 strains.</p>
        </div>
        {/* row 4 */}
        <div className="py-5 *:w-full rounded-xl lg:-mt-5 -mt-1">
          {/* quantity */}
          <div className="py-5 flex lg:flex-row mb:flex-col lg:gap-y-0 gap-y-[17px] gap-x-8 lg:items-center mb:items-start">
            {/* up , dow quantity */}
            <div className="border lg:py-2.5 lg:pr-6  mb:py-1 mb:pl-2 mb:pr-[18px] *:text-xs flex items-center gap-x-3 rounded-xl">
              <div className="flex items-center *:w-9 *:h-9 gap-x-1 *:grid *:place-items-center">
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus">
                    <path d="M5 12h14" />
                  </svg>
                </button>
                <div className="bg-[#F4F4F4]">2</div>
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus">
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                </button>
              </div>
              <span className="text-[#17AF26] lg:tracking-[0.5px] border-l pl-4 border-black">Còn lại 100 sản phẩm</span>
            </div>
            <span className="font-medium text-[#EB2606] lg:text-xl lg:tracking-[0.7px] mb:text-base flex items-center lg:gap-x-3 lg:mt-0.5 mb:gap-x-2">242.00 đ</span>
          </div>
           <div className="flex items-center gap-x-5 font-medium lg:text-base mb:text-sm *:rounded-xl *:duration-300">
            {/* add cart */}
           <button className="hover:scale-105 flex place-items-center gap-x-4 text-white bg-[#17AF26] lg:px-[30px] mb:px-[22px] lg:h-14 mb:h-12">
              <span>Thêm vào giỏ</span>
            </button>
            {/* add cart */}
           <button className="hover:scale-105 flex place-items-center gap-x-4 text-white bg-[#17AF26] lg:px-[30px] mb:px-[22px] lg:h-14 mb:h-12">
              Thanh toán
            </button>
           </div>
        </div>
        {/* different */}
        <div className="grid lg:grid-cols-[49%_49%] justify-between lg:gap-y-0 mb:gap-y-4 lg:text-sm mb:text-xs *:flex border-t lg:pt-6 lg:mt-0 mb:pt-[18px] mb:mt-5 mb:grid-cols-full">
          <span className="lg:gap-x-[84px] gap-x-[78px] font-light text-[#717378]">Xuất xứ <p className="font-normal text-[#060709]">:&nbsp;&nbsp;&nbsp; Việt Nam</p>
          </span>
          <span className="font-light text-[#717378] lg:gap-x-[50px] mb:gap-x-10">Trọng lượng <p className="text-[#17AF26] font-normal">:&nbsp;&nbsp;&nbsp;&nbsp; 1 kg / 5 quả
          </p></span>
        </div>
      </div>
      {/* description */}
      <div className="flex flex-col border-t lg:py-10 lg:mt-10 mb:py-[34px] mb:mt-8">
        {/* menu description */}
        <ul className="flex items-center gap-x-8 border-b lg:pb-6 mb:pb-5 *:lg:w-[197.33px] *:mb:w-[106px] *:lg:py-2.5 *:mb:py-[7px] *:rounded-[100px] *:border *:place-items-center *:lg:text-base *:mb:text-xs">
          <button className="btn_show_description grid hover:border-[#05422C] border-[#05422C] text-[#05422C] hover:bg-[#F2F6F4] bg-[#F2F6F4]">Mô tả</button>
          <button className="btn_show_review flex items-center justify-center gap-x-1 hover:border-[#05422C] hover:text-[#05422C] hover:bg-[#F2F6F4]">Đánh giá
            <p>(350)</p>
          </button>
        </ul>
        {/* text description */}
        <div className="show_description">
          <section className="flex flex-col text-sm text-[#46494F] leading-[21px] gap-y-4 lg:py-6 mb:pt-[19px]">
            <p>Jungle Diamonds is a slightly indica dominant hybrid strain (60% indica/40% sativa) created through
              crossing the infamous Slurricane X Gorilla Glue #4 strains. Named for its gorgeous appearance and
              breeder,
              Jungle Diamonds is a favorite of indica and hybrid lovers alike thanks to its delicious taste and
              tingly,
              arousing high. Jungle Diamonds buds have sparkling oversized spade-shaped olive green nugs with vivid
              amber hairs and a thick frosty blanket of glittering tiny blue-tinted white crystal trichomes. As you
              pull
              apart each sticky little nugget, aromas of spicy mocha coffee and fruity herbs are released. </p>
            <p>The flavor is of sweet chocolate with hints of fresh ripe berries to it, too. The Jungle Diamonds high
              is
              just as delicious, with happy effects that will boost the spirits and kick negative thoughts and moods
              to
              the curb. You feel a tingly sense in your body from start to finish that serves to remove any aches
              or
              pains while leaving you pretty aroused at times. This is accompanied by a blissfully unfocused heady
              lift
              that leaves your head in the clouds without causing sedation. With these effects and its pretty high
              17-24% THC level, Jungle Diamonds is ideal for experienced patients with chronic pain, cramps or muscle
              spasms and appetite loss or nausea.</p>
          </section>
        </div>
        {/* detail comment */}
        <section className="show_review hidden">
          <div className="flex flex-col text-sm text-[#46494F] leading-[21px] gap-y-4 lg:pt-6 mb:pt-5 mb:pb-0">
            {/* content comment 1 */}
            <div className="border rounded-2xl lg:p-6 mb:p-5">
              {/* user and time comment */}
              <div className="flex items-center *:flex *:items-center gap-x-4 border-b border-[#F4F4F4] pb-4 mb-4">
                <Image width={36} height={36} src="/Images/vikki_user_icon.png" alt='' />
                <strong className="text-base text-[#1A1E26] font-medium gap-x-4">Vikki Starr <span className="text-sm text-[#9D9EA2] font-light">|</span> <span className="text-sm text-[#9D9EA2] font-light">January 15, 2023</span></strong>
              </div>
              {/* text comment */}
              <section className="flex flex-col gap-y-4">
                <nav className="flex items-center gap-x-1">
                  <Image width={100} height={100} src="/Images/star.png" alt='' />
                  <Image width={100} height={100} src="/Images/star.png" alt='' />
                  <Image width={100} height={100} src="/Images/star.png" alt='' />
                  <Image width={100} height={100} src="/Images/star.png" alt='' />
                  <Image width={100} height={100} src="/Images/star.png" alt='' />
                </nav>
                <p className="text-[#1A1E26] text-base">Absolutely love TopShelfBC; affordable on any budget and such fast
                  delivery, straight to my door! I
                  recommend them to all my friends and family for their 420 needs.</p>
              </section>
            </div>
            {/* content comment 2 */}
            <div className="border rounded-2xl lg:p-6 mb:p-5">
              {/* user and time comment */}
              <div className="flex items-center *:flex *:items-center gap-x-4 border-b border-[#F4F4F4] pb-4 mb-4">
                <Image width={36} height={36} src="/Images/vikki_user_icon.png" alt='' />
                <strong className="text-base text-[#1A1E26] font-medium gap-x-4">Terry Baskey <span className="text-sm text-[#9D9EA2] font-light">|</span> <span className="text-sm text-[#9D9EA2] font-light">January 15, 2023</span></strong>
              </div>
              {/* text comment */}
              <section className="flex flex-col gap-y-4">
                <nav className="flex items-center gap-x-1">
                  <Image width={100} height={100} src="/Images/star.png" alt='' />
                  <Image width={100} height={100} src="/Images/star.png" alt='' />
                  <Image width={100} height={100} src="/Images/star.png" alt='' />
                  <Image width={100} height={100} src="/Images/star.png" alt='' />
                  <Image width={100} height={100} src="/Images/star.png" alt='' />
                </nav>
                <p className="text-[#1A1E26] text-base">Best damn place to buy your canabis at great prices.</p>
              </section>
            </div>
            {/*btn show more */}
            <div className="flex justify-center my-1">
              <button className="px-5 py-2 text-[#17AF26] text-sm rounded-[100px] border hover:bg-[#F9F9F9] cursor-pointer duration-300">Show
                More</button>
            </div>
            {/* add comment */}
            <div className="flex flex-col gap-y-6 border-t lg:pt-7 lg:pb-[22px]">
              <strong className="lg:text-lg">Add A Review</strong>
              <section className="flex item-center gap-x-4">
                <span className="mt-0.5">Your rating</span>
                <span>:</span>
                <div className="flex item-center *:w-5 *:h-5 gap-x-1 *:cursor-pointer">
                  <Image width={100} height={100} src="/Images/star_no_color.png" alt='' />
                  <Image width={100} height={100} src="/Images/star_no_color.png" alt='' />
                  <Image width={100} height={100} src="/Images/star_no_color.png" alt='' />
                  <Image width={100} height={100} src="/Images/star_no_color.png" alt='' />
                  <Image width={100} height={100} src="/Images/star_no_color.png" alt='' />
                </div>
              </section>
              <form className="-mt-1.5">
                <span>Your Review</span>
                <div className="overflow-hidden lg:p-4 rounded-lg border border-gray-200 shadow-sm focus-within:border-none focus-within:ring-1 focus-within:none mt-2">
                  <textarea id="OrderNotes" className="w-full resize-none outline-none border-none align-top focus:ring-0 sm:text-sm" rows={3} placeholder="Enter your review" defaultValue={""} />
                </div>
                <button className="px-10 py-4 bg-[#17AF26] rounded-[100px] text-base text-white mt-4">Submit</button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Infor_Detail_Product