import Img_Detail_Product from './Img_detail';
import Infor_Detail_Product from './Infor_detail';
import Related_Product from './Related_Product';
import Link from 'next/link';
import { getDetail } from '@/app/_lib/Fn_Items/products';

const page = async ({params} : any) => {
  // const data = await getDetail(params.detail_product);
  // console.log(data) 

  //fake data
  const data = [1,1,1,1,1]
  return (
      <main className="w-full *:lg:w-[1440px] *:w-[342px] *:mx-auto *:h-full lg:py-16 mb:py-10">
      <div className='flex items-center text-sm gap-x-2 font-medium capitalize text-gray-700 mb-6'>
          <Link href={'/'} className='hover:text-black'>Trang chủ</Link>/
          <Link href={'/products'} className='hover:text-black'>Sản phẩm</Link>/
          <Link href={'/products'} className='hover:text-black'>Táo</Link>
        </div>
      <div className="lg:grid lg:grid-cols-[573px_auto] gap-x-20 border-b">
        {/*  desktop : left  , mobile : row 1 */}
        <Img_Detail_Product/>
        {/*desktop: right, mobile : row 2 */}
        <Infor_Detail_Product/>
      </div>
      {/* related products */}
      <div className="lg:mt-6 mb:-mt-1 lg:pt-[58px] mb:pt-[34px]">
        <span className="lg:text-2xl text-xl lg:tracking-[-0.5px]">Sản phẩm liên quan</span>
        <Related_Product />
      </div>
    </main>


  )
}

export default page