import Link from "next/link"
import Product_Item from "./Product_Item"

const List_Products = ({data} : any) => {
    // const isClient = typeof window !== 'undefined';
    // console.log(isClient);
  return (
    <div className="lg:w-[1440px] mx-auto md:w-[90vw] mb:w-[342px] flex flex-col">
            <div className="grid lg:pt-16 pb-5 snap-x lg:grid-cols-6 md:grid-cols-3 gap-x-4 grid-cols-2 justify-between lg:gap-y-8 mb:gap-y-[29px] mb:pt-10">
                {
                    data?.map((item : any) => {
                        return (
                            <Product_Item key={item._id} dataProps={item}/>
                        )
                    })
                }
            </div>
        </div>
  )
}

export default List_Products