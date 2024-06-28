import React from 'react'
import Filter_Products from './Filter'
import Render_Products from './Render_Products'
import { setTimeout } from 'timers/promises'
import Template from '../template'

const Products =  () => {
  // await setTimeout(5000);
  return (
    <Template>
      <div className="lg:container lg:pb-20 lg:pt-[80px] py-4 pb-[199px] mx-auto lg:w-[1440px] md:w-[85vw] w-[342px] grid lg:grid-cols-[304px_auto] lg:gap-x-6 mb:grid-cols-[100%] *:w-full lg:justify-between">
        {/* filter */}
        <div className='hidden lg:block'>
          <Filter_Products />
        </div>
        {/* product */}
          <Render_Products />
        {/* render products */}
        {/* contentratest */}
      </div>
    </Template>
  )
}

export default Products