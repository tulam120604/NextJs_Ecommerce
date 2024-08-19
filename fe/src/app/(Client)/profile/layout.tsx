'use client';

import React, { useEffect } from 'react';
import Side_bar from './side_bar';
import io from 'socket.io-client';
import { useRouter } from 'next/navigation';
import { useToast } from '../../_Components/ui/use-toast';
import { ToastAction } from '../../_Components/ui/toast';

const Layout_Profile = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();

  useEffect(() => {
    const socket = io();
    socket.on('res_status_item_order_to_user', (data) => {
      console.log(data)
      toast({
        title: "Thông báo!",
        description: data,
        className: 'border border-gray-800',
        action: (
          <ToastAction altText="Goto schedule to undo">Ok</ToastAction>
        ),
      })
    });
    return () => {
      socket.disconnect();
    }
  }, [])

  const routing = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!localStorage.getItem('account')) {
        routing.push('/')
      }
    }
  }, [])
  return (
    <div className='max-w-[1440px] mx-auto md:w-[90vw] mb:w-[342px] grid lg:grid-cols-[250px_auto] grid-cols-[50px_auto] pt-4 *:rounded overflow-hidden'>
      <Side_bar />
      <div className='min-h-[90vh]'>
        {children}
      </div>
    </div>
  )
}

export default Layout_Profile