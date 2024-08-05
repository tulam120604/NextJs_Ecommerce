import Img_Detail_Product from './Img_detail';
import Infor_Detail_Product from './Infor_detail';
import Related_Product from './Related_Product';
import Breadcrum from '@/src/app/Components/breadcrum/breadcrum';
import { revalidatePath } from 'next/cache';
import Description from './Description';
import Infor_seller from './Infor_seller';
import { getDetail } from '../../_lib/Services_Items/products';
import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';
import { detail_Categories } from '../../_lib/Services_Items/categories';

const page = async ({ params }: any) => {
  noStore();
  //  const isClient = typeof window !== 'undefined';
  // console.log(isClient);
  const data = await getDetail(params?.detail_product);
  const data_category = await detail_Categories(data?.category_id)
  // const {data} = await res.json();
  revalidatePath('/products/[detail_product]', 'page');
  // fake data
  // const data = [1,1,1,1,1]
  return (
    <main className="w-full *:lg:w-[1440px] *:w-[342px] *:mx-auto *:h-full py-2">
      {data?.status === 404 ? (<><div className='min-h-[70vh] grid place-items-center'>
        <div className='flex flex-col gap-y-2'>
          Ôi hỏng!
          <span>Có vẻ như đã có lỗi xảy ra :(( </span>
          <Link className='underline text-sky-500' href={'/'}>Trở về trang chủ!</Link>
        </div>
        </div></>)
        : (<>
          <div className='flex items-center text-sm gap-x-2 font-medium capitalize text-gray-700 mb-4'>
            {/* <Link href={'/'} className='hover:text-black'>Trang chủ</Link>/
        <Link href={'/products'} className='hover:text-black'>Sản phẩm</Link>/
        <Link href={'/products'} className='hover:text-black'>Táo</Link> */}
            <Breadcrum textProps={{
              name_item : data?.short_name,
              name_category : data_category
            }} />
          </div>
          <div className="lg:grid lg:grid-cols-[573px_auto] gap-x-10 bg-white pb-4">
            {/*  desktop : left  , mobile : row 1 */}
            <Img_Detail_Product dataProps={data} />
            {/*desktop: right, mobile : row 2 */}
            <div>
            <Infor_Detail_Product dataProps={data} />
            </div>
          </div>
          <Infor_seller />
          {/* related products */}
          <Description dataProps={data} />
          <div className="pt-4">
            <span className="lg:text-2xl text-xl mb-2">Sản phẩm liên quan</span>
            <Related_Product dataProps={data?.category_id}/>
          </div>
        </>)}
    </main>


  )
}

export default page