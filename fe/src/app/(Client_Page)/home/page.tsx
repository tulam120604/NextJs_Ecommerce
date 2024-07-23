// 'use client';

import { Suspense } from "react";
import Banner from "./Banner";
import Products_Home from "./Products";
import Service from "./Category";
import LoadingLandingPage from "./loading";


const Layout_Home = () => {
    //   const isClient = typeof window !== 'undefined';
    // console.log(isClient);
  return (<>
    <Suspense fallback={<LoadingLandingPage />}>
      <Banner />
      <Service />
      <Products_Home />
    </Suspense>
  </>)
}

export default Layout_Home