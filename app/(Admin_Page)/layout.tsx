'use client';

import Link from "next/link";
import Image from "next/image";
import SideBarDashboard from "./SideBar";
import LoadingPage from "../Components/Loadings/LoadingPage";
// import {use}

const Layout_Admin = ({children} : Readonly<{children : React.ReactNode}>) => {
  return (
      <div className="w-full bg-[#1F2936] min-h-screen">
      <div className="lg:w-[1540px] w-[95vw] mx-auto">
        {/* header */}
        <header className="w-full h-[70px] flex items-center justify-between">
          <Link className='text-4xl font-extrabold font-sans text-[#05422c]' href={'/admin/dashboard'}>
            Fruits
          </Link>
          {/* options */}
          <div className="flex items-center gap-x-8">
            {/* chuong */}
            <div className="cursor-pointer relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
              <span className="absolute w-5 h-5 rounded-[50%] text-white flex items-center justify-center -top-[40%] -left-1/4 bg-red-500 text-xs">0</span>
            </div>
            {/* logo account */}
            <div>
              <Image className="rounded-[50%] border" width={30} height={30} src={''} alt=''></Image>
            </div>
          </div>
        </header>
        {/* side bar */}
        <main className="flex items-start gap-x-6">
          <div className="w-[200px]">
            <SideBarDashboard/>
          </div>
          <div className="bg-gray-700 w-full h-full rounded *:w-full *:px-4">
            {children}
          </div>
        </main>
        <footer className="text-white text-center py-4 relative mt-auto">@Copyright by Tu Lam</footer>
      </div>
    </div>
  )
}

export default Layout_Admin