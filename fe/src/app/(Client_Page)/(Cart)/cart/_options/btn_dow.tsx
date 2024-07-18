'use client';

import { Mutation_Cart } from "@/src/app/_lib/Tanstack_Query/Cart/mutation_Cart";
import Swal from "sweetalert2";

const Btn_dow = ({ id_props }: any) => {
  const { mutate } = Mutation_Cart('DOW')
  function dow_quantity(id: any) {
    if (id_props.quantity_item === 1) {
      Swal.fire({
        title: "Xác nhận xóa sản phẩm?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xác nhận!",
        cancelButtonText: 'Hủy'
      }).then((result) => {
        if (result.isConfirmed) {
          const items = {
            user_id: id_props?.id_user?._id,
            product_id: id,
            color: id_props.color,
            size_attribute: id_props.size_attribute
          }
          mutate(items)
          Swal.fire({
            title: "Xóa thành công!",
            icon: "success"
          });
        }
      });
    }
    if (id_props.quantity_item > 1) {
      const items = {
        user_id: id_props?.id_user?._id,
        product_id: id,
        color: id_props.color,
        size_attribute: id_props.size_attribute
      }
      mutate(items)
    }
  }
  return (
    <button type="button" onClick={() => dow_quantity(id_props.id_item)} className='border-none px-1.5 hover:scale-110 duration-200'>&#8722;</button>
  )
}

export default Btn_dow