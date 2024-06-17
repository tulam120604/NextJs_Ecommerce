import React from 'react'
import Filter_Products from './[Filter]'
import Render_Products from './[Render_Products]'

const Products = () => {
  return (
    <div className="w-full lg:py-20 py-4 pb-[199px]">
      <div className="lg:container lg:mx-auto lg:w-[1315px] mb:w-full grid lg:grid-cols-[304px_978px] mb:grid-cols-[100%] *:w-full justify-between">
        {/* filter */}
        <div className='hidden lg:block'>
        <Filter_Products/>
        </div>
        {/* product */}
        <Render_Products/>
        {/* render products */}
        {/* contentratest */}
      </div>
    </div>

  )
}

export default Products