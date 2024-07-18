'use client';

import { QueryClient, QueryClientProvider  } from '@tanstack/react-query';
import React, { ReactNode } from 'react'


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

const Provider = ({children} : {children : ReactNode}) => {
  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}

export default Provider