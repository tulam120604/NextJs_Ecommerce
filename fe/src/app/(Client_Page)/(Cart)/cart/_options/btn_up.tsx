'use client';

import { Mutation_Cart } from "@/src/app/_lib/Tanstack_Query/Cart/mutation_Cart";
import Swal from "sweetalert2";

const Btn_up = ({ id_props }: any) => {
    // console.log(id_props)
    const { mutate } = Mutation_Cart('UP');


    function up_quantity(product: any) {
        if (product?.dataItems?.product_id?.attributes?.length > 0) {
            if (product?.dataItems?.quantity < product?.dataItems?.quantity_by_item) {
                const items = {
                    user_id: id_props?.id_user?._id,
                    product_id: product.id_item,
                    color: product.color,
                    size_attribute: product.size_attribute
                }
                mutate(items)
            }
            else {
                Swal.fire("Đã đạt tối đa số lượng còn lại của sản phẩm!");
            }
        }
        else {
            if (product?.dataItems?.quantity < product?.dataItems?.product_id?.stock) {
                const items = {
                    user_id: id_props?.id_user?._id,
                    product_id: product.id_item,
                    color: product.color,
                    size_attribute: product.size_attribute
                }
                mutate(items)
            }
            else {
                Swal.fire("Đã đạt tối đa số lượng còn lại của sản phẩm!");
            }
        }

    }
    return (
        <button type="button" onClick={() => up_quantity(id_props)} className='border-none px-1.5 hover:scale-110 duration-200'>&#43;</button>
    )
}

export default Btn_up