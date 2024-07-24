import Img_Detail_Product from './Img_detail';
import Infor_Detail_Product from './Infor_detail';
import Related_Product from './Related_Product';
import Breadcrum from '@/src/app/Components/breadcrum/breadcrum';
import { revalidatePath } from 'next/cache';
import Description from './Description';
import Infor_seller from './Infor_seller';

const page = async ({ params }: any) => {
    //  const isClient = typeof window !== 'undefined';
    // console.log(isClient);
  const res = await fetch(`http://localhost:2000/v1/products/${params?.detail_product}`, {cache : 'no-store'});
  if (!res.ok) {
    console.warn('Call data failer')
  }
  const {data} = await res.json();
  revalidatePath('/products/[detail_product]', 'page');
  // fake data
  // const data = [1,1,1,1,1]
  return (
    <main className="w-full *:lg:w-[1440px] *:w-[342px] *:mx-auto *:h-full py-2">
      <div className='flex items-center text-sm gap-x-2 font-medium capitalize text-gray-700 mb-4'>
        {/* <Link href={'/'} className='hover:text-black'>Trang chủ</Link>/
        <Link href={'/products'} className='hover:text-black'>Sản phẩm</Link>/
        <Link href={'/products'} className='hover:text-black'>Táo</Link> */}
        <Breadcrum textProps={data?.short_name} />
      </div>
      <div className="lg:grid lg:grid-cols-[573px_auto] gap-x-20">
        {/*  desktop : left  , mobile : row 1 */}
        <Img_Detail_Product dataProps={data} />
        {/*desktop: right, mobile : row 2 */}
        <Infor_Detail_Product dataProps={data} />
      </div>
      <Infor_seller/>
      {/* related products */}
      <Description dataProps={data}/>
      <div className="pt-4">
        <span className="lg:text-2xl text-xl lg:tracking-[-0.5px]">Sản phẩm liên quan</span>
        <Related_Product />
      </div>
    </main>


  )
}

export default page