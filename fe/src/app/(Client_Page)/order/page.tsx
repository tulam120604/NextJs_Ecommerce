'use client';

import React, { Suspense } from 'react'
import Loading from './loading';
import { Input } from '../../Components/ui/Shadcn/input';
import { Get_MiddleWare_Cart_Order } from '../../_lib/Tanstack_Query/Middleware_Cart_order/Querry';
import { useRouter } from 'next/navigation';
import { Button } from '../../Components/ui/Shadcn/button';
import { useForm } from 'react-hook-form';
import { DataTable } from './data_table';
import { columns } from './colum';
import { Mutation_Order } from '../../_lib/Tanstack_Query/Order/Mutation_order';
import { toast } from 'react-toastify';
import Loading_animation from '../../Components/Loadings/Loading_animation';
import { schemaValidateOrder } from '../../(Auth)/validate';
import { yupResolver } from '@hookform/resolvers/yup';

const Page = () => {
  const routing = useRouter();
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
  const { data, isLoading } = Get_MiddleWare_Cart_Order(user_id);
  const mutate_order = Mutation_Order('ADD');
  function on_Order(infor_user_form: any) {
    const data_push_order = {
      user_id: user_id,
      items_order: data?.data[0]?.items_middleware,
      infor_user: {
        name_user: infor_user_form?.name_user,
        phone: infor_user_form?.phone,
        email_user: infor_user_form?.email_user,
        address: infor_user_form?.address,
      }
    }
    mutate_order.mutate(data_push_order);
  };
  if (mutate_order.isError) {
    toast.error('Lỗi!!! Đại vương hãy kiểm tra lại, hoặc liên hệ với bên hỗ trợ!!')
  }
  if (mutate_order.isSuccess) {
    let timeoutId;
    toast.success('Đại vương đã mua hàng thành công!', { autoClose: 500 });
    timeoutId = setTimeout(() => {
      routing.push('/');
    }, 500);
  }

  return (<Suspense fallback={<Loading />}>
    <form onSubmit={handleSubmit(on_Order)} className={`relative ${mutate_order.isLoading && 'after:fixed after:top-0 after:left-0 after:w-screen after:h-screen after:bg-[#33333366]'}`}>
      <div className="lg:w-[1200px] md:w-[90vw] mb:w-[342px] lg:pt-20 mb:pt-16 mx-auto grid lg:grid-cols-[58%_38%] justify-between mb:grid-cols-[100%] justify-between *:w-full pb-10">
        {/* left */}
        <div>
          {/* list items */}
          {data?.data.length > 0 ? (<>
            <span className="flex mb-[1px] items-center justify-between pb-6">Đơn hàng của bạn</span>
            {isLoading ? <span>Loading ...</span> :
              <DataTable columns={columns} data={data?.data[0]?.items_middleware} />
            }
            <div className='whitespace-nowrap text-lg my-4'>
              <span>Tổng tiền :</span>
              <span className='w-full ml-1 whitespace-nowrap text-red-600'>{data?.data[0]?.items_middleware.reduce((last: any, first: any) => (last + first.total_price_item), 0).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
            </div>
          </>) :<span>Không có đơn hàng nào!</span>}

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