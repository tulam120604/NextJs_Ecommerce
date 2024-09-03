/* eslint-disable @next/next/no-img-element */
'use client';

import Image from 'next/image'
import React, { Suspense, useEffect, useState } from 'react'
import LoadingCart from './loading';
import { Get_Items_Cart } from '@/src/app/_lib/Tanstack_Query/Cart/query';
import { useRouter } from 'next/navigation';
import { Mutation_Cart } from '@/src/app/_lib/Tanstack_Query/Cart/mutation_Cart';
import { io } from 'socket.io-client';
import { useToast } from '@/src/app/_Components/ui/use-toast';
import { ToastAction } from '@/src/app/_Components/ui/toast';
import { useCheck_user } from '@/src/app/_lib/Custome_Hooks/User';
import Table_Cart from './_components/table';
import { Button } from '@/src/app/_Components/ui/Shadcn/button';
import useStoreZustand from '@/src/app/Zustand/Store';


const Cart = () => {
  const { toast } = useToast();
  // socket
  useEffect(() => {
    const socket = io('http://localhost:8888')
    socket.on('res_message', (data: any) => {
      toast({
        title: "Thông báo!",
        description: `Rất tiếc, sản phẩm ${data?.name_item} không còn tồn tại!`,
        className: 'border border-gray-800',
        action: (
          <ToastAction altText="Goto schedule to undo">Ok</ToastAction>
        ),
      })
    })
  }, [])

  const routing = useRouter();
  const { mutate } = Mutation_Cart("CHECKED_AND_REMOVE_ALL");
  const user = useCheck_user() ?? undefined;
  const { setData, data: dataZustand } = useStoreZustand();
  useEffect(() => {
    if (!user) {
      routing.push('/')
    }
  }, [routing, user])
  const { data, isLoading } = Get_Items_Cart(user?.check_email?._id);
  const [arr_item_checkbox, setarr_item_checkbox] = useState<any>([]);
  useEffect(() => {
    if (!isLoading) {
      const new_arr: any = [];
      data?.items?.map((item: any) => (new_arr.push(item)));
      setarr_item_checkbox(new_arr);
    }
  }, [data, isLoading]);
  useEffect(() => {
    if (data) {
      const data_item_payment = data?.items?.filter((item: any) => (item?.status_checked && item));
      console.log(data_item_payment)
      if (data_item_payment.length > 0) {
        setData(data_item_payment)
      }
    }
  }, [data])
  if (isLoading) {
    return (
      <LoadingCart />
    )
  };
  // console.count('re-render cart :');
  const data_checked_true = arr_item_checkbox.filter((item: any) => item?.status_checked && item);
  function remove_all_item_cart() {
    const item = {
      user_id: user?.check_email?._id,
      key_action: 'remove_all'
    };
    mutate(item);
  }

  function handle_Checkked(id_item: any, color_item: any, size_item: any) {
    const item = {
      user_id: user?.check_email?._id,
      id_item: id_item,
      color: color_item,
      size: size_item
    };
    mutate(item);
  }

  const data_item_payment = data?.items?.filter((item: any) => (item?.status_checked && item));
  // next order
  function next_page_payment() {
    // check so luong
    for (let i of data_item_payment) {
      if (i?.product_id?.attributes) {
        for (let j of i?.product_id?.attributes?.varriants) {
          for (let k of j?.size_item) {
            if (i?.quantity > k?.stock_item) {
              toast({
                title: "Thông báo!",
                description: `Rất tiếc, sản phẩm ${i?.product_id?.short_name} chỉ còn ${k?.stock_item} chiếc. Vui lòng giảm số lượng thanh toán!`,
                className: 'border border-gray-800',
                action: (
                  <ToastAction altText="Goto schedule to undo">Ok</ToastAction>
                ),
              });
              return null;
            }
          }
        }
      }
      else {
        if (i?.quantity > i?.product_id?.stock) {
          toast({
            title: "Thông báo!",
            description: `Rất tiếc, sản phẩm ${i?.product_id?.short_name} chỉ còn ${i?.product_id?.stock} chiếc. Vui lòng giảm số lượng thanh toán!`,
            className: 'border border-gray-800',
            action: (
              <ToastAction altText="Goto schedule to undo">Ok</ToastAction>
            ),
          });
          return null;
        }
      }
    }
    sessionStorage.removeItem('item_order');
    const item_cart_order = {
      ...data,
      items: data_item_payment,
      action: 'cart_item',
    }
    sessionStorage.setItem('item_order', JSON.stringify(item_cart_order));
    routing.push('/order');
  }

  // console.count('re-render : ')

  const dataProps = {
    data: data,
    data_item_next_order: data_item_payment,
    user: user?.check_email,
    data_checked_true: data_checked_true,
    handle_Checkked: handle_Checkked,
    remove_all_item_cart: remove_all_item_cart
  }
  return (
    <Suspense fallback={<LoadingCart />}>
      <div className="max-w-[1440px] w-[95vw] pt-10 mx-auto pb-8">
        {/* left */}
        <span className="text-xl flex mb-[1px] items-center justify-between">Giỏ hàng của bạn <p className="text-[#9D9EA2] lg:text-base mb:text-sm">(3)</p></span>
        {/* list items */}
        <Table_Cart dataProps={dataProps} />

        <div className="w-full rounded-lg lg:flex items-center justify-between bg-white py-2 px-4 lg:p-4 gap-x-4 sticky bottom-0 z-[10] shadow-[0_-5px_20px_-15px_rgba(0,0,0,0.3)] mt-8">
          <span className="text-gray-800 whitespace-nowrap text-sm lg:text-base">Số lượng ({data_item_payment?.length} sản phẩm)</span>
          <Button onClick={next_page_payment} type='button' className="flex gap-x-4 mt-2 lg:mt-0">
            <span>Tiến hành thanh toán</span>
            |
            <span>{data?.total_price?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
          </Button>
        </div>
      </div>
    </Suspense >
  )
}

export default Cart