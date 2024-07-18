import React from 'react'
import Swal from 'sweetalert2';

const Confirm_Alert = (text? : any) => {
  return (
    Swal.fire({
        title: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xác nhận!",
        cancelButtonText: 'Hủy'
    })
  )
}

export default Confirm_Alert