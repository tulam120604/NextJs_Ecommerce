import Products from "../../Model/Items/Products.js";
import { StatusCodes } from "http-status-codes";
import { validateProducts } from "../../Validates/Products.js";
import Variant from "../../Model/Items/Variant.js";
import { create_variant } from "./Create_variant.js";
import { upload_img } from "../../middleware/upload.js";

// edit all field
export async function edit_Product(req, res) {
  try {
    const { short_name } = req.body;
    const check_id = await Products.findById(req.params.id);
    const id_user = req.user.id;
    if (!check_id) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "No data",
      });
    }
    const { error } = validateProducts.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const message = error.details.map((e) => e.message);
      return res.status(StatusCodes.BAD_REQUEST).json({
        message,
      });
    }
    // const check_name = await Products.findOne({ short_name });
    // if (check_name) {
    //     return res.status(StatusCodes.BAD_REQUEST).json({
    //         message: 'Ten san pham da ton tai!'
    //     })
    // };
    let img_upload = Array.isArray(req.body.gallery)
      ? req.body.gallery
      : [req.body.gallery];
    if (req.files) {
      const promise_upload = await upload_img(req.files);
      promise_upload.map((uri_secure) => {
        img_upload.push(uri_secure.value.secure_url);
      });
    }
    let convert_Attributes;
    if (req.body.variant) {
      convert_Attributes = JSON.parse(req.body.attributes);
    }
    if (convert_Attributes) {
      await Variant.findOneAndDelete({ id_item: req.params.id });
      if (!Array.isArray(convert_Attributes)) {
        convert_Attributes = Object.keys(convert_Attributes)
          .filter(
            (key) =>
              ![
                "_id",
                "id_item",
                "variants",
                "createdAt",
                "updatedAt",
              ].includes(key)
          )
          .map((key) => convert_Attributes[key]);
      }
      const variant = await create_variant(convert_Attributes);
      const dataClient = {
        ...req.body,
        variant: null,
        gallery: img_upload,
      };
      const data = await Products.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            ...dataClient,
            variant: variant._id,
          },
        },
        { new: true }
      );
      return res.status(StatusCodes.OK).json({
        message: "Done !",
        data,
      });
    } else {
      const dataClient = {
        ...req.body,
        seller: id_user,
        variant: convert_Attributes,
        gallery: img_upload,
      };
      const data = await Products.findByIdAndUpdate(req.params.id, dataClient, {
        new: true,
      });
      return res.status(StatusCodes.OK).json({
        message: "Done !",
        data,
      });
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
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

// export async function update_quantity_product(data_items_order) {
//   let total_quantity_sales = 0;
//   const product_updates = [];
//   const variant_updates = [];

//   // list id product
//   const id_products = data_items_order.map((value) => value.product_id._id);
//   const data_products = await Products.find({
//     _id: { $in: id_products },
//   }).populate("variant");

//   // list id varian cần update
//   const id_variants = data_items_order
//     .filter((value) => value.product_id.variant._id)
//     .map((i) => i.product_id.variant._id);
//   const data_variants = await Variant.find({ _id: { $in: id_variants } });

//   // cập nhật từng đơn hàng
//   for (let i of data_items_order) {
//     const product = data_products.find(
//       (value) => value._id.toString() === i.product_id._id.toString()
//     );
//     if (product && product.variant) {
//       const variant = data_variants.find(
//         (value) => value._id.toString() === product.variant._id.toString()
//       );
//       if (variant) {
//         for (let j of variant.variants) {
//           if (j.attribute == i.name_varriant) {
//             for (let x of j.value_variants) {
//               if (x.name_variant) {
//                 if (x.name_variant == i.value_varriant) {
//                   x.stock_variant = x.stock_variant - i.quantity;
//                   x.sales_item += i.quantity;
//                   // gộp hết số lượng bán ra ở biến thể vào số lượng bán ra chung để thống kê
//                   total_quantity_sales += i.quantity;
//                   // push các value cần update vào mảng
//                   variant_updates.push({
//                     updateOne: {
//                       filter: {
//                         _id: variant._id,
//                         "variants.value_variants._id": x._id,
//                       },
//                       update: {
//                         $set: {
//                           "variants.$.value_variants.$[elem].stock_variant":
//                             x.stock_variant,
//                           "variants.$.value_variants.$[elem].sales_item":
//                             x.sales_item,
//                         },
//                       },
//                       arrayFilters: [{ "elem._id": x._id }],
//                     },
//                   });
//                 }
//               } else {
//                 x.stock_variant = x.stock_variant - i.quantity;
//                 x.sales_item += i.quantity;
//                 // gộp hết số lượng bán ra ở biến thể vào số lượng bán ra chung để thống kê
//                 total_quantity_sales += i.quantity;
//                 variant_updates.push({
//                   updateOne: {
//                     filter: {
//                       _id: variant._id,
//                     },
//                     update: {
//                       $set: {
//                         "variants.$.value_variants.$[elem].stock_variant":
//                           x.stock_variant,
//                         "variants.$.value_variants.$[elem].sales_item":
//                           x.sales_item,
//                       },
//                     },
//                     arrayFilters: [{ "elem._id": x._id }],
//                   },
//                 });
//               }
//             }
//           }
//         }
//       }
//     }
//     else {

//     }
//   }
// }

// export async function update_quantity_item(data_items_order) {
//   let total_quantity_sales = 0;

//   // Đọc qua từng đơn hàng để cập nhật
//   for (let i of data_items_order) {
//     const product = data_products.find(p => p._id.toString() === i.product_id._id.toString());

//     if (product && product.variant) {
//       // Tìm variant tương ứng từ data_variants
//       const variant = data_variants.find(v => v._id.toString() === product.variant._id.toString());

//       if (variant) {
//         for (let k of variant.variants) {
//           if (k.attribute === i.name_varriant) {
//             for (let x of k.value_variants) {
//               if (x.name_variant === i.value_varriant) {
//                 x.stock_variant -= i.quantity;
//                 x.sales_item += i.quantity;
//                 total_quantity_sales += i.quantity;

//                 // Thêm vào mảng variantUpdates để cập nhật sau này
//                 variantUpdates.push({
//                   updateOne: {
//                     filter: { _id: variant._id, 'variants.value_variants._id': x._id },
//                     update: { $set: { 'variants.$.value_variants.$[elem].stock_variant': x.stock_variant, 'variants.$.value_variants.$[elem].sales_item': x.sales_item } },
//                     arrayFilters: [{ 'elem._id': x._id }]
//                   }
//                 });
//               }
//             }
//           }
//         }
//       }

//       // Cập nhật sản phẩm chính và thêm vào mảng productUpdates
//       product.stock -= i.quantity;
//       product.sale_quantity += i.quantity;

//       productUpdates.push({
//         updateOne: {
//           filter: { _id: product._id },
//           update: { $set: { stock: product.stock, sale_quantity: product.sale_quantity } }
//         }
//       });
//     }
//   }

//   // Tiến hành cập nhật tất cả các sản phẩm và variant cùng lúc
//   if (productUpdates.length > 0) {
//     await Products.bulkWrite(productUpdates);
//   }

//   if (variantUpdates.length > 0) {
//     await Variant.bulkWrite(variantUpdates);
//   }

//   return total_quantity_sales;
// }
