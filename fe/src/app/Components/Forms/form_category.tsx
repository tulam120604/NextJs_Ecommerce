'use client';

import React, { useEffect } from 'react'
import { Mutation_Category } from '../../_lib/Tanstack_Query/Items/mutation_category';
import { Button } from '../ui/Shadcn/button';
import Loading_animation from '../Loadings/Loading_animation';

const Form_category = () => {
    const mutate_category = Mutation_Category('ADD');
    let mode;

    function onAdd_category(data_form: any) {
        const formData = new FormData();
        formData.append('category_name', data_form.category_name);
        formData.append('category_img', (typeof data_form.category_img == 'string') ? data_form.category_img : data_form.category_img[0]);
        mutate_category.on_Submit_category(formData);
    }
    // category 
    return (
        <form onSubmit={mutate_category.form_category.handleSubmit(onAdd_category)} className='flex flex-col text-gray-200 gap-y-3 fixed bg-[#1F2936] z-[7] top-1/2 left-1/2 -translate-x-1/2 rounded  -translate-y-1/2 px-10 py-5 lg:px-20 lg:py-10'>
            <label htmlFor="category_name">Tên danh mục :</label>
            <input type="text" id='category_name' {...mutate_category.form_category.register('category_name')}
                className='bg-[#1F2936] outline-none py-2 px-4 border border-black rounded' placeholder='Nhập danh mục sản phẩm ...' />
            <div className='flex flex-col text-gray-200 gap-y-3'>
                <label htmlFor="feature_product">Ảnh sản phẩm :</label>
                <div className='lg:flex'>
                    <input type="file" accept='image/*' id='feature_product'  {...mutate_category.form_category.register('category_img')}
                        className='bg-[#1F2936] outline-none py-2 px-4 rounded cursor-pointer' />
                </div>
            </div>
            {mutate_category.status_category === 'call_error' && <span className='text-red-500'>Vui lòng kiểm tra lại!!</span>}
            <Button type='submit' className={`text-sm font-medium text-white ${mode ? 'bg-yellow-600 active:bg-yellow-500' : 'bg-indigo-600'}`}>{mode ? "Cập nhật" : "Thêm"} {mutate_category.isLoading && <Loading_animation />}</Button>
        </form>
    )
}

export default Form_category