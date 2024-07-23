import Product_Item from '@/src/app/Components/Products/Product_Item';
import { getRespon } from '../../_lib/Fn_Items/products';
import Paginate_item from './Paginate';

// async function getRespon() {
//     const res = await fetch(`http://localhost:2000/v1/products?&_limit=40`, { cache: 'no-cache' })
//     const respon = await res.json()
//     return respon
// }


const Render_Products = async  () => {
    const {data} = await getRespon();
    // const isClient = typeof window !== 'undefined';
    // console.log(isClient);

   
    // fake data render html
    // const data = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
    const firstData = data.docs.slice(0, 40);
    const lastData = data.docs.slice(10)
    return (
        <div className="w-full flex flex-col mb:items-center lg:items-start">
            {/* render products */}
            <div className="mb:w-[342px] py-4 lg:w-full md:w-full grid rounded-lg lg:grid-cols-6 gap-y-6 gap-x-4 md:grid-cols-3 mb:grid-cols-2 lg:gap-y-8 text-center justify-between">
               {
                firstData?.map((item : any) => {
                    return (
                        <Product_Item key={item._id} dataProps={item}/>
                    )
                })
               }
            </div>
            {/* list page */}
            <div className="mx-auto py-6">
                {/* paginate page */}
              <Paginate_item/>
            </div>
        </div>



    )
}

export default Render_Products