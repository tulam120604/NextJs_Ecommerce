'use client';

import { Query_Items } from "@/src/app/_lib/Tanstack_Query/Items/query"
import List_Products from "@/src/app/Components/Products/List_Products";

const Related_Product =  () => {
  const {data} = Query_Items();
  return (
    <List_Products data={data}/>
  )
}

export default Related_Product