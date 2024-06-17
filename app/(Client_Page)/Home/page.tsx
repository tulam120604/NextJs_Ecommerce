import React from 'react'
import Banner from './[Banner]'
import Service from './[Service]'
import Best_Sellers from './[Best_Seller]'
import Products_Home from './[Products]'
import About_Us from './[About_Us]'

const Layout_Home = () => {
  return (<>
        <Banner/>
        <Service/>
        <Best_Sellers/>
        <Products_Home/>
        <About_Us/>
  </>)
}

export default Layout_Home