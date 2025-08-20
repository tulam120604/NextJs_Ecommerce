import Products from "../../Model/Items/Products.js";
import Categories from "../../Model/Items/Categories.js";
import { StatusCodes } from "http-status-codes";
import { validateProducts } from "../../Validates/Products.js";
import { create_variant } from "./Create_variant.js";
import { upload_img } from "../../middleware/upload.js";

// create
export async function Create_Product(req, res) {
  const { category_id } = req.body;
  const id_user = req.user.id;
  const dataClient = req.body;
  try {
    if (category_id) {
      const category = await Categories.findById(category_id);
      if (!category) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "không thấy danh mục sản phẩm!",
        });
      }
    }

    const images = req.files;
    const img_upload = await upload_img(images);
    const url_image_gallery = img_upload.map(
      (uri_secure) => uri_secure.secure_url
    );
    const allData = {
      ...dataClient,
      category_id: category_id ? category_id : checkNameCategory._id,
      seller: id_user,
      gallery: url_image_gallery,
      variant: null,
    };
    const { error } = validateProducts.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const message = error.details.map((e) => e.message);
      return res.status(StatusCodes.BAD_REQUEST).json({
        message,
      });
    }
    if (dataClient.variant) {
      const convert_variant = JSON.parse(dataClient.variant);
      const variant = await create_variant(convert_variant);
      const dataRequest = {
        ...allData,
        variant: variant._id,
      };
      const data = await Products.create(dataRequest);
      if (!data || !data._id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Đã có lỗi xảy ra, vui lòng thử lại",
        });
      }
      return res.status(StatusCodes.CREATED).json({
        message: "Đã thêm sản phẩm vào cửa hàng.",
        data,
      });
    } else {
      const data = await Products.create(allData);
      if (!data || !data._id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Đã có lỗi xảy ra, vui lòng thử lại",
        });
      }
      return res.status(StatusCodes.CREATED).json({
        message: "Đã thêm sản phẩm vào cửa hàng.",
        data,
      });
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 500,
    });
  }
}
