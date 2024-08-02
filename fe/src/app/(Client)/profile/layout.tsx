'use client';

import React from 'react'
import Side_bar from './side_bar'
import { useRouter } from 'next/navigation';

const Layout_Profile = ({ children }: { children: React.ReactNode }) => {
  const routing = useRouter();
  if (typeof window !== 'undefined') {
    if (!localStorage.getItem('account')) {
    routing.push('/')
  }
  }
  return (
    <div className='lg:w-[1440px] mx-auto md:w-[95vw] grid lg:grid-cols-[250px_auto] grid-cols-[50px_auto] pt-4 *:rounded overflow-hidden'>
      <Side_bar />
      {children}
    </div>
  )
}

export default Layout_Profile