'use client';

import React, { useState } from 'react'

const Paginate_item = () => {
    const [page, setPage] = useState(1);
    return (
        <div className="md:w-auto mb:w-[342px] flex items-center justify-left *:w-9 *:h-9 *:rounded-[50%] *:grid *:place-items-center md:gap-x-3 gap-x-1 text-xs lg:text-sm">
            <button className={` border ${page < 2 ? 'cursor-not-allowed opacity-75' :  'hover:bg-black hover:text-white duration-200 '}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
                    <path d="m15 18-6-6 6-6" />
                </svg>
            </button>
            {/* **** */}
            {/* <button onClick={() => setPage(1)} className="bg-[#F2F6F4]">1</button>
    <button onClick={() => setPage(2)} className="hover:bg-[#f2f6f4]">2</button>
    <button onClick={() => setPage(3)} className="hover:bg-[#f2f6f4]">3</button>
    <button onClick={() => setPage(4)} className="hover:bg-[#f2f6f4]">4</button>
    <span className="hover:bg-[#f2f6f4]">...</span> */}
            {/* **** */}
            <span>{page}</span>
            <button className="border hover:bg-black hover:text-white duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                    <path d="m9 18 6-6-6-6" />
                </svg>
            </button>
        </div>
    )
}

export default Paginate_item