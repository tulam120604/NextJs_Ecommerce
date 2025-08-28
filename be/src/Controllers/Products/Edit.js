import Products from "../../Model/Items/Products.js";
import { StatusCodes } from "http-status-codes";
import { validateProducts } from "../../Validates/Products.js";
import Variant from "../../Model/Items/Variant.js";

// edit all field
export async function edit_Product(req, res) {
  try {
    const {
      short_name,
      price_product,
      seller,
      des_product,
      category_id,
      stock,
      made_in,
      gallery,
      variant,
    } = req?.body;
    const id_product = req?.params?.id;
    const product = await Products.findById(id_product);
    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: true,
        message: "Không có thông tin sản phẩm này!",
      });
    }
    const payload = {
      short_name,
      seller,
      price_product,
      des_product,
      category_id,
      stock,
      made_in,
      gallery,
      variant,
    };
    const { error } = validateProducts.validate(payload, {
      abortEarly: false,
    });
    if (error) {
      const message = error.details.map((e) => e.message);
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: true,
        message,
      });
    }

    // const check_name = await Products.findOne({ short_name });
    // if (check_name) {
    //     return res.status(StatusCodes.BAD_REQUEST).json({
    //         message: 'Ten san pham da ton tai!'
    //     })
    // };
    const data = await Products.findByIdAndUpdate(id_product, payload, {
      new: true,
    });
    return res.status(StatusCodes.OK).json({
      message: "Đã cập nhật lại sản phẩm!",
      error: false,
      data,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: true,
      message: error.message || 500,
    });
  }
}

// cap nhat so luong san pham khi mua hang
export async function update_quantity_item(data_items_order) {
  let total_quantity_sales = 0;
  for (let i of data_items_order) {
    const data_product = await Products.find({ _id: i.product_id._id });
    if (i.product_id.variant) {
      const data_attr = await Variant.find({ _id: i.product_id.variant._id });
      for (let j of data_attr) {
        for (let k of j.variants) {
          if (k.attribute == i.name_varriant) {
            for (let x of k.value_variants) {
              if (x.name_variant) {
                if (x.name_variant == i.value_varriant) {
                  x.stock_variant = x.stock_variant - i.quantity;
                  x.sales_item += i.quantity;
                  // gộp hết số lượng bán ra ở biến thể vào số lượng bán ra chung để thống kê
                  total_quantity_sales += i.quantity;
                }
              } else {
                x.stock_variant = x.stock_variant - i.quantity;
                x.sales_item += i.quantity;
                // gộp hết số lượng bán ra ở biến thể vào số lượng bán ra chung để thống kê
                total_quantity_sales += i.quantity;
              }
            }
          }
        }
        await j.save();
      }
    }
    for (let a of data_product) {
      a.stock = a.stock - i.quantity;
      a.sale_quantity += i.quantity;
      await a.save();
    }
  }
}
