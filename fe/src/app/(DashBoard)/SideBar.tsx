'use client';

import { Contact, House, Package, Settings, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBarDashboard = () => {
    const usePathName = usePathname();
    const arr = [
        {
            icon : <House/> ,
            name: 'Bảng điều khiển',
            pathName: '/admin/dashboard',
        },
        {
            icon : <Package/> ,
            name: 'Sản phẩm',
            pathName: '/admin/list_products',
        },
        {
            icon : <Contact/> ,
            name: 'Khách hàng',
            pathName: '/admin/customers',
        },
        {
            icon : <ShoppingBag/> ,
            name: 'Đặt hàng',
            pathName: '/admin/orders'
        },
        {
            icon : <Settings/> ,
            name: 'Settings',
            pathName: '/admin/settings'
        }
    ]

    return (
        <div className="*:relative flex flex-col text-white gap-y-4 *:flex *:items-center *:gap-x-3 *:rounded *:duration-300">
            {
                arr?.map((item) => {
                    return (
                        <Link key={item.pathName} href={item.pathName} className={`${usePathName === item.pathName ? 'group px-4 py-2 bg-[#2563EB]' : 
                        'px-4 py-2 hover:bg-[#2563EB]'}`}>
                            {item?.icon}
                            <span className="hidden lg:block">{item?.name}</span>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default SideBarDashboard