'use client';

import Link from "next/link";
import Image from "next/image";
import SideBarDashboard from "./SideBar";
import LoadingPage from "../Components/Loadings/LoadingPage";
import Bell_icon from "../Components/Icons/bell";
// import {use}

const Layout_Admin = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
      <div className="w-full bg-[#1F2936] min-h-screen">
        <div className="lg:w-[1540px] w-[90vw] mx-auto">
          {/* header */}
          <header className="w-full z-[1] bg-[#1F2936] h-[70px] flex items-center justify-between sticky top-0">
            <Link className='text-sm lg:text-xl font-extrabold font-sans text-gray-100' href={'/admin/dashboard'}>
              Store88
            </Link>
            {/* options */}
            <div className="flex items-center gap-x-8">
              {/* chuong */}
              <div className="cursor-pointer relative">
               <Bell_icon/>
                <span className="absolute w-5 h-5 rounded-[50%] text-white flex items-center justify-center -top-[40%] -left-1/4 bg-red-500 text-xs">0</span>
              </div>
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
            <div className="bg-[#111827] h-full rounded *:w-full *:px-4">
              {children}
            </div>
          </main>
          <footer className="text-white text-center py-4 relative mt-auto">@Copyright by Tu Lam</footer>
        </div>
      </div>
  )
}

export default Layout_Admin