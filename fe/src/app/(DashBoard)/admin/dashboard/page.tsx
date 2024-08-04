'use client';

import React, { Suspense } from 'react'
import Box from './_component/box';
import { ChartData } from './_component/Chart';
import { Query_Category, Query_List_All_Items_Dashboard } from '@/src/app/_lib/Tanstack_Query/Items/query';
import { List_Account } from '@/src/app/_lib/Tanstack_Query/Auth/Query_Auth';
import { useToken } from '@/src/app/_lib/Custome_Hooks/User';
import Loading_Dots from '@/src/app/Components/Loadings/Loading_Dots';

const Page = () => {
  const token = useToken();
  const { data } = Query_List_All_Items_Dashboard(token.accessToken);
  const { data: account } = List_Account(token.accessToken);
  const { data: category } = Query_Category();
  return (
    <Suspense fallback={<Loading_Dots/>}>
      <div className='py-4 text-gray-100'>
        <strong className='text-2xl'>Bảng điều khiển</strong>
        <div className='grid grid-cols-4 *:p-6 *:rounded-xl *:border *:border-gray-200 gap-x-6 my-6'>
          <Box dataProps={{ text: 'Tổng doanh thu', number: '45.231,89 đ' }} />
          <Box dataProps={{ text: 'Tổng mặt hàng', number: data?.data?.totalDocs }} />
          <Box dataProps={{ text: 'Danh mục', number: category?.data.length }} />
          <Box dataProps={{ text: 'Tài khoản', number: account?.data?.totalDocs }} />
        </div>
        {/* chart */}
        <div className='grid grid-cols-[60%_38%]'>
          <ChartData />
        </div>
      </div>
    </Suspense>
  )
}

export default Page