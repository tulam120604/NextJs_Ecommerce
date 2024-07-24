'use client';

import { Get_Attribute_Items } from "@/src/app/_lib/Tanstack_Query/Attribute/Query_attribute";
import Btn_Add_Cart from "@/src/app/Components/Btn/Btn_Add_Cart";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { Mutation_Cart } from "../../_lib/Tanstack_Query/Cart/mutation_Cart";


const Quantity_Items_Detail = ({ data_Item_Detail }: any) => {
  const routing = useRouter();
  const { mutate } = Mutation_Cart('Add_Cart');
  const [color, setColor] = useState<any>();
  const [varriants_attribute, setVarriants_attribute] = useState<any>();
  const [size_attribute, setsize_attribute] = useState<any>();
  const [name_size, setName_size] = useState<any>();
  const [sizePropsCart, setSizePropsCart] = useState<any>();
  const [quantity_attributes, setQuantity_attributes] = useState<any>();
  const [quantity, set_quantity] = useState(1);
  const [price_attr, set_price_attr] = useState(0);
  const ref_validate_attribute = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (data_Item_Detail?.attribute?.varriants.length > 0) {
      setVarriants_attribute(data_Item_Detail?.attribute?.varriants)
    }
    else {
      setQuantity_attributes(data_Item_Detail?.stock);
    }
  }, []);

  function dow() {
    if (quantity > 1) {
      set_quantity(quantity - 1);
    }
  }
  function up() {
    if (varriants_attribute) {
      check_varriant()
    }
    else {
      change_quantity()
    }
  };

  // validate attribute
  function check_varriant() {
    for (let k of varriants_attribute) {
      for (let x of k.size_item) {
        if (k.color_item && (x.name_size !== '')) {
          (color && name_size) ? change_quantity() : validate_message()
        }
        else if (k.color_item) {
          (color) ? change_quantity() : validate_message()
        }
      }
    }
  }
  // --
  function validate_message() {
    ref_validate_attribute.current?.classList.add('block');
    ref_validate_attribute.current?.classList.remove('hidden');
  }
  // ---
  function change_quantity() {
    if (quantity < quantity_attributes) {
      set_quantity(quantity + 1);
    } else {
      Swal.fire("Đã đạt tối đa số lượng còn lại của sản phẩm!");
    }
  }

  // color
  const arr_color: any = [];
  (data_Item_Detail?.attribute && data_Item_Detail?.attribute?.varriants.map((item: any) => {
    if (!arr_color.includes(item?.color_item)) {
      arr_color.push(item?.color_item);
    }
  }));


  // attributes
  function handle_attributes(action: any, item: any) {
    switch (action) {
      case 'Color':
        varriants_attribute.filter((attr: any) => {
          ref_validate_attribute.current?.classList.remove('block');
          ref_validate_attribute.current?.classList.add('hidden');
          (attr.color_item == item) && (
            attr?.size_item.filter((s: any) => {
              (s.name_size) ? setsize_attribute(attr.size_item) : (setQuantity_attributes(s.stock_item), set_price_attr(s.price_attribute));
            })
          )
        });
        return setColor(item);
      case 'size_attribute':
        ref_validate_attribute.current?.classList.remove('block');
        ref_validate_attribute.current?.classList.add('hidden');
        for (let value of varriants_attribute) {
          if (value.color_item == color) {
            for (let i of value.size_item) {
              if (i.name_size == item) {
                setQuantity_attributes(i.stock_item);
                setSizePropsCart(i.name_size);
                set_price_attr(i.price_attribute)
              }
            }
          }
        }
        return setName_size(item);
      default: return
    }
  };
  // add cart 
  function add_To_Cart() {
    if (localStorage.getItem('account')) {
      const { check_email } = JSON.parse(localStorage.getItem('account') || '');
      const items = {
        user_id: check_email._id,
        product_id: data_Item_Detail?.id_item,
        color: color,
        quantity: quantity,
        size_attribute: sizePropsCart,
      };
      if (varriants_attribute) {
        for (let k of varriants_attribute) {
          for (let x of k.size_item) {
            if (k.color_item && (x.name_size !== '')) {
              if (color && name_size) {
                mutate(items);
                return;
              }
              else validate_message()
            }
            else if (k.color_item) {
              if (color) {
                mutate(items);
                return;
              }
              else validate_message()
            }
          }
        }
      }
      else {
        mutate(items)
      }
    } else {
      routing.push('/login');
    }
  }
  const price = data_Item_Detail.price * quantity;
  const price_item_attr = price_attr * quantity 

  // change price
  let min;
    let max;
    if (data_Item_Detail?.data_attribute) {
        min = data_Item_Detail?.data_attribute?.varriants[0]?.size_item[0]?.price_attribute;
        max = data_Item_Detail?.data_attribute?.varriants[0]?.size_item[0]?.price_attribute;
        for (let i of data_Item_Detail?.data_attribute?.varriants) {
            for (let j of i.size_item) {
                if (j.price_attribute < min) {
                    min = j.price_attribute;
                }
                if (j.price_attribute > max) {
                    max = j.price_attribute;
                }
            }
        }
    }
  return (<>

    <div className="flex items-center gap-x-2 items-end font-medium text-[#EB2606] lg:text-2xl lg:font-normal mb:text-base mb-4">
      {
        data_Item_Detail?.price ?
          <span className="text-[#EB2606]">{(data_Item_Detail?.price)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span> :
          <div className="flex items-center gap-x-1 line-clamp-2">
            {
              price_attr ? (<>
                <span className="text-[#EB2606]">{(price_attr)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
              </> ) : (<>
                <span className="text-[#EB2606]">{(min)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>-
                <span className="text-[#EB2606]">{(max)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
              </>)
            }
            
          </div>
      }
    </div>

    {data_Item_Detail?.attribute?.varriants && (
      <div className="flex flex-col gap-y-4 mb-1">
        <>
          <div className="flex items-center gap-x-4 *:relative *:border *:border-black *:px-2 *:py-1 *:text-sm *:rounded">
            {varriants_attribute?.map((item: any) => (
              <button className={`after:border-black hover:bg-black hover:text-white duration-200'}
                ${color == item?.color_item && 'text-white bg-black'}`}
                key={Math.random()} onClick={() => handle_attributes('Color', item?.color_item)}>{item?.color_item}</button>
            ))}
          </div>
          {Array.isArray(size_attribute) && <div className="flex items-center gap-x-4 *:relative *:border *:px-4 *:py-1 *:text-sm *:rounded *:border-black">
            {size_attribute?.map((item: any) => (
              <button className={`${(name_size == item?.name_size) && 'text-white bg-black'}`} key={Math.random()}
                onClick={() => handle_attributes('size_attribute', item?.name_size)}>{item?.name_size}</button>
            ))}
          </div>}
        </>
      </div>
    )}
    <span ref={ref_validate_attribute} className="hidden text-xs md:text-sm text-red-500">Vui lòng chọn!</span>

    {/* *** */}
    <div className={data_Item_Detail?.attribute?.varriants && "relative top-3"}>
      <div className="my-5 flex lg:flex-row mb:flex-col lg:gap-y-0 gap-y-[17px] gap-x-8 lg:items-center mb:items-start">
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
      <div className="flex items-center font-medium lg:text-2xl lg:font-normal mb:text-base flex items-center lg:gap-x-3 my-4 mb:gap-x-2">
        <span className="lg:text-xl">Tạm tính :</span>
        <span className="text-[#EB2606]">{(price ? price : price_item_attr)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
      </div>
      {/* add cart */}
      <div className="flex items-center gap-x-5 mt-4 font-medium lg:text-base mb:text-sm *:duration-300">
        <button onClick={add_To_Cart} className="bg-black hover:bg-white hover:text-black border border-black duration-200 lg:w-[128px] lg:h-[40px] w-[100px] h-[30px] grid place-items-center rounded-md text-xs lg:text-sm text-white">
          Thêm vào giỏ
        </button>
        {/* <Btn_Add_Cart data_Btn={{ id_item: data_Item_Detail?.id_item, color_item: color, size_attribute_item: sizePropsCart, quantity_item_add: quantity, data_attribute: varriants_attribute }} /> */}
        {/* add cart */}
        <button className="bg-black hover:bg-white hover:text-black border border-black duration-200 lg:w-[128px] lg:h-[40px] w-[100px] h-[30px] grid place-items-center rounded-md text-xs lg:text-sm text-white">
          Thanh toán
        </button>
      </div>
    </div>
  </>)
}

export default Quantity_Items_Detail