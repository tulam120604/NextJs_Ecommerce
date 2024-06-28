'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
const Nav = () => {
    const pathName = usePathname();
    const arr = [
        {
            name: 'Trang chủ',
            path: '/'
        },
        {
            name: 'Sản phẩm',
            path: '/products'
        },
        {
            name: 'Khuyến mãi',
            path: '/products2'
        },
        {
            name: 'Dịch vụ',
            path: '/products3'
        },
        {
            name: 'Về chúng tôi',
            path: '/product4s'
        },
    ];


    return (
        <nav className="gap-x-8 items-center *:duration-300 *:relative *:after:absolute
            *:after:h-0.5 *:after:bg-[#17af26] *:after:bottom-[-8px] *:after:rounded-3xl *:after:duration-300">
            {
                arr?.map((item) => {
                    return (
                        <Link key={item.name}
                            className={`${pathName === item.path ? 'hover:text-[#17af26] text-[#17af26] hover:after:left-0 after:w-full after:left-0' : 'hover:text-[#17af26] hover:after:left-0 after:w-0 after:left-1/2 hover:after:w-full'} `}
                            href={item.path}>{item.name}</Link>
                    )
                })
            }
        </nav>
    )
};

export default Nav;