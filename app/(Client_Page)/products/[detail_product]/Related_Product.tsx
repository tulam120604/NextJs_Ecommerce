import Product_Item from "@/app/Components/Products/Product_Item"
import Image from "next/image"

const Related_Product = () => {
  const arr = [1, 2, 3, 4]

  return (
    <div className="lg:w-full mb:w-[342px] md:w-[95vw] grid lg:my-[41px] my-6 lg:grid-cols-[304px_304px_304px_304px] mb:grid-cols-[159px_159px] lg:gap-y-8 gap-y-[29.5px] text-center justify-between">
          {
            arr?.map((item) => {
              return (
                <Product_Item key={item}/>
              )
            })
          }
        </div>
  )
}

export default Related_Product