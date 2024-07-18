import { Suspense } from 'react'
import Render_Products from './Render_Products'
import LoadingShops from './loading'

const Products = () => {
  //  const isClient = typeof window !== 'undefined';
  //   console.log(isClient);
  return (
    <Suspense fallback={<LoadingShops />}>
      <div className="lg:container py-10 mx-auto lg:w-[1440px] md:w-[90vw] w-[342px]">
        <div className="mx-auto relative text-center">
          <strong className="relative text-[#05422C] font-medium bg-white lg:text-xl px-4 mb:text-lg">Dành cho bạn</strong>
          <div className="absolute w-full h-[1px] bg-gray-400 top-1/2 z-[-1]"></div>
        </div>
        {/* product */}
        <Render_Products />
      </div>
    </Suspense>

  )
}

export default Products