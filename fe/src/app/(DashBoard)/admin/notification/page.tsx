'use client';

import { Mutation_Notification } from '@/src/app/_lib/Tanstack_Query/Notification/Mutation_Notification';
import { Query_Notification } from '@/src/app/_lib/Tanstack_Query/Notification/Query_Notification';
import { AlertDialog } from '@/src/app/Components/ui/alert-dialog';
import { AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/src/app/Components/ui/dialog/alert-dialog';
import { Button } from '@/src/app/Components/ui/Shadcn/button';
import { DataTable } from '@/src/app/Components/ui/Tables/data_table';
import { ColumnDef } from '@tanstack/react-table';
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

    const columns: ColumnDef<any>[] = [
        {
            cell: ({ row }) => (
                <span>{row?.original?.sender_id?.user_name}</span>
            ),
            header: 'Từ'
        },
        {
            accessorKey: 'notes',
            header: ''
        },
        {
            accessorKey: 'notification_message',
            header: 'Nội dung'
        },
        {
            cell: ({ row }) => (
                <span>{row?.original?.createdAt?.slice(0, 10)}</span>
            ),
            header: 'Ngày'
        },
        {
            cell: ({ row }) => (
                <div className="flex items-center space-x-2">
                    {
                        row?.original?.status_message ?
                            <span className='px-4'>Đã xem</span> :
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button className='bg-green-600 hover:!bg-green-800'>Chưa xem</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className='bg-[#1F2936] border-none *:!text-gray-200'>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Từ {row?.original?.sender_id?.user_name}</AlertDialogTitle>
                                        <AlertDialogDescription className='!text-gray-200'>
                                            {row?.original?.notification_message}
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        {
                                            row?.original?.notes &&
                                            <AlertDialogCancel className='text-gray-100 border-none bg-green-600 hover:!bg-green-800 hover:!text-gray-200'>Chấp nhận</AlertDialogCancel>
                                        }
                                        <AlertDialogCancel onClick={() => sendMessage(row?.original)} className='text-gray-800'>Đóng</AlertDialogCancel>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                    }
                </div>
            ),
            header: 'Trạng thái'
        }
    ]

    return (
        <div className='text-gray-100 py-4'>
            <strong className='text-lg'>Thông báo</strong>
            <div>
                {
                    data?.data?.data_notification ?
                        (
                            data?.data?.data_notification &&
                            <DataTable data={data?.data?.data_notification} columns={columns} />
                        )
                        :
                        <span>Không có thông báo nào!</span>
                }
            </div>
        </div>
    )
}
