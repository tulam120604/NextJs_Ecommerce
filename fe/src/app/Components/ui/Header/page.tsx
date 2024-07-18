'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Mini_Cart from '@/src/app/(Client_Page)/(Cart)/mini_cart/page';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Get_Items_Cart } from '@/src/app/_lib/Tanstack_Query/Cart/query';
import Bell_icon from '../../Icons/bell';
import Search_icon from '../../Icons/Search';

const Header = () => {
    const routing = useRouter();
    const toggleFixedHeader = useRef<HTMLHeadElement>(null);
    useEffect(() => {
        function handle_scroll_header() {
            (window.addEventListener('scroll', () => {
                if (toggleFixedHeader.current) {
                    (window.scrollY > 100) ?
                        (toggleFixedHeader.current.classList.add('animate-[animationScrollYHeader_1s]', '-translate-y-9')) :
                        (toggleFixedHeader.current.classList.remove('animate-[animationScrollYHeader_1s]', '-translate-y-9'));
                }
            }))
        }
        window.addEventListener('scroll', handle_scroll_header);
        return () => window.addEventListener('scroll', handle_scroll_header);
    }, []);
    // useEffect (() => {
    //    console.log(window.location.pathname)
    // }, [])

    // login
    const ref_User = useRef<HTMLAnchorElement>(null);
    const ref_Logo_User = useRef<HTMLAnchorElement>(null);
    const ref_Login = useRef<HTMLDivElement>(null);
    function handle_Login() {
        if (ref_Login.current) {
            ref_Login.current.classList.add('translate-y-0', 'opacity-100');
        }
    }

    useEffect(() => {
        const changeLogin = () => {
            if (localStorage.getItem('account')) {
                ref_User.current?.classList.add('hidden');
                ref_User.current?.classList.remove('block');
                ref_Logo_User.current?.classList.remove('hidden');
                ref_Logo_User.current?.classList.add('block');
            } else {
                ref_User.current?.classList.remove('hidden');
                ref_User.current?.classList.add('block');
                ref_Logo_User.current?.classList.add('hidden');
                ref_Logo_User.current?.classList.remove('block');
            }
        };
        changeLogin();
        const status_Storage = () => {
            changeLogin();
            if (!localStorage.getItem('account')) {
                routing.push('/')
            }
        }
        window.addEventListener('storage', status_Storage);
        return () => window.removeEventListener('storage', status_Storage);
    }, [])

    // cart :
    function handleCart() {
        if (!localStorage.getItem('account')) {
            handle_Login();
        }
        else {
            routing.push('/cart');
        }
    };
    console.count('re-rended :');

    function Count_Cart() {
        const [data_storage, set_data_storage] = useState();
        useEffect(() => {
            if (localStorage.getItem('account')) {
                const storage_acc = JSON.parse(localStorage.getItem('account') || '{}');
                set_data_storage(storage_acc?.check_email?._id);
            }
        }, [data_storage])
        const { data } = Get_Items_Cart(data_storage);
        return (<>
            {data ? (<span className="z-[1] absolute bg-red-500 top-0 -right-1/4 grid place-items-center rounded-[50%] w-[16px] h-[16px] text-xs text-white">{data?.items.length}</span>) : ''}
        </>
        )
    }

    return (<>
        <header ref={toggleFixedHeader} className="w-full bg-none z-[4] duration-300 fixed top-0 lg:h-[103px] bg-gray-800 text-white">
            {/* top header */}
            <div className="w-full lg:h-[37px] mb:h-[34px] *:text-white flex justify-center items-center *:lg:text-sm *:mb:text-xs gap-x-4">
                <span className="opacity-75 lg:w-auto mb:w-[266px] mb:truncate">Xin chào đại vương, chúc đại vương có một trải nghiệm thoải mái.</span>
            </div>
            {/* logo, search and cart */}
            <div className="container lg:w-[1440px] lg:h-[66px] mb:h-[56px] flex justify-between *:flex *:items-center gap-x-20 items-center">
                <div className=''>
                    <Link className='lg:text-2xl text-lg font-extrabold' href={'/'}>
                        Store88
                    </Link>
                </div>
                {/* form search */}
                <div className='md:!block !hidden absolute md:w-[50%] w-[30%] left-1/2 -translate-x-1/2'>
                    <form className={`relative w-full *:h-[36px] gap-x-2 shadow-2xl duration-300`}>
                        <input type="text" className="border rounded-lg w-full pl-5 pr-14 text-sm outline-none font-normal text-gray-700" placeholder="Đại vương muốn mua gì nào?" />
                        <button type='submit' className="absolute top-0 right-[2%] rounded-[50%] w-[36px] duration-300 cursor-pointer">
                            <Search_icon />
                        </button>
                    </form>
                </div>

                <div className="lg:gap-x-6 mb:gap-x-4 flex items-center">
                    <div className='md:hidden block'>
                        <div className='group *:text-white relative'>
                            <Search_icon />
                            <form className={`group-hover:block hidden absolute w-[200px] top-10 *:h-[36px] gap-x-2 shadow-2xl duration-300`}>
                                <input type="text" className="border rounded-lg w-full pl-5 pr-14 text-xs outline-none font-normal text-gray-700" placeholder="Đại vương muốn mua gì nào?" />
                            </form>
                        </div>
                    </div>
                    {/* bell */}
                    <div className='relative cursor-pointer'>
                        <Bell_icon />
                        <span className="z-[1] absolute bg-red-500 top-0 -right-1/4 grid place-items-center rounded-[50%] w-[16px] h-[16px] text-xs text-white">0</span>
                    </div>
                    {/* cart */}
                    <div className="h-[24px] relative group cursor-pointer">
                        <button onClick={handleCart} className='z-[1] relative' >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 w-[24px]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 
                                1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            <Count_Cart />
                        </button>

                        {/* show mini cart */}
                        {/* <div className='absolute scale-0 group-hover:scale-100 duration-300 top-[100%] right-0 w-[30vw] lg:block hidden bg-white rounded shadow-xl 
                                border after:w-20 after:h-10 after:absolute after:bg-none after:z-[-1] after:-translate-y-[80%] after:top-0 after:-right-[20px] 
                                -translate-y-[50%] translate-x-1/2 group-hover:translate-x-0 group-hover:translate-y-[10px]'>
                                <Mini_Cart />
                            </div> */}
                    </div>
                    <Link href={'/login'} ref={ref_User} className="block text-xs lg:text-sm hover:text-gray-300 cursor-pointer duration-300 whitespace-nowrap">Đăng nhập</Link>
                    <Link href={'/profile/infor'} ref={ref_Logo_User} className="hidden relative border-none p-0.5 cursor-pointer whitespace-nowrap group">
                        <Image className='hover:scale-[1.2] duration-200 rounded-[50%]' width={30} height={30} src={'/Images/avatar.jpg'} alt=''></Image>
                        <span className='hidden group-hover:block duration-200 text-xs absolute right-0 translate-x-0 top-full'>Hồ sơ của bạn</span>
                    </Link>
                </div>
            </div>
        </header>
    </>)
};

export default Header;