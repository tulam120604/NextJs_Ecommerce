'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useToast } from "@/src/app/Components/ui/use-toast";

const Side_bar = () => {
    const { toast } = useToast();
    const pathName = usePathname();
    const routing = useRouter();
    function log_out() {
        Swal.fire({
            title: "Xác nhận đăng xuất?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Xác nhận!",
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                toast({
                    title: "Đã đăng xuất",
                    className: 'w-[200px] bg-gray-100 fixed right-0 bottom-0 text-gray-900 h-10',
                    duration: 800
                })
                localStorage.removeItem('account');
                routing.push('/');
            }
        });

    }

    const arr = [
        {
            path: "/profile/infor",
            name: 'Thông tin tài khoản',
            svg: <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-user"><circle cx={12} cy={12} r={10} /><circle cx={12} cy={10} r={3} /><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" /></svg>
        },
        {
            path: "/profile/notification",
            name: 'Thông báo',
            svg: <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell-ring"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /><path d="M4 2C2.8 3.7 2 5.7 2 8" /><path d="M22 8c0-2.3-.8-4.3-2-6" /></svg>
        },
        {
            path: "/profile/like",
            name: 'Yêu thích',
            svg: <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
        },
        {
            path: "/profile/orders",
            name: 'Đơn hàng',
            svg: <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package"><path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>
        }
    ]

    return (
        <div className="flex h-full flex-col justify-between bg-white">
            <div className="flex flex-col gap-y-2 rounded-b *:border *:border-white *:after:absolute *:after:top-0 *:after:left-0 *:relative *:after:h-full *:after:bg-[#1F2937]">
                {arr?.map((item) => {
                    return (
                        <Link key={item.path}
                            href={item.path}
                            className={`${pathName === item.path ? 'block after:w-2 !border-[#1F2937] px-4 py-2 lg:py-4 text-sm font-medium text-black flex items-center gap-x-4' : 'block duration-200 hover:border-[#1F2937] hover:text-black hover:after:w-2 px-4 py-2 lg:py-4 text-sm font-medium text-gray-700 flex items-center gap-x-4'} `}
                        >
                            {item.svg}
                            <span className="hidden lg:block">{item.name}</span>
                        </Link>
                    )
                })}
                <button onClick={log_out} className="block duration-200 relative after:absolute after:top-0 after:left-0 after:h-full hover:after:w-2 after:bg-[#1F2937] hover:border-[#1F2937] hover:text-black px-4 py-2 lg:py-4 text-sm font-medium text-gray-700 flex items-center gap-x-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-output"><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M4 7V4a2 2 0 0 1 2-2 2 2 0 0 0-2 2" /><path d="M4.063 20.999a2 2 0 0 0 2 1L18 22a2 2 0 0 0 2-2V7l-5-5H6" /><path d="m5 11-3 3" /><path d="m5 17-3-3h10" /></svg>
                    <span className="hidden lg:block">Đăng xuất</span>
                </button>
            </div>
        </div>
    )
}

export default Side_bar