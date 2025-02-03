'use client'

import Link from 'next/link';
import React from 'react';
import { Badge } from '@/src/app/_Components/ui/badge';
import Alert_dialog from '../_components/alert_dialog';
import { List_Address, Mutation_Address } from '@/src/app/_lib/Query_APIs/Auth/Query_Address';
import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots';

export default function User_address({ _id_user }: { _id_user: string | number }) {
    const mutate_address = Mutation_Address('REMOVE_OR_UPDATE_DEFAULT_ADDRESS');
    const { data, isLoading } = List_Address(_id_user);

    return (
        <>
            {
                isLoading ? <Loading_Dots /> :
                    <div className='grid lg:grid-cols-2 lg:gap-x-10 gap-6'>
                        {data?.data && data?.data.length > 0 ?
                            data?.data?.map((item: any) => (
                                <div key={item?._id} className="rounded py-3 border border-gray-300 lg:flex justify-between px-4 gap-x-6">
                                    <div className="text-sm flex flex-col gap-y-2 mb-2">
                                        <span className="text-gray-700 sm:col-span-2">{item?.about_address?.user_name}</span>
                                        <span className="text-gray-700 sm:col-span-2">{item?.about_address?.phone}</span>
                                        <span className="text-gray-700 sm:col-span-2">{item?.about_address?.address + ', ' + item?.about_address?.provinces}</span>
                                    </div>
                                    <div className='flex flex-col lg:items-end gap-y-1'>
                                        <div>
                                            <Link href={''} className="hover:underline text-sky-500 text-sm mx-2">Cập nhật</Link>
                                            {!item?.status_address &&
                                                <Alert_dialog dataProps={{
                                                    id_user: _id_user,
                                                    id_address: item?._id,
                                                    remove_address: mutate_address?.mutate,
                                                    action: 'remove'
                                                }} />
                                            }
                                        </div>
                                        {(item?.status_address) ?
                                            <div>
                                                <Badge className='bg-green-500 hover:!bg-green-600 whitespace-nowrap'>Mặc định</Badge>
                                            </div> :
                                            <Alert_dialog dataProps={{
                                                id_user: _id_user,
                                                id_address: item?._id,
                                                change_default_address: mutate_address?.mutate
                                            }} />
                                        }
                                    </div>
                                </div>
                            )) :
                            <div className='text-center'>Trống</div>
                        }
                    </div>
            }
        </>

    )
}
