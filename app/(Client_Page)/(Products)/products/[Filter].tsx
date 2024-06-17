'use client';

import React from 'react'

const Filter_Products = () => {
    return (
    <div>
        <div className="hidden lg:block w-full h-auto">
            {/* categories */}
            <div className="border-b">
                <ul className="space-y-1">
                    <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden hidden lg:block" open>
                            <summary className="flex cursor-pointer items-center justify-between rounded-lg py-2 text-gray-900 hover:bg-gray-100">
                                <strong className="mb:text-sm lg:text-base font-medium">Bộ lọc sản phẩm</strong>
                                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </summary>
                            <ul className="space-y-1 py-4">
                                <li className="py-2">
                                    <label htmlFor="Option1" className="w-full flex lg:justify-between items-center cursor-pointer items-start gap-4">
                                        <div className="flex items-center *:lg:text-sm *:mb:text-xs">

                                            <input type="radio" className="w-[25px] h-[25px] rounded border-gray-300" id="Option1" checked />
                                            <strong className=" font-medium text-gray-900 mx-3"> Tất cả </strong>
                                        </div>
                                        <span>(10)</span>
                                    </label>
                                </li>
                                <li className="py-2">
                                    <label htmlFor="Option2" className="w-full flex lg:justify-between items-center cursor-pointer items-start gap-4">
                                        <div className="flex items-center *:lg:text-sm *:mb:text-xs">

                                            <input type="radio" className="w-[25px] h-[25px] rounded border-gray-300" id="Option2" />
                                            <strong className=" font-medium text-gray-900 mx-3"> Tất cả </strong>
                                        </div>
                                        <span>(10)</span>
                                    </label>
                                </li>
                                <li className="py-2">
                                    <label htmlFor="Option3" className="w-full flex lg:justify-between items-center cursor-pointer items-start gap-4">
                                        <div className="flex items-center *:lg:text-sm *:mb:text-xs">

                                            <input type="radio" className="w-[25px] h-[25px] rounded border-gray-300" id="Option3" />
                                            <strong className=" font-medium text-gray-900 mx-3"> Tất cả </strong>
                                        </div>
                                        <span>(10)</span>
                                    </label>
                                </li>
                                <li className="py-2">
                                    <label htmlFor="Option4" className="w-full flex lg:justify-between items-center cursor-pointer items-start gap-4">
                                        <div className="flex items-center *:lg:text-sm *:mb:text-xs">

                                            <input type="radio" className="w-[25px] h-[25px] rounded border-gray-300" id="Option4" />
                                            <strong className=" font-medium text-gray-900 mx-3"> Tất cả </strong>
                                        </div>
                                        <span>(10)</span>
                                    </label>
                                </li>
                                <li className="py-2">
                                    <label htmlFor="Option5" className="w-full flex lg:justify-between items-center cursor-pointer items-start gap-4">
                                        <div className="flex items-center *:lg:text-sm *:mb:text-xs">

                                            <input type="radio" className="w-[25px] h-[25px] rounded border-gray-300" id="Option5" />
                                            <strong className=" font-medium text-gray-900 mx-3"> Tất cả </strong>
                                        </div>
                                        <span>(10)</span>
                                    </label>
                                </li>

                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
            {/* filter price */}
            <div className="border-b py-2">
                <ul className="space-y-1">
                    <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden hidden lg:block" open>
                            <summary className="flex cursor-pointer items-center justify-between rounded-lg py-2 hover:bg-gray-100 hover:text-gray-700">
                            <strong className="mb:text-sm lg:text-base font-medium">Giá</strong>
                                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </summary>
                            <div className="flex flex-col gap-y-4 py-4">
                                <span>Price : 0$ - 10000$</span>
                                <input type="range" />
                                <button className='px-4 border-black py-2 border hover:bg-[#17ac43] rounded duration-300 hover:border-[#17ac43] hover:text-white'>Áp dụng</button>

                            </div>
                        </details>
                    </li>
                </ul>
            </div>
        </div >

        {/* mobile */}
        <div className="lg:hidden w-full h-auto">
            {/* categories */}
            <div className="border-b">
                <ul className="space-y-1">
                    <li>
                        {/* mobile  */}
                            <ul className="space-y-1 py-4">
                                <li className="py-2">
                                    <label htmlFor="Option1" className="w-full *:lg:text-sm *:mb:text-xs flex lg:justify-between items-center cursor-pointer items-start gap-4">
                                        <div className="flex items-center">

                                            <input type="radio" className="w-[25px] h-[25px] rounded border-gray-300" id="Option1" checked />
                                            <strong className=" font-medium text-gray-900 mx-3"> Tất cả </strong>
                                        </div>
                                        <span>(10)</span>
                                    </label>
                                </li>
                                <li className="py-2">
                                    <label htmlFor="Option2" className="w-full *:lg:text-sm *:mb:text-xs flex lg:justify-between items-center cursor-pointer items-start gap-4">
                                        <div className="flex items-center">

                                            <input type="radio" className="w-[25px] h-[25px] rounded border-gray-300" id="Option2" />
                                            <strong className=" font-medium text-gray-900 mx-3"> Tất cả </strong>
                                        </div>
                                        <span>(10)</span>
                                    </label>
                                </li>
                                <li className="py-2">
                                    <label htmlFor="Option3" className="w-full *:lg:text-sm *:mb:text-xs flex lg:justify-between items-center cursor-pointer items-start gap-4">
                                        <div className="flex items-center">

                                            <input type="radio" className="w-[25px] h-[25px] rounded border-gray-300" id="Option3" />
                                            <strong className=" font-medium text-gray-900 mx-3"> Tất cả </strong>
                                        </div>
                                        <span>(10)</span>
                                    </label>
                                </li>
                                <li className="py-2">
                                    <label htmlFor="Option4" className="w-full *:lg:text-sm *:mb:text-xs flex lg:justify-between items-center cursor-pointer items-start gap-4">
                                        <div className="flex items-center">

                                            <input type="radio" className="w-[25px] h-[25px] rounded border-gray-300" id="Option4" />
                                            <strong className=" font-medium text-gray-900 mx-3"> Tất cả </strong>
                                        </div>
                                        <span>(10)</span>
                                    </label>
                                </li>
                                <li className="py-2">
                                    <label htmlFor="Option5" className="w-full *:lg:text-sm *:mb:text-xs flex lg:justify-between items-center cursor-pointer items-start gap-4">
                                        <div className="flex items-center">

                                            <input type="radio" className="w-[25px] h-[25px] rounded border-gray-300" id="Option5" />
                                            <strong className=" font-medium text-gray-900 mx-3"> Tất cả </strong>
                                        </div>
                                        <span>(10)</span>
                                    </label>
                                </li>
                            </ul>
                    </li>
                </ul>
            </div>
            {/* filter price */}
            <div className="border-b py-2">
                <ul className="space-y-1">
                    <li>
                        {/* mobile  */}
                        <details className="group [&_summary::-webkit-details-marker]:hidden" open>
                            <summary className="flex cursor-pointer items-center justify-between rounded-lg py-2 hover:bg-gray-100 hover:text-gray-700">
                            <strong className=" font-medium text-gray-900 mx-3"> Giá </strong>
                                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </summary>
                            <form className="flex flex-col gap-y-4 py-4 text-xs">
                                <span>Price : 0$ - 10000$</span>
                                <input className='h-0.5' type="range" />
                                <button className='px-4 py-2 border hover:bg-[#17ac43] rounded duration-300 hover:text-white'>Áp dụng</button>
                            </form>
                        </details>
                    </li>
                </ul>
            </div>
        </div >
        </div>
    )
}

export default Filter_Products