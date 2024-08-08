'use client'

import { Mutation_Notification } from '@/src/app/_lib/Tanstack_Query/Notification/Mutation_Notification'
import { Button } from '@/src/app/Components/ui/Shadcn/button'
import { Checkbox } from '@/src/app/Components/ui/Shadcn/checkbox'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Page() {
    const routing = useRouter();
    let user: any;
    if (typeof window !== 'undefined') {
        if (!localStorage.getItem('account')) {
            routing.push('/')
        }
        user = JSON.parse(localStorage.getItem('account') || '{}') ?? ''
    }
    // console.log(user?.check_email)
    const mutate_notification = Mutation_Notification('ADD');
    function onSendMessage(dataForm: any) {
        const data_body = {
            sender_id: user?.check_email?._id,
            receiver_id: 'admin@admin.com',
            notification_message: dataForm?.note_shop,
            notes : dataForm?.address_shop
        }
        mutate_notification.mutate(data_body)
    }
    return (
        <div className='pl-4'>
            <div className='text-center'>
            <strong className='text-lg'>Đăng kí kênh người bán</strong>
            </div>
            <form onSubmit={mutate_notification.form_notification.handleSubmit(onSendMessage)} className='max-w-[600px] mx-auto mt-6'>
                <div className='flex flex-col gap-y-2 my-4'>
                    <label htmlFor="name_shop">Tên shop</label>
                    <input className='px-3 py-2 rounded outline-1 text-sm' id='name_shop' type="text" placeholder='Nhập'
                        {...mutate_notification.form_notification.register('name_shop', { required: 'Tên shop không được để trống!' })} defaultValue={user?.check_email?.user_name} />
                    {mutate_notification.errors.name_shop && <span className='text-red-500 text-sm'>{mutate_notification.errors.name_shop?.message}</span>}
                </div>
                <div className='flex flex-col gap-y-2 my-4'>
                    <label htmlFor="phone_shop">Số điện thoại</label>
                    <input className='px-3 py-2 rounded outline-1 text-sm' id='phone_shop' type="text" placeholder='Nhập'
                        {...mutate_notification.form_notification.register('phone_shop', { required: 'Tên shop  không được để trống!' })} defaultValue={user?.check_email?.phone} />
                    {mutate_notification.errors.phone_shop && <span className='text-red-500 text-sm'>{mutate_notification.errors.phone_shop?.message}</span>}
                </div>
                <div className='flex flex-col gap-y-2 my-4'>
                    <label htmlFor="email_shop">Email</label>
                    <input className='px-3 py-2 rounded outline-1 text-sm' id='email_shop' type="text" placeholder='abc@gmail.com'
                        {...mutate_notification.form_notification.register('email_shop', { required: 'Tên shop  không được để trống!' })} defaultValue={user?.check_email?.email} />
                    {mutate_notification.errors.email_shop && <span className='text-red-500 text-sm'>{mutate_notification.errors.email_shop?.message}</span>}
                </div>
                <div className='flex flex-col gap-y-2 my-4'>
                    <label htmlFor="address_shop">Địa chỉ lấy hàng</label>
                    <textarea className='px-3 py-2 rounded outline-1 text-sm' id='address_shop' placeholder='Enter' cols={6}
                        {...mutate_notification.form_notification.register('address_shop', { required: 'Tên shop  không được để trống!' })} />
                    {mutate_notification.errors.address_shop && <span className='text-red-500 text-sm'>{mutate_notification.errors.address_shop?.message}</span>}
                </div>
                <div className='flex flex-col gap-y-2 my-4'>
                    <label htmlFor="note_shop">Ghi chú</label>
                    <textarea className='px-3 py-2 rounded outline-1 text-sm' id='note_shop' placeholder='Enter' cols={6}
                        {...mutate_notification.form_notification.register('note_shop')} defaultValue={' '}/>
                </div>
                <div className="flex items-center space-x-2 my-4">
                    <Checkbox id="terms" />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Khi đăng kí đăng bán sản phẩm trên sàn Store88 của chúng tôi, bạn phải chấp nhận các <Link href={'/'} className='underline'>điều khoản</Link> của chúng tôi đề ra nhằm đảm bảo
                        quyền lợi của người mua và người bán!
                    </label>
                </div>
                <Button>Gửi yêu cầu</Button>
            </form>
        </div>
    )
}
