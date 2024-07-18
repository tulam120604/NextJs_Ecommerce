'use client';

import Image from 'next/image'
import Custome_Swiper from '../../Components/Swipper/swiper';

const Service = () => {
    return (
        <div className="lg:w-[1440px] mx-auto mb:w-[342px] md:w-[90vw] py-4">
            <div className='lg:block hidden'>
                <Custome_Swiper spaceBetween={40} count_item={7}>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[200px] h-[200px]"></div>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[200px] h-[200px]"></div>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[200px] h-[200px]"></div>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[200px] h-[200px]"></div>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[200px] h-[200px]"></div>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[200px] h-[200px]"></div>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[200px] h-[200px]"></div>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[200px] h-[200px]"></div>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[200px] h-[200px]"></div>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[200px] h-[200px]"></div>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[200px] h-[200px]"></div>
                </Custome_Swiper>
            </div>
            <div className='lg:hidden md:block hidden'>
                <Custome_Swiper spaceBetween={40} count_item={4}>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[200px] h-[200px]"></div>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[200px] h-[200px]"></div>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[200px] h-[200px]"></div>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[200px] h-[200px]"></div>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[200px] h-[200px]"></div>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[200px] h-[200px]"></div>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[200px] h-[200px]"></div>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[200px] h-[200px]"></div>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[200px] h-[200px]"></div>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[200px] h-[200px]"></div>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[200px] h-[200px]"></div>
                </Custome_Swiper>
            </div>
            <div className='md:hidden block'>
                <Custome_Swiper spaceBetween={20} count_item={2}>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[150px] h-[200px]"></div>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[150px] h-[200px]"></div>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[150px] h-[200px]"></div>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[150px] h-[200px]"></div>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[150px] h-[200px]"></div>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[150px] h-[200px]"></div>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[150px] h-[200px]"></div>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[150px] h-[200px]"></div>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[150px] h-[200px]"></div>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[150px] h-[200px]"></div>
                    <div className="h-32 rounded-lg bg-gray-200 p-4 w-[150px] h-[200px]"></div>
                </Custome_Swiper>
            </div>
        </div>

    )
}

export default Service