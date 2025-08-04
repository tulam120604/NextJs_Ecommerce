/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Search_Component_Client } from "../../Forms/search";
import {
  BadgeCheck,
  BadgeDollarSign,
  RefreshCcwDot,
  Tag,
  Truck,
} from "lucide-react";
import Header_mobile from "./header_mobile";
import { useAuthStore } from "@/src/app/_lib/Zustand/Store";
import Auth_actions from "./auth_actions";
import TopBar from "./top_bar";

const Header = () => {
  const routing = useRouter();
  const pathName = usePathname();
  const { data, isLoading, isFetching, isHydrated } = useAuthStore();

  console.count("re-render:");
  function back_to_home() {
    if (pathName === "/") {
      window.location.reload();
    } else {
      routing.push("/");
    }
  }
  return (
    <>
      <TopBar props={{ data, isLoading, isFetching, isHydrated }} />
      <header className="w-full z-[2000] duration-300 pt-5 pb-2 sticky top-0 lg:relative overflow-hidden">
        {/* logo, search and cart */}
        <div
          className="relative mx-auto max-w-[1440px] w-[95vw] flex justify-between *:flex *:items-center lg:gap-x-20 gap-x-5 items-center 
            bg-white rounded-md p-3"
        >
          {/* logo */}
          <button
            onClick={back_to_home}
            className="!hidden lg:!flex !items-end"
          >
            <Image
              width={50}
              height={50}
              className="w-10 h-10"
              src={
                "https://res.cloudinary.com/tulam120604/image/upload/v1745568585/by1qzllthq4ypulyfrey.png"
              }
              alt="Store88"
            />
            <span className="text-2xl font-semibold opacity-80 font-serif">Store88</span>
          </button>
          {/* logo mobile */}
          <div className="lg:hidden grid place-content-center z-[-1] -top-10 absolute overflow-hidden w-full">
            <span className="font-sans font-extrabold text-yellow-300 text-[50px]">
              STORE88
            </span>
          </div>
          {/* search form */}
          <Search_Component_Client />
          {/* auth actions */}
          <Auth_actions props={{ data, isLoading, isFetching, isHydrated }} />
        </div>
      </header>

      {/* about us */}
      <div className="border-y w-full -z-1">
        <section
          className="hidden_scroll mx-auto max-w-[1440px] w-[95vw] overflow-x-auto *:whitespace-nowrap bg-white dark:bg-red-500 flex 
        *:flex items-center *:items-center *:gap-x-1 *:text-xs py-3 *:cursor-default"
        >
          {/* 1 */}
          <div className="border-r-2 pr-5">
            <BadgeCheck className="w-5 h-5" fill="#0A68FF" color="#fff" />
            <span>100% chất lượng</span>
          </div>

          {/* 2 */}
          <div className="border-r-2 px-5">
            <BadgeDollarSign className="w-5 h-5" fill="#0A68FF" color="#fff" />
            <span>Hoàn tiền 100%</span>
          </div>

          {/* 3 */}
          <div className="border-r-2 px-5">
            <RefreshCcwDot className="w-5 h-5" color="#0A68FF" />
            <span>30 ngày đổi trả</span>
          </div>

          {/* 4 */}
          <div className="border-r-2 px-5">
            <Tag className="w-5 h-5" fill="#0A68FF" color="#fff" />
            <span>Giá siêu rẻ</span>
          </div>

          {/* 5 */}
          <div className="px-5">
            <Truck className="w-5 h-5" color="#0A68FF" />
            <span>Giao hàng nhanh chóng</span>
          </div>
        </section>
      </div>
      <div className="fixed border-t bottom-0 lg:!hidden w-screen z-[2000]">
        <Header_mobile dataProps={{ account: data?.user_name }} />
      </div>
    </>
  );
};

export default Header;
