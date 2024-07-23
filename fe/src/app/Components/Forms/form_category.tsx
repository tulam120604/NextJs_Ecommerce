import React from 'react'
import { Mutation_Category } from '../../_lib/Tanstack_Query/Items/mutation_category';

const Form_category = () => {
    let mode;

    // category 
    const mutate_category = Mutation_Category('ADD');
    return (
        <form onSubmit={mutate_category.form_category.handleSubmit(mutate_category.on_Submit_category)} className='flex flex-col text-gray-200 gap-y-3 fixed bg-[#1F2936] z-[7] top-1/2 left-1/2 -translate-x-1/2 rounded  -translate-y-1/2 px-10 py-5 lg:px-20 lg:py-10'>
            <label htmlFor="category_name">Tên danh mục :</label>
            <input type="text" id='category_name' {...mutate_category.form_category.register('category_name')}
                className='bg-[#1F2936] outline-none py-2 px-4 border border-black rounded' placeholder='Nhập danh mục sản phẩm ...' />
            {mutate_category.status_category === 'call_error' && <span className='text-red-500'>Vui lòng kiểm tra lại!!</span>}
            <button type='submit' className={`rounded px-8 py-3 text-sm font-medium text-white transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring ${mode ? 'bg-yellow-600 active:bg-yellow-500' : 'bg-indigo-600 active:bg-indigo-500'}`}>{mode ? "Cập nhật" : "Thêm"}</button>
        </form>
    )
}

export default Form_category