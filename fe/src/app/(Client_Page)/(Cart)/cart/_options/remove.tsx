import { Mutation_Cart } from '@/src/app/_lib/Tanstack_Query/Cart/mutation_Cart';
import Trash_Icon from '@/src/app/Components/Icons/trash';
import React from 'react'
import Swal from 'sweetalert2';

const Remove_Item_Cart = ({ id_props }: any) => {

    const { mutate } = Mutation_Cart('REMOVE')
  function remove_item_cart(id_item: any) {
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
            product_id: id_item
        }
        mutate(items)
        Swal.fire({
          title: "Xóa thành công!",
          icon: "success"
        });
      }
    });
  };

    return (
        <button type='button' onClick={() => remove_item_cart(id_props.item)}>
          <Trash_Icon/>
        </button>
    )
}

export default Remove_Item_Cart