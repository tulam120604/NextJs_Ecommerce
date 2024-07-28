import { Suspense } from 'react';
import LoadingShops from './loading';
import { unstable_noStore as noStore } from 'next/cache';
import { get_item_by_category } from '@/src/app/_lib/Fn_Items/products';
import { detail_Categories } from '@/src/app/_lib/Fn_Items/categories';
import Render_Products from '../Render_Products';

const Page = async ({ params }: any) => {
  noStore();
  const data = await get_item_by_category('', params?.category_products);
  const detail_category = await detail_Categories(params?.category_products);

  //  const isClient = typeof window !== 'undefined';
  //   console.log(isClient);
  return (
    <Suspense fallback={<LoadingShops />}>
      <div className="py-10 mx-auto lg:w-[1440px] md:w-[90vw] w-[342px]">
        <div className="mx-auto relative text-center">
          <strong className="relative text-[#05422C] font-medium bg-white lg:text-xl px-4 mb:text-lg">Danh mục {detail_category ? detail_category?.category_name : ''}</strong>
          <div className="absolute w-full h-[1px] bg-gray-400 top-1/2 z-[-1]"></div>
        </div>
        {/* product */}
        {
          Array.isArray(data) &&
          <Render_Products data={data} />
        }
      </div>
    </Suspense>

  )
}

export default Page