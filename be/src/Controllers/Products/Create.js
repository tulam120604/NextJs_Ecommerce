import Products from "../../Model/Items/Products.js";
import Categories from "../../Model/Items/Categories.js";
import { StatusCodes } from "http-status-codes";
import { validateProducts } from "../../Validates/Products.js";
import { create_variant } from "./Create_variant.js";

// create
export async function Create_Product(req, res) {
  const { category_id } = req.body;
  const id_user = req.user.id;
  const dataRequest = req.body;
  try {
    if (category_id) {
      const category = await Categories.findById(category_id);
      if (!category) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "không thấy danh mục sản phẩm!",
        });
      }
    }
    const allData = {
      ...dataRequest,
      seller: id_user,
    };
    const { error } = validateProducts.validate(dataRequest, {
      abortEarly: false,
    });
    if (error) {
      const message = error.details.map((e) => e.message);
      return res.status(StatusCodes.BAD_REQUEST).json({
        message,
      });
    }
    if (dataRequest.variant) {
      const variant = await create_variant(dataRequest.variant);
      const value = {
        ...allData,
        variant: variant._id,
      };
      const data = await Products.create(value);
      if (!data || !data._id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Đã có lỗi xảy ra, vui lòng thử lại",
        });
      }
      return res.status(StatusCodes.CREATED).json({
        message: "Đã thêm sản phẩm vào cửa hàng.",
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
      });
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 500,
    });
  }
}
