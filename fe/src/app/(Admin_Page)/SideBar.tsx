'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBarDashboard = () => {
    const usePathName = usePathname();
    const arr = [
        {
            name: 'Trang chủ',
            pathName: '/admin/dashboard',
        },
        {
            name: 'Sản phẩm',
            pathName: '/admin/list_products',
        },
        {
            name: 'Khách hàng',
            pathName: '/admin/customers',
        },
        {
            name: 'Đặt hàng',
            pathName: '/admin/orders'
        },
        {
            name: 'Settings',
            pathName: '/admin/settings'
        }
    ]

    return (
        <div className="*:relative flex flex-col text-white gap-y-4 *:after:h-full *:rounded *:after:top-0 *:after:left-0 *:after:absolute *:after:bg-black *:duration-300 *:after:duration-300">
            {
                arr?.map((item) => {
                    return (
                        <Link key={item.pathName} href={item.pathName} className={`${usePathName === item.pathName ? 'group after:w-2 px-4 py-2 bg-gray-900' : 'hover:after:w-2 px-4 py-2 hover:bg-gray-900'}`}>
                            {item.name}
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default SideBarDashboard