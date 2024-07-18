'use client'

import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='grid place-items-center translate-y-full'>
        <div className='flex flex-col items-center gap-y-6'>
        <Image width={100} height={100} src='/Images/no_bell.png' alt=''></Image>
        <span>Bạn không có thông báo gì !</span>
        </div>
    </div>
  )
}

export default page