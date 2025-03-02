import Products from "../../Model/Products/Products.js";
import { StatusCodes } from "http-status-codes";
import { validateProducts } from "../../Validates/Products.js";
import Variant from "../../Model/Products/Variant.js";
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
        id_user_seller: id_user,
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
      message: error,
    });
  }
}

// cap nhat so luong san pham khi mua hang
export async function update_quantity_item(data_items_order) {
  for (let i of data_items_order) {
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
                }
              } else {
                x.stock_variant = x.stock_variant - i.quantity;
                x.sales_item += i.quantity;
              }
            }
          }
        }
        await j.save();
      }
    } else {
      const data_item = await Products.find({ _id: i.product_id._id });
      for (let a of data_item) {
        a.stock = a.stock - i.quantity;
        a.sale_quantity += i.quantity;
        await a.save();
      }
    }
  }
}
