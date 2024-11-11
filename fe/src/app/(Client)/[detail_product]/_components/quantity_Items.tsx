'use client';

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { Mutation_Cart } from "../../../_lib/Tanstack_Query/Cart/mutation_Cart";
import { Minus, Plus } from "lucide-react";
import { io } from 'socket.io-client';
import { useToast } from "@/src/app/_Components/ui/use-toast";
import useStoreZustand from "@/src/app/Zustand/Store";



const Quantity_Items_Detail = ({ data_Item_Detail }: any) => {
  const routing = useRouter();
  const { toast } = useToast();
  const { setVisible } = useStoreZustand();
  useEffect(() => {
    const socket = io('http://localhost:8888')
    socket.on('res_message_delete_item', (data: any) => {
      toast({
        title: "Thông báo!",
        description: `Rất tiếc, sản phẩm ${data?.name_item} không còn tồn tại!`,
        className: 'border border-gray-800',
        duration: 3000
      });
      const timeOut = setTimeout(() => {
        routing.push('/')
      }, 2000);
      return () => {
        clearTimeout(timeOut)
      }
    })
  }, [routing]);

  const { mutate, isLoading } = Mutation_Cart('Add_Cart');
  const [color, setColor] = useState<any>();
  let [varriants_attribute, setVarriants_attribute] = useState<any>();
  const [size_attribute, setsize_attribute] = useState<any>();
  const [name_size, setName_size] = useState<any>();
  const [sizePropsCart, setSizePropsCart] = useState<any>();
  const [quantity_attributes, setQuantity_attributes] = useState<any>();
  const [quantity, set_quantity] = useState(1);
  const [price_attr, set_price_attr] = useState(0);
  const ref_validate_attribute = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (data_Item_Detail) {
      if (data_Item_Detail?.variant?.variants.length > 0) {
        const a: any = [];
        data_Item_Detail?.variant?.variants?.map((item: any) => {
          item?.value_variants.filter((data_attr: any) => {
            if (data_attr?.stock_variant > 0) {
              a.push(item);
            }
          })
        })
        setVarriants_attribute(a)
      }
      else {
        setQuantity_attributes(data_Item_Detail?.stock);
      }
    } else {
      routing.push('/')
    }
  }, []);

  // up, dow quantity
  function change_options_quantity(action: string) {
    switch (action) {
      case 'dow':
        if (quantity > 1) {
          set_quantity(quantity - 1);
        }
        return;
      case 'up':
        if (!quantity_attributes) {
          validate_message()
        }
        else {
          change_quantity()
        }
        return;
      default: return
    }
  }

  // validate attribute
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
  (data_Item_Detail?.attributes && data_Item_Detail?.attributes?.varriants.map((item: any) => {
    if (!arr_color.includes(item?.color_item)) {
      arr_color.push(item?.color_item);
    }
  }));


  // attributes
  function handle_attributes(action: any, item: any) {
    switch (action) {
      case 'Color':
        setName_size('');
        setQuantity_attributes('');
        set_quantity(1);
        varriants_attribute.filter((attr: any) => {
          ref_validate_attribute.current?.classList.remove('block');
          ref_validate_attribute.current?.classList.add('hidden');
          (attr.attribute == item) && (
            attr?.value_variants.filter((s: any) => {
              (s.name_variant && (s.name_variant.trim() !== '')) ? setsize_attribute(attr.name_variant) :
                (setQuantity_attributes(s.stock_variant), set_price_attr(s.price_variant), setsize_attribute(''));
            })
          )
        });
        return setColor(item);
      case 'size_attribute':
        setQuantity_attributes('');
        set_quantity(1);
        ref_validate_attribute.current?.classList.remove('block');
        ref_validate_attribute.current?.classList.add('hidden');
        const check_attribute = varriants_attribute?.find((value: any) => value?.attribute == color);
        const check_values = check_attribute?.size_item?.find((value: any) => value?.value_variants == item);
        setQuantity_attributes(check_values?.stock_variant);
        setSizePropsCart(check_values?.name_variant);
        set_price_attr(check_values?.price_variant)
        return setName_size(item);
      default: return
    }
  };
  // add cart 
  function add_To_Cart_or_Checkout_order(action: string) {
    if (localStorage.getItem('account')) {
      const { check_email } = JSON.parse(localStorage.getItem('account') || '');
      let items: any = {
        user_id: check_email._id,
        product_id: data_Item_Detail?._id,
        price_item_attr: price_attr,
        color: color,
        quantity: quantity,
        size_attribute: sizePropsCart,
      };
      if (action === 'check_out') {
        items = {
          ...items,
          status_checked: true
        }
      }
      if (quantity_attributes && quantity > 0) {
        setVisible(data_Item_Detail?.gallery[0]);
        mutate(items);
        if (!isLoading && action === 'check_out') {
          routing.push('/cart')
        }
      }
      else validate_message()
    } else {
      routing.push('/login');
    }
  }
  const price = data_Item_Detail?.price_product * quantity;
  const price_item_attr = price_attr * quantity

  // change price
  let min;
  let max;
  if (varriants_attribute) {
    const check_attribute = new Set();
    min = varriants_attribute[0]?.value_variants[0]?.price_variant;
    max = varriants_attribute[0]?.value_variants[0]?.price_variant;
    varriants_attribute = varriants_attribute?.filter((item: any) => {
      if (check_attribute.has(item?.attribute)) {
        return false
      } else {
        check_attribute.add(item.attribute);
        return true
      }
    })
    for (let i of varriants_attribute) {
      for (let j of i.value_variants) {
        if (j.price_variant < min) {
          min = j.price_variant;
        }
        if (j.price_variant > max) {
          max = j.price_variant;
        }
      }
    }
  }
  return (<div>
    <div className="flex gap-x-2 items-end font-medium text-[#EB2606] lg:text-2xl lg:font-normal mb:text-base mb-4">
      {
        data_Item_Detail?.price_variant ?
          <span className="text-[#EB2606]">{(data_Item_Detail?.price_variant)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span> :
          <div className="flex items-center gap-x-1 line-clamp-2">
            {
              price_attr ? (<>
                <span className="text-[#EB2606]">{(price_attr)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
              </>) : (
                (min === max) ? (<>
                  <span className="text-[#EB2606]">{(max)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                </>) : (<>
                  <span className="text-[#EB2606]">{(min)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>-
                  <span className="text-[#EB2606]">{(max)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                </>)
              )
            }
          </div>
      }
    </div>
    {data_Item_Detail?.variant?.variants && (
      <div className="flex flex-col gap-y-4 mb-1">
        <>
          <div className="flex items-center gap-x-4 *:relative *:border *:border-black *:px-2 *:py-1 *:text-sm *:rounded">
            {varriants_attribute?.map((item: any) => (
              (item?.attribute !== '' || item?.attribute) && (<>
                <button className={`after:border-black hover:bg-black hover:text-white duration-200 border'}
                ${color == item?.attribute && 'text-white bg-black'}`}
                  key={Math.random()} onClick={() => handle_attributes('Color', item?.attribute)}>{item?.attribute}
                </button>
              </>)))}
          </div>
          {Array.isArray(size_attribute) && <div className="flex items-center gap-x-4 *:relative *:border *:px-4 *:py-1 *:text-sm *:rounded *:border-black">
            {size_attribute?.map((item: any) => (
              <button className={`${(name_size == item?.name_variant) && 'text-white bg-black'}`} key={Math.random()}
                onClick={() => handle_attributes('size_attribute', item?.name_variant)}>{item?.name_variant}</button>
            ))}
          </div>}
        </>
      </div>
    )}
    <span ref={ref_validate_attribute} className="hidden text-xs md:text-sm text-red-500">Vui lòng chọn!</span>
    {/* *** */}
    <div className={data_Item_Detail?.variant?.variants && "relative top-3"}>
      <div className="my-5 flex lg:flex-row mb:flex-col lg:gap-y-0 gap-y-[17px] gap-x-8 lg:items-center mb:items-start">
        {/* up , dow quantity */}
        <div className="border lg:py-2.5 mb:py-1 mb:px-2 *:text-xs flex items-center gap-x-3 rounded">
          <div className="flex items-center *:w-9 *:h-9 gap-x-3 *:grid *:place-items-center">
            <button className="hover:*:bg-gray-100 *:rounded" onClick={() => change_options_quantity('dow')}>
              <Minus className="w-5" />
            </button>
            <input className="bg-[#F4F4F4] rounded text-center" value={quantity}
              onChange={(e: any) => (quantity_attributes && ((+e?.target?.value <= quantity_attributes && quantity > 0) && set_quantity(+e?.target?.value)))} />
            <button className="hover:*:bg-gray-100 *:rounded" onClick={() => change_options_quantity('up')}>
              <Plus className="w-5" />
            </button>
          </div>
          {
            quantity_attributes &&
            <span className="lg:tracking-[0.5px] border-l pl-4 border-black">Còn lại {quantity_attributes} sản phẩm</span>
          }
        </div>
      </div>
      <div className="flex items-center font-medium lg:text-2xl lg:font-normal mb:text-base lg:gap-x-3 my-4 mb:gap-x-2">
        <span className="lg:text-xl">Tạm tính :</span>
        <span className="text-[#EB2606]">{(price ? price : price_item_attr)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
      </div>
      {/* add cart */}
      <div className="flex items-center gap-x-5 mt-4 font-medium lg:text-base mb:text-sm *:duration-300">
        <button onClick={() => add_To_Cart_or_Checkout_order('add_cart')} className="bg-gray-900 hover:bg-white hover:text-black border border-black duration-200 lg:w-[128px] lg:h-[40px] w-[100px] h-[30px] grid place-items-center rounded-md text-xs lg:text-sm text-white">
          Thêm vào giỏ
        </button>
        {/* <Btn_Add_Cart data_Btn={{ id_item: data_Item_Detail?.id_item, color_item: color, size_attribute_item: sizePropsCart, quantity_item_add: quantity, data_attribute: varriants_attribute }} /> */}
        {/* add cart */}
        <button onClick={() => add_To_Cart_or_Checkout_order('check_out')} className="bg-gray-900 hover:bg-white hover:text-black border border-black duration-200 lg:w-[128px] lg:h-[40px] w-[100px] h-[30px] grid place-items-center rounded-md text-xs lg:text-sm text-white">
          Thanh toán
        </button>
      </div>
    </div>
  </div>)
}

export default Quantity_Items_Detail