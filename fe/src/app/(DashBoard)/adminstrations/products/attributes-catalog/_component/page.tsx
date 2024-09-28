'use client'

import Loading_Dots from '@/src/app/_Components/Loadings/Loading_Dots'
import useFormAttributeCatalog from '@/src/app/_lib/Custome_Hooks/AttributeCatalog_Form';
import { SquarePen } from 'lucide-react'
import React from 'react'

export default function List_data_attribute_catalog({ dataProps }: any) {

    const { isLoading, isError, onSubmit, errorsForm, form_attributeCatalog } = useFormAttributeCatalog('UPDATE');

    return (
        <div className='border rounded bg-[#F6F6F6]'>
            <div className='grid grid-cols-[50px_260px_auto_150px] gap-2 py-2 px-4 border-b *:text-sm'>
                <div></div>
                <span>Tên</span>
                <span>Loại</span>
                <span>Thao tác</span>
            </div>
            {
                dataProps?.loadingAttributeCatalog && <div className='w-screen h-screen grid place-items-center'>
                    <Loading_Dots />
                </div>
            }
            {
                dataProps?.arr_attributeCatalog?.map((item: any) => (
                    <div key={item?.key} className='grid grid-cols-[50px_260px_auto_150px] items-center gap-2 my-4 py-2 px-4 *:text-sm'>
                        <div style={{ backgroundColor: item?.hex_color }} className='w-6 h-6 rounded'></div>
                        <form className='flex items-center gap-2'>
                            <input type="text" placeholder='Enter' defaultValue={item?.name_varriant}
                                className='outline-none border rounded text-sm px-2 py-1 my-2 w-[180px]'
                                onChange={dataProps?.handleEdit} />
                            <button className='hidden' ref={dataProps?.btnEditNameVarriant}>
                                <SquarePen className='h-5 hover:scale-105 duration-200' />
                            </button>
                        </form>
                        <span>{item?.type_varriant}</span>
                        <div>
                            <button onClick={() => dataProps?.clearAttributeCatalog(item?.key)} className='text-rose-500 text-start'>Xóa</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
