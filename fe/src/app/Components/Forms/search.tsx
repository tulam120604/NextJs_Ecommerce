'use client';

import { useEffect, useState } from "react";
import Search_icon from "../Icons/Search";
import { search_item } from "../../_lib/Fn_Items/products";
import Image from "next/image";
import Link from "next/link";


export const Search_Component_Dashboard = () => {
  return (
    <div className="relative">
      <input
        type="text"
        id="Search"
        placeholder="Search for..."
        className="w-full rounded-md text-white border-gray-200 bg-[#1F2936] p-3 outline-none pe-10 shadow-sm sm:text-sm"
      />
      <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
        <button type="button" className="text-gray-100 hover:text-gray-300">
          <Search_icon />
        </button>
      </span>
    </div>
  )
}

export function Search_Component_Client() {
  const [value_search, setValue_search] = useState<any>([]);
  const [key_search, setKey_search] = useState<string>('');
  useEffect(() => {
    const time_search = setTimeout(() => {
      if (key_search) {
        search_item(key_search).then((res) => setValue_search(res)).catch((error) => console.log(error))
      }
      else {
        setValue_search([])
      }
    }, 500);
    return () => clearTimeout(time_search);
  }, [key_search]);

  return (<div className="relative">
    <form className={`relative w-full *:h-[36px] gap-x-2 shadow-2xl duration-300`}>
      <input type="text" className="border rounded-lg w-full px-5 text-sm outline-none font-normal text-gray-700" placeholder="Đại vương muốn mua gì nào?"
        onChange={(e) => setKey_search(e.target.value)} />
      <button type='submit' className="absolute top-0 right-[2%] rounded-[50%] w-[36px] duration-300 cursor-pointer">
        <Search_icon />
      </button>
    </form>
    {
      value_search.length > 0 &&
      <div className="bg-white w-full absolute py-2 px-5 rounded-lg text-gray-900 text-sm flex flex-col gap-y-3">
        {
          value_search?.map((item: any) => (
            <Link href={`/${item?._id}`} key={item?._id} className="grid grid-cols-[50px_auto] gap-x-4" onClick={() => setValue_search([])}>
              <Image key={item?.short_name} width={50} height={50} className="h-[50px] border" alt="Loading..." src={item?.feature_product} />
              <span>{item?.short_name}</span>
            </Link>
          ))
        }
      </div>
    }
  </div>)
}