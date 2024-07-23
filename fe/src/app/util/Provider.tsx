'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const queryClient = new QueryClient(
  //   {
  //   defaultOptions: {
  //     queries: {
  //       staleTime: 5000,
  //       refetchInterval : 1000
  //     },
  //   },
  // }
);

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer className='absolute' />
      {children}
    </QueryClientProvider>
  )
}

export default Provider