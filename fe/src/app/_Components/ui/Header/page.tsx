'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Get_Items_Cart } from '@/src/app/_lib/Query_APIs/Cart/query';
import { Search_Component_Client } from '../../Forms/search';
import { BadgeCheck, BadgeDollarSign, CircleUser, RefreshCcwDot, Search, ShoppingBag, Tag, Truck } from 'lucide-react';
import { eventEmit } from './Event_emit';
import { useStoreZustand } from '@/src/app/Zustand/Store';
import { useCheck_user } from '@/src/app/_lib/Custome_Hooks/User';

const Header = () => {
    const { isVisible } = useStoreZustand();
    const routing = useRouter();
    const [check_local_user, setCheckLocal_user] = useState<boolean>(false);
    const pathName = usePathname();
    const user = useCheck_user();
    const [account, setAccount] = useState<string | undefined>(undefined)
    const isActivePathUser = pathName?.startsWith('/thong-tin-tai-khoan');
    const isActivePathCart = pathName?.startsWith('/gio-hang');
    useEffect(() => {
        if (window.localStorage) {
            setAccount(user?.check_email?.user_name);
        }
    }, [user]);
    // catch event f5 or reload page
    if (window.onload) {
        setAccount(' ')
    }
    useEffect(() => {
        const status_Storage = () => {
            if (!localStorage.getItem('account')) {
                setCheckLocal_user(false)
                routing.push('/');
            }
            else {
                setCheckLocal_user(true)
            }
        }
        eventEmit.on('logout', () => { setCheckLocal_user(false) })
        status_Storage();
        window.addEventListener('storage', status_Storage);
        return () => window.removeEventListener('storage', status_Storage);
    }, [check_local_user, routing]);

    // cart :
    function handleCart() {
        if (!localStorage.getItem('account')) {
            routing.push('/dang-nhap')
        }
        else {
            routing.push('/gio-hang');
        }
    };
    console.count('re-render:');

    function Count_Cart() {
        const [data_storage, set_data_storage] = useState();
        useEffect(() => {
            if (localStorage.getItem('account')) {
                const storage_acc = JSON.parse(localStorage.getItem('account') || '{}');
                set_data_storage(storage_acc?.check_email?._id);
            }
        }, [data_storage])
        const { data, isLoading } = Get_Items_Cart(data_storage);
        let new_arr;
        if (data?.items) {
            new_arr = data?.items.filter((item: any) => (item?.product_id !== null) && item);
        }
        return (<>
            {isLoading && data?.items && (<span className="z-[1] absolute bg-red-500 -top-[40%] -right-1/2 grid place-items-center rounded-[50%] lg:w-5 lg:h-5 w-4 h-4 text-xs text-white">
                {new_arr?.length < 99 ? new_arr?.length : '99+'}</span>)}
        </>)
    }

    return (<>
        <header className="w-full z-[20] duration-300 py-5 bg-white">
            {/* logo, search and cart */}
            <div className="relative mx-auto max-w-[1440px] w-[95vw] flex justify-between *:flex *:items-center gap-x-20 items-center">
                <Link href={'/'}>
                    <Image width={200} height={100} className='w-[150px] max-h-10'
                        src={'https://res.cloudinary.com/tulam120604/image/upload/v1736088077/k3jhx9ywkmepcp9tz1b1.png'} alt='Store88' />
                </Link>
                {/* search form */}
                <div className='md:!block !hidden absolute md:w-[60%] w-[30%] left-1/2 -translate-x-1/2 z-[7]'>
                    <Search_Component_Client />
                </div>

                <div className="gap-x-2 flex items-center *:h-full">
                    <div className='md:hidden block'>
                        <div className='group relative'>
                            <Search className='w-4 h-5' color='#0A68FF' />
                            <form className={`group-hover:block hidden absolute w-[250px] top-10 right-1/2 translate-x-1/4 *:h-[36px] gap-x-2 shadow-[0_35px_60px_100vh_rgba(0,0,0,0.3)] rounded-lg duration-300`}>
                                <input type="text" className="border rounded w-full pl-5 pr-14 text-xs outline-none font-normal text-gray-700" placeholder="Tìm kiếm sản phẩm" />
                            </form>
                        </div>
                    </div>
                    <Link href={check_local_user ? '/thong-tin-tai-khoan/thong-tin' : '/dang-nhap'} className={`${isActivePathUser && 'bg-[#E2EDFF]'} ' 
                    flex items-center gap-x-2 hover:bg-[#E2EDFF] rounded duration-200 py-2 px-3 cursor-pointer whitespace-nowrap'`}>
                        <CircleUser color='#0A68FF' />
                        <span className='text-[#0A68FF] text-sm mt-0.5'>{account ? account : 'Tài khoản'}</span>
                    </Link>
                    {/* cart */}
                    <div className={`${isActivePathCart && 'bg-[#E2EDFF]'} relative group cursor-pointer`}>
                        <button onClick={handleCart} className='z-[1] relative hover:bg-[#E2EDFF] rounded duration-200 py-2 px-2.5' >
                            <ShoppingBag className='w-5 h-5 ' color='#0A68FF' />
                            <Count_Cart />
                            {/* animation add to cart */}
                            {
                                isVisible &&
                                <div className='animation_add_cart absolute w-4 h-4 lg:w-8 lg:h-8 rounded-full'>
                                    <Image width={40} height={40} className='rounded-full' src={isVisible} alt='.' />
                                </div>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </header>

        {/* about us */}
        <div className='border-y w-full'>
            <section className='mx-auto max-w-[1440px] w-[95vw] overflow-x-auto *:whitespace-nowrap bg-white flex *:flex items-center *:items-center *:gap-x-1 *:text-xs py-3 *:cursor-default'>
                {/* 1 */}
                <div className='border-r-2 pr-5'>
                    <BadgeCheck className='w-5 h-5' fill='#0A68FF' color='#fff' />
                    <span>100% chất lượng</span>
                </div>

                {/* 2 */}
                <div className='border-r-2 px-5'>
                    <BadgeDollarSign className='w-5 h-5' fill='#0A68FF' color='#fff' />
                    <span>Hoàn tiền 100%</span>
                </div>

                {/* 3 */}
                <div className='border-r-2 px-5'>
                    <RefreshCcwDot className='w-5 h-5' color='#0A68FF' />
                    <span>30 ngày đổi trả</span>
                </div>

                {/* 4 */}
                <div className='border-r-2 px-5'>
                    <Tag className='w-5 h-5' fill='#0A68FF' color='#fff' />
                    <span>Giá siêu rẻ</span>
                </div>
                {/* 5 */}
                <div className='px-5'>
                    <Truck className='w-5 h-5' color='#0A68FF' />
                    <span>Giao hàng nhanh chóng</span>
                </div>
            </section>
        </div>
    </>
    )
};

export default Header;