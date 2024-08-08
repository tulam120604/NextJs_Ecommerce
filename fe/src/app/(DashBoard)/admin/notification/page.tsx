'use client';

import { Mutation_Auth } from '@/src/app/_lib/Tanstack_Query/Auth/auth_mutation';
import { Mutation_Notification } from '@/src/app/_lib/Tanstack_Query/Notification/Mutation_Notification';
import { Query_Notification } from '@/src/app/_lib/Tanstack_Query/Notification/Query_Notification';
import Loading_Dots from '@/src/app/Components/Loadings/Loading_Dots';
import { AlertDialog } from '@/src/app/Components/ui/alert-dialog';
import { AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/src/app/Components/ui/dialog/alert-dialog';
import { CircleCheck } from 'lucide-react';
import React from 'react'

export default function Page() {
    let user: any;
    if (typeof window !== 'undefined') {
        user = JSON.parse(localStorage.getItem('account') || '{}') ?? ''
    }
    const data = Query_Notification(user?.check_email?._id);
    const mutate_notification = Mutation_Notification('SEND');
    function sendMessage(item: any) {
        if (!item?.status_message) {
            const data_body = {
                id_item: item,
                sender_id: user?.check_email?._id,
            }
            mutate_notification.mutate(data_body);
        }
    }

    // granting premissionss
    const granting_premission = Mutation_Auth({
        action: 'GRANTING_PREMISSIONS'
    });

    function onSubmitGranting (id_sender : string | number) {
        granting_premission?.onSubmit(id_sender);
    }

    return (
        <div className='text-gray-100 py-4'>
            <strong className='text-lg'>Thông báo</strong>
            {
                granting_premission?.isLoading &&
                <div className='fixed bg-[#33333333] w-screen h-screen top-0 z-[2] left-0'>
                    <Loading_Dots />
                </div>
            }
            <div>
                <ul className="mt-4 space-y-2">
                    {
                        data?.data?.data_notification ?
                            (
                                data?.data?.data_notification?.map((item: any) => (
                                    <AlertDialog key={item?._id}>
                                        <AlertDialogTrigger asChild onClick={() => sendMessage(item)}>
                                            <li className='block h-full rounded-lg border border-gray-700 p-4 hover:border-gray-500 cursor-pointer *:flex *:justify-between'>
                                                <div>
                                                    <strong className="font-medium text-white">{item?.sender_id?.user_name}</strong>
                                                    {item.status_message &&
                                                        <span className='text-sm flex gap-x-2 items-center font-medium text-gray-300'><CircleCheck className='w-4 text-green-500' />Đã xem </span>
                                                    }
                                                </div>
                                                <div>
                                                    <div>
                                                        <p className="mt-1 text-sm font-medium text-gray-300">
                                                            Nội dung: {item?.notification_message}
                                                        </p>
                                                        {item?.notes &&
                                                            <p className="mt-1 text-sm font-medium text-gray-300">
                                                                Địa chỉ: {item?.notes}
                                                            </p>}
                                                    </div>

                                                    <p className="mt-1 text-sm font-medium text-gray-300">
                                                        {item?.createdAt?.slice(0, 10)}
                                                    </p>
                                                </div>
                                            </li>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className='bg-[#1F2936] border-none text-gray-200'>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Từ {item?.sender_id?.user_name}</AlertDialogTitle>
                                                <AlertDialogDescription className='!text-gray-200'>
                                                    {item?.notification_message}
                                                </AlertDialogDescription>
                                                {item?.notes &&
                                                    <AlertDialogDescription className='!text-gray-200'>
                                                        Địa chỉ: {item?.notes}
                                                    </AlertDialogDescription>
                                                }
                                            </AlertDialogHeader>
                                            <AlertDialogFooter className='flex !justify-between w-full items-end'>
                                                <AlertDialogDescription className='!text-gray-200'>- {item?.createdAt?.slice(0, 10)} -</AlertDialogDescription>
                                                <div className='flex gap-x-3'>
                                                    {
                                                        item?.notes &&
                                                        <AlertDialogCancel onClick={() => onSubmitGranting(item?.sender_id)} className='text-gray-100 border-none bg-green-600 hover:!bg-green-800 hover:!text-gray-200'>
                                                            Chấp nhận
                                                        </AlertDialogCancel>
                                                    }
                                                    <AlertDialogCancel className='text-gray-800'>Đóng</AlertDialogCancel>
                                                </div>

                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                ))
                            ) :
                            <span>Không có thông báo nào!</span>
                    }

                </ul>
            </div>
        </div>
    )
}
