'use client';

import Image from 'next/image';
import Nav from './Nav';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

const Header = () => {
    const toggleFixedHeader = useRef<HTMLHeadElement>(null);
    const toggleForm = useRef<HTMLFormElement>(null);

    useEffect(() => {
        (typeof window !== 'undefined') && (
            (window.addEventListener('scroll', () => {
            if(toggleFixedHeader.current && toggleForm.current) {
                (window.scrollY > 100) ? 
                (toggleFixedHeader.current.classList.add('-translate-y-9') , toggleForm.current.classList.add('scale-0')):  
                (toggleFixedHeader.current.classList.remove('-translate-y-9'), toggleForm.current.classList.remove('scale-0'));
                }
            }))
        )
    }, [])


    return (
        <header ref={toggleFixedHeader} className="w-full bg-none z-[2] duration-300 fixed top-0">
            {/* top header */}
            <div className="w-full bg-[#05422c] lg:h-[37px] mb:h-[34px] *:text-white flex justify-center items-center *:lg:text-sm *:mb:text-xs gap-x-4">
                <span className="opacity-75 lg:w-auto mb:w-[266px] mb:truncate">LIMITED OFFER: 30% OFF. Use RABBIT30 at
                    Checkout.</span>
                <span>23 : 15 : 00</span>
            </div>
            {/* logo, search and cart */}
            <div className="bg-white w-full z-[2] flex justify-center items-center">
                <div className="container w-[1440px] lg:h-[66px] mb:h-[56px] flex justify-between *:flex *:items-center items-center">
                    {/* icon menu */}
                    <div className="lg:hidden mb:block translate-x-[24px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
                            <line x1={4} x2={20} y1={12} y2={12} />
                            <line x1={4} x2={20} y1={6} y2={6} />
                            <line x1={4} x2={20} y1={18} y2={18} />
                        </svg>
                    </div>
                    <Image width={167} height={70} className="lg:translate-x-[64px] mb:translate-x-[-12.5px] lg:w-[147px] lg:h-[60px] mb:w-[89px] mb:h-[38px]" src={'/Images/logo.png'} alt='' />
                    {/* menu */}
                    <div className="z-[2] absolute mx-auto w-full mb:hidden lg:block">
                        <div className="w-full flex justify-center items-center *:flex *:justify-center">
                            <Nav />
                        </div>
                    </div>
                    <div className="lg:gap-x-6 mb:gap-x-4 lg:-translate-x-[60px] mb:-translate-x-[22px]">
                        <button className="h-[24px]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 w-[24px]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 
                                1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            <span className="absolute bg-red-500 top-2 rounded-[50%] w-[16px] h-[16px] text-xs text-white">1</span>
                        </button>
                        |
                        <Link href={'/login'} className="text-sm hover:text-[#17af26] cursor-pointer duration-300 whitespace-nowrap">Đăng nhập</Link>
                    </div>
                </div>
            </div>
            {/* form search */}
                <form ref={toggleForm} className={`relative w-[298px] *:h-[36px] gap-x-2 shadow-2xl mt-2 z-[-1] duration-300 mx-auto`}>
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