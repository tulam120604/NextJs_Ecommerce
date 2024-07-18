'use client';

import Config_color from "@/src/app/_lib/Config/Config_color";
import { Get_Attribute_Items } from "@/src/app/_lib/Tanstack_Query/Attribute/Query_attribute";
import Btn_Add_Cart from "@/src/app/Components/Btn/Btn_Add_Cart";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


const Quantity_Items_Detail = ({ data_Item_Detail }: any) => {
  const [color, setColor] = useState<any>();
  const [size_attribute, setsize_attribute] = useState<any>();
  const [quantity_attributes, setQuantity_attributes] = useState<any>();
  const [quantity, set_quantity] = useState(1);
  const { data, isLoading } = Get_Attribute_Items(data_Item_Detail?.id_item);
  function dow() {
    if (quantity > 1) {
      set_quantity(quantity - 1);
    }
  }
  function up() {
    if (quantity < quantity_attributes) {
      set_quantity(quantity + 1);
    } else {
      Swal.fire("Đã đạt tối đa số lượng còn lại của sản phẩm!");
    }
  };
  // color
  const arr_color: any = [];
  (data && data[0]?.values?.map((item: any) => {
    if (!arr_color.includes(item?.color_item)) {
      arr_color.push(item?.color_item);
    }
  }));
  // size
  const arr_size: any = [];
  (data && data[0]?.values?.map((item: any) => {
    if (!arr_size.includes(item?.size_item)) {
      arr_size.push(item?.size_item);
    }
  }));

  // attributes
  function handle_attributes(action: any, item: any) {
    switch (action) {
      case 'Color':
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i]?.values.length; j++) {
            if (data[i]?.values[j]?.color_item == item) {
              setQuantity_attributes(data[i]?.values[j]?.stock_item)
            }
          }
        }
        return setColor(item);
      case 'size_attribute':
        for (let i = 0; i < data.length; i++) {
          if (data[i]?.size_item === item) {
            setQuantity_attributes(data[i]?.stock_item)
          }
        }
        return setsize_attribute(item);
      default: return
    }
  }

  const price = data_Item_Detail.price * quantity;
  return (<>
    {data && (
      <div className="flex flex-col gap-y-4">
        {isLoading ? 'Loading...' : (<>
          <div className="flex items-center gap-x-4 *:relative *:border *:w-8 *:h-8 *:text-sm *:rounded-[50%] *:after:absolute *:after:w-4  *:after:h-2 
          *:after:border-l-2  *:after:border-b-2  *:after:rotate-[-45deg] *:after:left-1/4  *:after:top-1/4">
            {arr_color.map((item: any) => (
              <button className={`${Config_color(item)} after:border-black'}
                ${color == item ? 'after:block' : 'after:hidden'} after:border-white`}
                key={Math.random()} onClick={() => handle_attributes('Color', item)}></button>
            ))}
          </div>
          <div className="flex items-center gap-x-4 *:relative *:border *:px-4 *:py-1 *:text-sm *:rounded *:border-black">
            {arr_size.map((item: any) => (
              <button className={`${size_attribute == item ? 'bg-gray-800 text-white' : 'bg-white text-black'}`} key={Math.random()}
                onClick={() => handle_attributes('size_attribute', item)}>{item}</button>
            ))}
          </div>
        </>)}
      </div>
    )}

    {/* *** */}
    <div className="py-5 flex lg:flex-row mb:flex-col lg:gap-y-0 gap-y-[17px] gap-x-8 lg:items-center mb:items-start">
      {/* up , dow quantity */}
      <div className="border lg:py-2.5 lg:pr-6  mb:py-1 mb:pl-2 mb:pr-[18px] *:text-xs flex items-center gap-x-3 rounded">
        <div className="flex items-center *:w-9 *:h-9 gap-x-1 *:grid *:place-items-center">
          <button onClick={dow}>
            <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus">
              <path d="M5 12h14" />
            </svg>
          </button>
          <div className="bg-[#F4F4F4]">{quantity}</div>
          <button onClick={up}>
            <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus">
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </button>
        </div>
        <span className="lg:tracking-[0.5px] border-l pl-4 border-black">Còn lại {quantity_attributes} sản phẩm</span>
      </div>
    </div>
    <span className="font-medium text-[#EB2606] lg:text-2xl lg:font-normal lg:tracking-[0.7px] mb:text-base flex items-center lg:gap-x-3 lg:mt-0.5 mb:gap-x-2">{price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
    {/* add cart */}
    <div className="flex items-center gap-x-5 my-4 font-medium lg:text-base mb:text-sm *:duration-300">
      <Btn_Add_Cart data_Btn={{ id_item: data_Item_Detail?.id_item, color_item: color, size_attribute_item: size_attribute, quantity_item_add: quantity }} />
      {/* add cart */}
      <button className="bg-black hover:scale-105 duration-200 w-[128px] h-[40px] grid place-items-center rounded-md text-sm text-white">
        Thanh toán
      </button>
    </div>
  </>)
}

export default Quantity_Items_Detail