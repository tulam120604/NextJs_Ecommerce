import List_Products from "@/src/app/Components/Products/List_Products";
import { unstable_noStore as noStore } from "next/cache";
import { get_item_by_category } from "../../_lib/Fn_Items/products";

const Related_Product =  async ({dataProps} : any) => {
  noStore();
  const data = await get_item_by_category('',dataProps)
  return (
    <List_Products data={data}/>
  )
}

export default Related_Product