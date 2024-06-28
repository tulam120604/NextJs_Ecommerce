'use client';

import { Suspense } from "react";
import About_Us from "./About_Us";
import Banner from "./Banner";
import Best_Sellers from "./Best_Seller";
import Products_Home from "./Products";
import Service from "./Service";
import LoadingLandingPage from "./loading";


const Layout_Home = () => {
  return (<>
    <Suspense fallback={<LoadingLandingPage/>}>
      <Banner />
      <Service />
      <Best_Sellers />
      <Products_Home />
      <About_Us />
    </Suspense>
  </>)
}

export default Layout_Home