/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useEffect, useState } from 'react';
import Loading from '../../(DashBoard)/admin/list_products/loading';
import { Custome_Hooks } from '../../_lib/Custome_Hooks/MyForm';
import { Button } from '../ui/Tables/button';
import Link from 'next/link';
import Form_category from './form_category';


const MyForm: React.FC<any> = ({ mode }: any) => {
    const { dataToken, my_Form, submitForm, isLoading, loading, data_Category, routing, data_one_item } = Custome_Hooks({ mode });
    const [change_img, setChange_img] = useState();
    const [stock_quantity, setStock_quantity] = useState<boolean>(false)
    const [category_form, setCategory_form] = useState<boolean>(false)
    const [attributes, setAttribute] = useState<any>([{
        color_item: '',
        size_item: [{
            name_size: '',
            stock_item: '',
            price_attribute: 0
        }],
    }]);
    useEffect(() => {
        if (mode) {
            let data_attr_detail;
            if (data_one_item?.data?.attributes) {
                data_attr_detail = (data_one_item?.data?.attributes?.varriants);
            }
            setAttribute(data_attr_detail);
        }
    }, [mode, data_one_item?.data?.attributes]);

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
                price_attribute: 0
            }],
        }])
    }

    function add_Size_Attribute(i: any) {
        setStock_quantity(false);
        const add_size_attribute = [...attributes];
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
        routing.push('/admin/list_products')
    };

    function handle_category() {
        setCategory_form(!category_form);
    }

    function pushImage(e: any) {
        if (e.target.files[0]) {
            const render_img = new FileReader();
            render_img.onloadend = () => {
                setChange_img(render_img.result as any);
            }
            render_img.readAsDataURL(e.target.files[0])
        }
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
                    <Form_category />
                </>)
                }
            </div>
            <form onSubmit={my_Form.handleSubmit(submitForm)} className="bg-[#1F2936] w-full px-4 flex flex-col gap-y-5 py-4 rounded">
                <div className='flex flex-col text-gray-200 gap-y-3'>
                    <label htmlFor="short_name">Tên sản phẩm :</label>
                    <input type="text" id='short_name' {...my_Form.register('short_name')}
                        className='bg-[#1F2936] outline-none py-2 px-4 border border-black rounded' placeholder='Nhập tên sản phẩm ...' />
                </div>
                {isLoading ? <span className='text-gray-100'>Loa
                    ding ...</span> :
                    <div className='flex flex-col text-gray-200 gap-y-3'>
                        <div>
                            <label htmlFor="category_id">Danh mục sản phẩm : </label>
                            <select
                                id="category_id"
                                {...my_Form.register('category_id')}
                                className="bg-[#1F2936] outline-none py-2 px-4 border border-black rounded">
                                {
                                    data_Category?.data?.map((item: any) => (
                                        <option key={item?._id} value={item?._id}>{item?.category_name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>}

                <div className='flex flex-col text-gray-200 gap-y-3'>
                    <label htmlFor="feature_product">Ảnh sản phẩm :</label>
                    <div className='lg:flex'>
                        <img className='w-[100px] h-[100px]' src={data_one_item?.data?.feature_product ? data_one_item?.data?.feature_product : change_img} />
                        <input type="file" accept='image/*' id='feature_product'  {...my_Form.register('feature_product')}
                            className='bg-[#1F2936] outline-none py-2 px-4 rounded cursor-pointer' onChange={pushImage} />
                    </div>
                </div>

                {stock_quantity && <div className='flex flex-col text-gray-200 gap-y-3'>
                    <label htmlFor="price_product">Giá sản phẩm :</label>
                    <input type="text" id='price_product' {...my_Form.register('price_product')}
                        className='bg-[#1F2936] outline-none py-2 px-4 border border-black rounded' placeholder='Giá sản phẩm ...' />
                </div>}

                <div className='flex flex-col text-gray-200 gap-y-3'>
                    <label htmlFor="des_product">Mô tả sản phẩm :</label>
                    <textarea id='des_product' {...my_Form.register('des_product')}
                        className='bg-[#1F2936] outline-none py-2 px-4 border border-black rounded' placeholder='Mô tả sản phẩm ...' />
                </div>
                <div className='flex flex-col text-gray-200 gap-y-3'>
                    <label>Thuộc tính sản phẩm (nếu có):</label>
                    {attributes?.map((item: any, i: any) => (<>
                        <div key={i} className='flex item-center gap-x-4 w-full text-sm'>
                            <input
                                type="text"
                                {...my_Form.register(`attributes[${i}].color_item`, { required: true })}
                                className='bg-[#1F2936] outline-none py-2 px-4 border border-black rounded'
                                placeholder='Thông số 1 (nếu có)...' key={i}
                            />
                            <Button type='button' onClick={() => remove_size_Attribute(i)} className='w-20 hover:scale-105 duration-200'>Xóa</Button>
                            <Button type='button' onClick={() => add_Size_Attribute(i)} className='w-20 hover:scale-105 duration-200'>Thêm</Button>
                        </div>
                        {item?.size_item?.map((e: any, j: any) => (
                            <div key={i} className='flex item-center gap-x-4 text-sm'>
                                <input
                                    type="text"
                                    {...my_Form.register(`attributes[${i}].size_item[${j}].name_size`)}
                                    className='bg-[#1F2936] outline-none py-2 px-4 border border-black rounded'
                                    placeholder='Thông số 2 (nếu có) ...'
                                />
                                <input
                                    type="text"
                                    {...my_Form.register(`attributes[${i}].size_item[${j}].stock_item`, { required: true })}
                                    className='bg-[#1F2936] outline-none py-2 px-4 border border-black rounded'
                                    placeholder='Số lượng (bắt buộc)...'
                                />
                                <input
                                    type="text"
                                    {...my_Form.register(`attributes[${i}].size_item[${j}].price_attribute`, { required: true })}
                                    className='bg-[#1F2936] outline-none py-2 px-4 border border-black rounded'
                                    placeholder='Giá (bắt buộc)...'
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
                    <Button type='submit' className={`text-sm font-medium text-white ${mode ? 'bg-yellow-600 active:bg-yellow-500' : 'bg-indigo-600'}`}>{mode ? "Cập nhật" : "Thêm"}</Button>
                </div>
            </form>
        </section>
    </>)
}

export default MyForm