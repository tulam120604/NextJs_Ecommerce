/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Loading from '../../(Admin_Page)/admin/list_products/loading';
import { Custome_Hooks } from '../../_lib/Custome_Hooks/MyForm';
import { Button } from '../ui/Tables/button';


const MyForm: React.FC<any> = ({ mode }: any) => {
    const { dataToken, my_Form, submitForm, isLoading, loading, data_Category, routing, data_one_item } = Custome_Hooks({ mode });
    const [attributes, setAttribute] = useState<any>([]);

    if (loading === 'dang_call') {
        return (<div className='grid place-items-center fixed z-[3] *:z-[4] w-screen h-screen top-0 left-0 bg-[#10182488]'>
            <Loading />
        </div>)
    }

    function add_Attribute() {
            setAttribute([...attributes, {
                color_item: '',
                size_item: '',
                stock_item: '',
            }])
    }

    function remove_Attribute(index: number) {
        const updatedAttributes = [...attributes];
        updatedAttributes.splice(index, 1);
        setAttribute(updatedAttributes);
    }

    if (loading === 'call_ok') {
        const text_alert = mode ? `Sản phẩm đã được sửa !` : "Đã thêm sản phẩm !"
        Swal.fire({
            position: "center",
            icon: "success",
            title: text_alert,
            showConfirmButton: false,
            timer: 800,
            heightAuto: false,
            backdrop: '#33333366',
            customClass: {
                popup: 'bg-transparent', // màu nền
                title: 'text-black' // màu chữ
            },
        });
        setTimeout(() => {
            routing.push('/admin/list_products')
        }, 810);
    };

    return (<>
        <section className="bg-[#101824] flex flex-col gap-y-6 py-6 rounded">
            <strong className="text-gray-200 lg:text-2xl">{mode ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}</strong>
            <form onSubmit={my_Form.handleSubmit(submitForm)} className="bg-[#1F2936] w-full px-4 flex flex-col gap-y-5 py-4 rounded">
                <div className='flex flex-col text-gray-200 gap-y-3'>
                    <label htmlFor="short_name">Tên sản phẩm :</label>
                    <input type="text" id='short_name' {...my_Form.register('short_name')}
                        className='bg-[#1F2936] outline-none py-2 px-4 border border-black rounded' placeholder='Nhập tên sản phẩm ...' />
                </div>

                <div className='flex flex-col text-gray-200 gap-y-3'>
                    <label htmlFor="feature_product">Ảnh sản phẩm :</label>
                    {mode ? <div className='lg:flex'>
                        <img className='w-[100px] h-[100px]' src={data_one_item?.data?.feature_product} />
                        <input type="file" accept='image/*' id='feature_product'  {...my_Form.register('feature_product')}
                            className='bg-[#1F2936] outline-none py-2 px-4 rounded cursor-pointer' />
                    </div>
                        : <input type="file" accept='image/*' id='feature_product'  {...my_Form.register('feature_product')}
                            className='bg-[#1F2936] outline-none py-2 px-4 border border-black rounded cursor-pointer' />
                    }
                </div>

                <div className='flex flex-col text-gray-200 gap-y-3'>
                    <label htmlFor="price_product">Giá sản phẩm :</label>
                    <input type="text" id='price_product' {...my_Form.register('price_product')}
                        className='bg-[#1F2936] outline-none py-2 px-4 border border-black rounded' placeholder='Giá sản phẩm ...' />
                </div>

                <div className='flex flex-col text-gray-200 gap-y-3'>
                    <label htmlFor="des_product">Mô tả sản phẩm :</label>
                    <textarea id='des_product' {...my_Form.register('des_product')}
                        className='bg-[#1F2936] outline-none py-2 px-4 border border-black rounded' placeholder='Mô tả sản phẩm ...' />
                </div>

                <div className='flex flex-col text-gray-200 gap-y-3'>
                    <label>Thuộc tính sản phẩm:</label>
                    {attributes?.map((e: any, i: any) => (
                        <div key={i} className='flex item-center gap-x-4'>
                            <input
                                type="text"
                                {...my_Form.register(`attributes[${i}].color_item`, { required: true })}
                                className='bg-[#1F2936] outline-none py-2 px-4 border border-black rounded'
                                placeholder='Màu sắc ...'
                            />
                            <input
                                type="text"
                                {...my_Form.register(`attributes[${i}].size_item`)}
                                className='bg-[#1F2936] outline-none py-2 px-4 border border-black rounded'
                                placeholder='Kích thước (nếu có) ...'
                            />
                            <input
                                type="text"
                                {...my_Form.register(`attributes[${i}].stock_item`, { required: true })}
                                className='bg-[#1F2936] outline-none py-2 px-4 border border-black rounded'
                                placeholder='Số lượng ...'
                            />
                            <Button type='button' onClick={() => remove_Attribute(i)} className='w-20 hover:scale-105 duration-200'>Xóa</Button>
                        </div>
                    ))}
                    <Button type='button' onClick={add_Attribute} className='w-20 hover:scale-105 duration-200'>Thêm</Button>
                </div>
                <div className='flex flex-col text-gray-200 gap-y-3'>
                    <label htmlFor="made_in">Xuất xứ sản phẩm :</label>
                    <input id='made_in' {...my_Form.register('made_in')}
                        className='bg-[#1F2936] outline-none py-2 px-4 border border-black rounded' placeholder='Xuất xứ sản phẩm ...' />
                </div>
                {isLoading ? <span className='text-gray-100'>Loading ...</span> :
                    <div className='flex flex-col text-gray-200 gap-y-3'>
                        <div>
                            <label htmlFor="category_id">Danh mục sản phẩm : </label>
                            <select
                                id="category_id"
                                {...my_Form.register('category_id')}
                                className="bg-[#1F2936] outline-none py-2 px-4 border border-black rounded"
                            >{
                                    data_Category?.map((item: any) => (
                                        <option key={item._id} value={item?._id}>{item?.category_name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>}
                {loading === 'call_error' && <span className='text-red-500'>Vui lòng kiểm tra lại!!</span>}
                <div className='w-full'>
                    <button type='submit' className={`rounded px-8 py-3 text-sm font-medium text-white transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring ${mode ? 'bg-yellow-600 active:bg-yellow-500' : 'bg-indigo-600 active:bg-indigo-500'}`}>{mode ? "Cập nhật" : "Thêm"}</button>
                </div>
            </form>
        </section>
    </>)
}

export default MyForm