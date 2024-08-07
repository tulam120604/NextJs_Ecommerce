import Product_Item from '@/src/app/Components/Products/Product_Item';
import Paginate_item from './Paginate';
import Link from 'next/link';
import Loading_Dots from '@/src/app/Components/Loadings/Loading_Dots';



const Render_Products = ({ data }: any) => {
    // const isClient = typeof window !== 'undefined';
    // console.log(isClient);
    return (
        <div className="w-full flex flex-col mb:items-center lg:items-start">
            {data?.status === 404 ? (<><div className='min-h-[70vh] grid place-items-center w-full'>
                <div className='flex flex-col gap-y-2'>
                    Ôi hỏng!
                    <span>Có vẻ như đã có lỗi xảy ra :(( </span>
                    <Link className='underline text-sky-500' href={'/'}>Trở về trang chủ!</Link>
                </div>
            </div></>) : (<>
                <div className="mb:w-[342px] py-4 lg:w-full md:w-full grid rounded-lg lg:grid-cols-6 gap-y-6 gap-x-4 md:grid-cols-3 mb:grid-cols-2 lg:gap-y-8 text-center justify-between">
                    {
                        data?.data?.docs ?
                            Array.isArray(data?.data?.docs) &&
                            data?.data?.docs?.map((item: any) => {
                                return (
                                    <Product_Item key={item._id} dataProps={item} />
                                )
                            }) :
                            <Loading_Dots />
                    }
                </div>
            </>)}
            <div className="mx-auto py-6">
                {/* paginate page */}
                {
                    data?.data?.totalPages > 1 &&
                    <Paginate_item totalPages={data?.data?.totalPages} page={data?.data?.page} />
                }
            </div>
        </div>



    )
}

export default Render_Products