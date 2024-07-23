/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Loading from '../../(Admin_Page)/admin/list_products/loading';
import { Custome_Hooks } from '../../_lib/Custome_Hooks/MyForm';
import { Button } from '../ui/Tables/button';
import Link from 'next/link';
import Form_category from './form_category';


const MyForm: React.FC<any> = ({ mode }: any) => {
    const { dataToken, my_Form, submitForm, isLoading, loading, data_Category, routing, data_one_item } = Custome_Hooks({ mode });
    const [stock_quantity, setStock_quantity] = useState<boolean>(false)
    const [category_form, setCategory_form] = useState<boolean>(false)
    const [attributes, setAttribute] = useState<any>([{
        color_item: '',
        size_item: [{
            name_size: '',
            stock_item: '',
        }],
    }]);


    if (loading === 'dang_call') {
        return (<div className='grid place-items-center fixed z-[3] *:z-[4] w-screen h-screen top-0 left-0 bg-[#10182488]'>
            <Loading />
        </div>)
    }

    // stock_item: '',

    function add_Attribute() {
        setStock_quantity(false);
        setAttribute([...attributes, {
            color_item: '',
            size_item: [{
                name_size: '',
                stock_item: '',
            }],
        }])
    }

    function add_Size_Attribute(i: any) {
        setStock_quantity(false);
        const add_size_attribute = [...attributes]
        add_size_attribute[i].size_item.push({
            name_size: '',
            stock_item: '',
        })
        setAttribute(add_size_attribute)
    }

    function remove_Attribute(index: number) {
        const updatedAttributes = [...attributes];
        updatedAttributes.splice(index, 1);
        setAttribute(updatedAttributes);
        if (attributes.length < 2) {
            setStock_quantity(true);
        } else {
            setStock_quantity(false);
        }
    }

    function remove_size_Attribute(index: number) {
        const remove_size_Attributes = [...attributes];
        remove_size_Attributes[index].size_item.splice(index, 1);
        setAttribute(remove_size_Attributes);
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

    function handle_category() {
        setCategory_form(!category_form);
    }



    return (<>
        <section className="bg-[#101824] flex flex-col gap-y-6 py-6 rounded">
            <div className='flex items-center justify-between'>
                <strong className="text-gray-200 lg:text-2xl">{mode ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}</strong>
                <Link className='text-white hover:text-gray-200 hover:underline' href={'/admin/list_products'}>Quay lại</Link>
            </div>
            <div className='relative'>
                <button onClick={handle_category} type='button' className="border-none text-gray-100 h-full px-5 py-2.5 rounded bg-black hover:bg-gray-800 duration-300">Thêm danh mục+</button>
                {category_form && (<>
                    <div onClick={handle_category} className='fixed w-screen h-screen bg-[#00000066] top-0 z-[6] left-0'></div>
                    <Form_category/>
                </>)
                }
            </div>
            <form onSubmit={my_Form.handleSubmit(submitForm)} className="bg-[#1F2936] w-full px-4 flex flex-col gap-y-5 py-4 rounded">
                <div className='flex flex-col text-gray-200 gap-y-3'>
                    <label htmlFor="short_name">Tên sản phẩm :</label>
                    <input type="text" id='short_name' {...my_Form.register('short_name')}
                        className='bg-[#1F2936] outline-none py-2 px-4 border border-black rounded' placeholder='Nhập tên sản phẩm ...' />
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
                                    data_Category?.data?.map((item: any) => (
                                        <option key={item._id + item?.category_name} value={item?._id}>{item?.category_name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>}

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

                {mode && console.log(attributes)}

                <div className='flex flex-col text-gray-200 gap-y-3'>
                    <label>Thuộc tính sản phẩm (nếu có):</label>
                    {attributes?.map((item: any, i: any) => (<>
                        <div key={i} className='flex item-center gap-x-4 w-full'>
                            <input
                                type="text"
                                {...my_Form.register(`attributes[${i}].color_item`, { required: true })}
                                className='bg-[#1F2936] outline-none py-2 px-4 border border-black rounded'
                                placeholder='Màu sắc (nếu có)...' key={i}
                            />
                            <Button type='button' onClick={() => remove_size_Attribute(i)} className='w-20 hover:scale-105 duration-200'>Xóa</Button>
                            <Button type='button' onClick={() => add_Size_Attribute(i)} className='w-20 hover:scale-105 duration-200'>Thêm</Button>
                        </div>
                        {item?.size_item?.map((e: any, j: any) => (
                            <div key={i} className='flex item-center gap-x-4'>
                                <input
                                    type="text"
                                    {...my_Form.register(`attributes[${i}].size_item[${j}].name_size`)}
                                    className='bg-[#1F2936] outline-none py-2 px-4 border border-black rounded'
                                    placeholder='Kích thước ...'
                                />
                                <input
                                    type="text"
                                    {...my_Form.register(`attributes[${i}].size_item[${j}].stock_item`, { required: true })}
                                    className='bg-[#1F2936] outline-none py-2 px-4 border border-black rounded'
                                    placeholder='Số lượng ...'
                                />
                            </div>
                        ))}
                        <Button type='button' onClick={() => remove_Attribute(i)} className='w-20 hover:scale-105 duration-200'>Xóa</Button>
                    </>))}
                    <Button type='button' onClick={add_Attribute} className='w-20 hover:scale-105 duration-200'>Thêm</Button>
                </div>
                {stock_quantity && <div className='text-white flex flex-col gap-y-3'>
                    <label>Số lượng :</label>
                    <input
                        type="text"
                        {...my_Form.register(`stock`)}
                        className='bg-[#1F2936] outline-none py-2 px-4 border border-black rounded'
                        placeholder='Số lượng ...'
                    />
                </div>}
                <div className='flex flex-col text-gray-200 gap-y-3'>
                    <label htmlFor="made_in">Xuất xứ sản phẩm :</label>
                    <input id='made_in' {...my_Form.register('made_in')}
                        className='bg-[#1F2936] outline-none py-2 px-4 border border-black rounded' placeholder='Xuất xứ sản phẩm ...' />
                </div>
                {loading === 'call_error' && <span className='text-red-500'>Vui lòng kiểm tra lại!!</span>}
                <div className='w-full'>
                    <button type='submit' className={`rounded px-8 py-3 text-sm font-medium text-white transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring ${mode ? 'bg-yellow-600 active:bg-yellow-500' : 'bg-indigo-600 active:bg-indigo-500'}`}>{mode ? "Cập nhật" : "Thêm"}</button>
                </div>
            </form>
        </section>
    </>)
}

export default MyForm