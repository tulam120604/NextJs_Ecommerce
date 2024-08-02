'use client';

import React, { Suspense, useEffect, useState } from 'react'
import Loading from './loading';
import { Input } from '../../Components/ui/Shadcn/input';
import { useRouter } from 'next/navigation';
import { Button } from '../../Components/ui/Shadcn/button';
import { useForm } from 'react-hook-form';
import { columns } from './colum';
import { Mutation_Order } from '../../_lib/Tanstack_Query/Order/Mutation_order';
import Loading_animation from '../../Components/Loadings/Loading_animation';
import { schemaValidateOrder } from '../../(Auth)/validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { DataTable } from '../../Components/ui/Tables/data_table';

const Page = () => {
  const routing = useRouter();
  const [list_item_order, setList_item_order] = useState<any>();
  let user_id: any;
  if (typeof window !== 'undefined') {
    if (!localStorage.getItem('account')) {
      routing.push('/')
    }
    const user = JSON.parse(localStorage.getItem('account') || '{}');
    user_id = user?.check_email?._id;
  }
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaValidateOrder)
  });
  let action_mutation = ''
 if (list_item_order?.action === 'restore_buy_item' ) {
   action_mutation = list_item_order?.action
 }
  const mutate_order = Mutation_Order('ADD_and_RESTORE_BUY_ITEM');
  function on_Order(infor_user_form: any) {
    const data_order = {
      user_id: user_id,
      action_mutate : action_mutation,
      items_order: list_item_order?.items,
      infor_user: {
        name_user: infor_user_form?.name_user,
        phone: infor_user_form?.phone,
        email_user: infor_user_form?.email_user,
        address: infor_user_form?.address,
      },
      id_order : list_item_order?.id_order
    }
    mutate_order.mutate(data_order);
  };
  if(mutate_order.status_api === 'call_ok') {
    routing.push('/')
  }
  useEffect(() => {
    if (typeof window) {
      const data_session = JSON.parse(sessionStorage.getItem('item_order') || '{}');
        setList_item_order(data_session);
    }
  }, []);
  return (<Suspense fallback={<Loading />}>
    <form onSubmit={handleSubmit(on_Order)} className={`relative ${mutate_order.isLoading && 'after:fixed after:top-0 after:left-0 after:w-screen after:h-screen after:bg-[#33333366]'}`}>
      <div className="lg:w-[1440px] md:w-[90vw] mb:w-[342px] lg:pt-20 mb:pt-16 mx-auto grid lg:grid-cols-[58%_38%] justify-between mb:grid-cols-[100%] justify-between *:w-full pb-10">
        {/* left */}
        <div>
          {/* list items */}
          {list_item_order ? (<>
            <span className="flex mb-[1px] items-center justify-between pb-6">Đơn hàng của bạn</span>
            {
              list_item_order?.items ? (<div className='*:text-gray-800'>
                <DataTable columns={columns} data={list_item_order?.items} />
                <div className='whitespace-nowrap text-lg my-4'>
                  <span>Tổng tiền :</span>
                  <span className='w-full ml-1 whitespace-nowrap text-red-600'>
                    {(list_item_order?.total_price ? list_item_order?.total_price : list_item_order?.items[0]?.total_price_item)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                  </span>
                </div>
              </div>) :  routing.push('/')
            }

          </>) : <span>Không có đơn hàng nào!</span>}
        </div>

        {/* right */}
        <div className="hidden lg:block">
          <span className="flex mb-[1px] items-center justify-between pb-6">Thông tin của bạn</span>
          <div className='flex flex-col gap-y-5'>
            <div>
              <label htmlFor="name">Tên của bạn :</label>
              <Input {...register('name_user')} id='name' placeholder="Name" />
              {errors.name_user && <p className="text-red-500 md:text-sm text-xs">{errors.name_user.message}</p>}
            </div>
            <div>
              <label htmlFor="name">Số điện thoại :</label>
              <Input {...register('phone')} id='phone' placeholder="Phone" />
              {errors.phone && <p className="text-red-500 md:text-sm text-xs">{errors.phone.message}</p>}
            </div>
            <div>
              <label htmlFor="name">Email :</label>
              <Input {...register('email_user')} id='email' placeholder="Email" />
              {errors.email_user && <p className="text-red-500 md:text-sm text-xs">{errors.email_user.message}</p>}
            </div>
            <div>
              <label htmlFor="name">Địa chỉ của bạn :</label>
              <Input {...register('address')} id='address' placeholder="Address" />
              {errors.address && <p className="text-red-500 md:text-sm text-xs">{errors.address.message}</p>}
            </div>
          </div>
          <Button className='my-4' type='submit'>Thanh toán</Button>
        </div>
        {/* mobile */}
        <div className="block lg:hidden mt-[35px]">
          <Input placeholder="shadcn" />
          <Button type='submit'>{mutate_order.isLoading ? <Loading_animation /> : 'Thanh toán'}</Button>
        </div>
      </div>
    </form>
  </Suspense >)
}

export default Page