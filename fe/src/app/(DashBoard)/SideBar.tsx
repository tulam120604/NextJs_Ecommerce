'use client';

import { ChevronDown, Contact, House, List, Package, Settings, Shapes, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCheck_user, useToken } from "../_lib/Custome_Hooks/User";
import { service_check_token } from "./adminstrations/_Auth_Wrap/Page";
import Loading_Dots from "../_Components/Loadings/Loading_Dots";

const SideBarDashboard = () => {
    const token = useToken();
    const user = useCheck_user();
    const { data, isLoading } = service_check_token(user?.check_email?._id, token?.accessToken);
    if (isLoading) {
        <Loading_Dots />
    }

    const usePathName = usePathname();
    let arr = [
        {
            icon: <House strokeWidth={1.8} className="h-5" />,
            name: 'Bảng điều khiển',
            pathName: '/adminstrations/dashboard/overview',
        },
        {
            icon: <Package strokeWidth={1.8} className="h-5" />,
            name: 'Sản phẩm',
            pathName: '/adminstrations/products',
            child_uri: [
                {
                    name: 'Danh sách',
                    path: '/adminstrations/products/list',
                },
                {
                    name: 'Thuộc tính',
                    path: '/adminstrations/products/attributes-catalog',
                },
                {
                    name: 'Thùng rác',
                    path: '/adminstrations/products/recycle',
                },
            ]
        },
        {
            icon: <Contact strokeWidth={1.8} className="h-5" />,
            name: 'Khách hàng',
            pathName: '/adminstrations/customers',
        },
        {
            icon: <ShoppingBag strokeWidth={1.8} className="h-5" />,
            name: 'Đơn hàng',
            pathName: '/adminstrations/orders'
        },
        {
            icon: <Settings strokeWidth={1.8} className="h-5" />,
            name: 'Settings',
            pathName: '/adminstrations/settings'
        }
    ]
    if (data?.data?.role === 'seller') {
        arr = arr.filter((_: any, index: number) => ![2, 5].includes(index))
    }
    return (
        <div className="*:relative flex flex-col text-gray-900 gap-y-4 *:flex *:items-center *:whitespace-nowrap">
            {
                arr?.map((item) => {
                    const isActive = usePathName.startsWith(item?.pathName);
                    return (
                        <details key={item?.pathName} className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary
                                className="flex cursor-pointer *:duration-300 *:flex *:items-center *:gap-x-2 justify-between *:w-full rounded text-gray-500">
                                {
                                    item?.child_uri ?
                                        <div className={`${(isActive) ? 'group lg:px-4 lg:py-2 p-1.5 bg-gray-300 text-gray-900' :
                                            'lg:px-4 lg:py-2 p-1.5 hover:bg-gray-300 hover:text-gray-900'}`}>
                                            <section className="flex items-center gap-x-2">
                                                {item?.icon}
                                                <span className="hidden lg:block text-sm">{item?.name}</span>
                                            </section>
                                            <ChevronDown className="group-open:-rotate-180 duration-200" />
                                        </div> :
                                        <Link href={item?.pathName} className={`${(isActive) ? 'group lg:px-4 lg:py-2 p-1.5 bg-gray-300 text-gray-900' :
                                            'lg:px-4 lg:py-2 p-1.5 hover:bg-gray-300 hover:text-gray-900'}`}>
                                            {item?.icon}
                                            <span className="hidden lg:block text-sm">{item?.name}</span>
                                        </Link>
                                }
                            </summary>
                            <ul className="*:duration-300 *:w-full text-gray-500 bg-gray-200
                            flex flex-col gap-y-2 items-end">
                                {
                                    item?.child_uri?.map((uri: any) => {
                                        const isChildActive = usePathName === uri.path;
                                        return (
                                            <Link key={uri?.path} href={uri?.path} className={`${(isChildActive) ? 'group lg:px-10 lg:py-2 p-1.5 text-gray-900' :
                                                'lg:px-10 lg:py-2 p-1.5 hover:text-gray-900'}`}>
                                                <span className="hidden lg:block text-sm">{uri?.name}</span>
                                            </Link>
                                        )

                                    })
                                }
                            </ul>
                        </details>
                    )
                })
            }
        </div>
    )
}

export default SideBarDashboard
