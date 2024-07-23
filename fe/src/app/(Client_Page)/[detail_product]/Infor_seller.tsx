import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Infor_seller = () => {
  return (
    <div className='py-2 lg:py-4 px-4 lg:px-10 flex items-center gap-x-8 my-10 bg-gray-50'>
        <Image width={100} height={100} className='size-16 lg:size-20 rounded-[50%]' src={'/Images/avatar.jpg'} alt='Loading...'></Image>
        <div className='flex flex-col items-start gap-y-2'>
        <span className='text-lg lg:text-xl'>user name seller</span>
        <Link href='/' className='px-4 py-2 border border-black rounded duration-200 hover:bg-black hover:text-white'>Xem shop</Link>
        </div>
    </div>
  )
}

export default Infor_seller