'use client';

import Link from "next/link";
import Image from "next/image";
import SideBarDashboard from "./SideBar";
import { Search_Component_Dashboard } from "../Components/Forms/search";
import { BellRing } from "lucide-react";
import { Query_Notification } from "../_lib/Tanstack_Query/Notification/Query_Notification";
import { useEffect, useState } from "react";
import { useToast } from "../Components/ui/use-toast";

const Layout_Admin = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { toast } = useToast();
  const [count_bell, setCount_bell] = useState(0)
  let user: any;
  if (typeof window !== 'undefined') {
    user = JSON.parse(localStorage.getItem('account') || '{}') ?? ''
  }
  const data = Query_Notification(user?.check_email?._id);
  useEffect(() => {
    if (!data?.isLoading && !data?.isError) {
      let data_old = data?.data?.data_notification?.length ?? 0;
      if (count_bell < data_old) {
        toast({
          title: "Bạn có thông báo mới!",
          className: 'w-[250px] bg-gray-900 fixed right-0 bottom-0 border-none text-white',
          duration: 800
        })
        setCount_bell(data_old)
      }
    }
  }, [data?.data?.data_notification, count_bell]);

  let total_bell: any;
  if (data?.data?.data_notification) {
    total_bell = data?.data?.data_notification?.filter((item: any) => item?.status_message !== true) ?? ''
  }
  return (
    <div className="w-full bg-[#1F2936] min-h-screen">
      <div className="lg:w-[1540px] w-[90vw] mx-auto">
        {/* header */}
        <header className="w-full z-[1] bg-[#1F2936] h-[70px] flex items-center justify-between sticky top-0">
          <Link className='text-sm lg:text-xl font-extrabold font-sans text-gray-100' href={'/admin/dashboard'}>
            Store88
          </Link>
          <Search_Component_Dashboard />
          {/* options */}
          <div className="flex items-center gap-x-8">
            {/* chuong */}
            <Link href={'/admin/notification'} className="cursor-pointer relative">
              <BellRing className="text-gray-100" />
              {
                data?.data &&
                <span className="absolute w-5 h-5 rounded-[50%] text-white flex items-center justify-center -bottom-[20%] -right-1/4 bg-red-500 text-xs">{total_bell?.length}</span>
              }
            </Link>

            {/* logo account */}
            <div>
              <Image className="rounded-[50%] cursor-pointer hover:scale-110 duration-200" width={30} height={30} src={'/Images/avatar.jpg'} alt='avatar'></Image>
            </div>
          </div>
        </header>
        {/* side bar */}
        <main className="flex items-start gap-x-6 w-full grid lg:grid-cols-[200px_auto] grid-cols-[15%_auto] gap-x-10">
          <div className="sticky top-[80px]">
            <SideBarDashboard />
          </div>
          <div className="bg-[#111827] min-h-screen rounded *:w-full *:px-4">
            {children}
          </div>
        </main>
        <footer className="text-white text-center py-4 relative mt-auto">@Copyright by Tu Lam</footer>
      </div>
    </div>
  )
}

export default Layout_Admin