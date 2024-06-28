'use client';

import Nav from './Nav';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import Mini_Cart from '@/app/(Client_Page)/(Cart)/mini_cart/page';

const Header = () => {
    const toggleFixedHeader = useRef<HTMLHeadElement>(null);
    const toggleForm = useRef<HTMLFormElement>(null);

    useEffect(() => {
        (typeof window !== 'undefined') && (
            (window.addEventListener('scroll', () => {
                if (toggleFixedHeader.current && toggleForm.current) {
                    (window.scrollY > 100) ?
                        (toggleFixedHeader.current.classList.add('animate-[animationScrollYHeader_1s]', '-translate-y-9'), toggleForm.current.classList.add('scale-0')) :
                        (toggleFixedHeader.current.classList.remove('animate-[animationScrollYHeader_1s]', '-translate-y-9'), toggleForm.current.classList.remove('scale-0'));
                }
            }))
        )
    }, [])


    return (
        <header ref={toggleFixedHeader} className="w-full bg-none z-[4] duration-300 fixed top-0 lg:h-[103px]">
            {/* top header */}
            <div className="w-full bg-[#05422c] lg:h-[37px] mb:h-[34px] *:text-white flex justify-center items-center *:lg:text-sm *:mb:text-xs gap-x-4">
                <span className="opacity-75 lg:w-auto mb:w-[266px] mb:truncate">LIMITED OFFER: 30% OFF. Use RABBIT30 at
                    Checkout.</span>
                <span>23 : 15 : 00</span>
            </div>
            {/* logo, search and cart */}
            <div className="bg-white w-full flex justify-center items-center shadow-2xl">
                <div className="container lg:w-[1440px] lg:h-[66px] mb:h-[56px] flex justify-between *:flex *:items-center items-center">
                    {/* icon menu */}
                    <div className="group lg:hidden mb:block translate-x-[24px] cursor-pointer relative">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide z-[1] lucide-menu group-hover:scale-110 duration-300">
                            <line x1={4} x2={20} y1={12} y2={12} />
                            <line x1={4} x2={20} y1={6} y2={6} />
                            <line x1={4} x2={20} y1={18} y2={18} />
                        </svg>
                        {/* menu mobile */}
                        <div className='absolute bg-white scale-0 group-hover:scale-100 duration-300 top-full left-0 md:w-[60vw] mb:w-[342px] pb-4 *:flex *:flex-col *:gap-y-4 *:items-start rounded *:px-4'>
                            <Nav />
                        </div>
                        {/* lớp phủ */}
                        <div className='fixed z-[-1] top-0 hidden group-hover:block left-0 w-[0.1px] h-[0.1px] bg-[#33333350] shadow-[0_0_0_100vw_rgba(0,0,0,0.3)]'></div>
                    </div>
                    <div className='flex items-center gap-x-20'>
                        <Link className='text-4xl font-extrabold font-sans text-[#05422c]' href={'/'}>
                            Fruits
                        </Link>
                        {/* menu dekstop*/}
                        <div className="z-[2] mb:hidden lg:block">
                            <div className="w-full flex justify-center items-center *:flex *:justify-center">
                                <Nav />
                            </div>
                        </div>
                    </div>


                    <div className="lg:gap-x-6 mb:gap-x-4 flex items-center">
                        {/* form search desktop */}
                        <form className={`relative w-[298px] *:h-[36px] hidden lg:block gap-x-2 shadow-2xl duration-300`}>
                            <input type="text" className="border rounded-full w-full pl-5 pr-14 text-sm outline-none font-normal text-gray-700" placeholder="Search" />
                            <button className="absolute top-0 right-[2%] rounded-[50%] w-[36px] duration-300 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mx-auto">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </button>
                        </form>
                        <div className="h-[24px] relative group cursor-pointer">
                            <Link className='z-[1] relative' href={'/cart'}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 w-[24px]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 
                                1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                            </Link>
                            <span className="z-[1] absolute bg-red-500 top-0 -right-1/4 grid place-items-center rounded-[50%] w-[16px] h-[16px] text-xs text-white">1</span>

                            {/* show mini cart */}
                            <div className='absolute scale-0 group-hover:scale-100 duration-300 top-[100%] right-0 w-[30vw] lg:block hidden bg-white rounded shadow-xl 
                                border after:w-20 after:h-10 after:absolute after:bg-none after:z-[-1] after:-translate-y-[80%] after:top-0 after:-right-[20px] 
                                -translate-y-[50%] translate-x-1/2 group-hover:translate-x-0 group-hover:translate-y-[10px]'>
                                <Mini_Cart />
                            </div>
                        </div>
                        <Link href={'/login'} className="text-sm hover:text-[#17af26] cursor-pointer duration-300 whitespace-nowrap">Đăng nhập</Link>
                    </div>
                </div>
            </div>
            {/* form search mobile */}
            <form ref={toggleForm} className={`relative w-[298px] *:h-[36px] lg:invisible gap-x-2 shadow-2xl mt-6 z-[-1] duration-300 mx-auto`}>
                <input type="text" className="border rounded-full w-full pl-5 pr-14 text-sm outline-none font-normal text-gray-700" placeholder="Search" />
                <button className="absolute top-0 right-[2%] rounded-[50%] w-[36px] duration-300 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mx-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </form>
        </header>
    )
};

export default Header;