import { Suspense } from "react";
import Banner from "./_component/Banner";
import Service from "./_component/Category";
import Products_Home from "./_component/Products";
import LoadingLandingPage from "./_component/loading";
import { getLimit } from "../../_lib/Services/Services_Items/products";
import { unstable_noStore as noStore } from "next/cache";


const Layout_Home = async () => {
  noStore();
  //   const isClient = typeof window !== 'undefined';
  // console.log(isClient);
  const data = await getLimit(42);
  return (<>
    <Suspense fallback={<LoadingLandingPage />}>
      <Banner />
      <Service />
      <Products_Home dataProps={data}/>
    </Suspense>
  </>)
}

export default Layout_Home