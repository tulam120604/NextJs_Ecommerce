import { StatusCodes } from "http-status-codes";
import Variant from "../../Model/Items/Variant.js";
// create variant
export async function create_variant(req, res) {
  try {
    const data_variant = req?.body?.variant;
    if (!data_variant || data_variant?.length < 1) {
      return res.status(StatusCodes?.NOT_FOUND).json({
        message: "Không có biến thể sản phẩm!",
      });
    }
    const arr_variant = [];
    data_variant.forEach((item) => {
      if (item?.attribute?.trim()) {
        arr_variant.push({
          attribute: item.attribute,
          value_variants: item.value_variants.map((v) => ({
            name_variant: v?.name_variant?.toString() || "",
            stock_variant: Number(v?.stock_variant ?? 0),
            price_variant: Number(v?.price_variant ?? 0),
          })),
        });
      }
    });

    const data = await Variant.create({ variants: arr_variant });
    if (!data._id) {
      return res.status(StatusCodes?.BAD_REQUEST).json({
        message: "Đã xảy ra lỗi, vui lòng thử lại!",
      });
    }
    return res.status(StatusCodes?.CREATED).json({
      message: "Đã thêm biến thể sản phẩm!",
      data,
    });
  } catch (error) {
    return res.status(StatusCodes?.INTERNAL_SERVER_ERROR).json({
      message: error.message || 500,
    });
  }
}

export async function update_variant(req, res) {
  try {
    const data_variant = req?.body?.variant;
    if (!data_variant || data_variant?.length < 1) {
      return res.status(StatusCodes?.NOT_FOUND).json({
        message: "Không có biến thể sản phẩm!",
      });
    }
    const result = await Variant.findByIdAndUpdate(
      data_variant?._id,
      {
        variants: data_variant.variants,
      },
      {
        new: true,
      }
    );
    if (!result._id) {
      return res.status(StatusCodes?.BAD_REQUEST).json({
        message: "Đã xảy ra lỗi, vui lòng thử lại!",
      });
    }
    return res.status(StatusCodes?.CREATED).json({
      message: "Đã cập nhật biến thể sản phẩm!",
      result,
    });
  } catch (error) {
    return res.status(StatusCodes?.INTERNAL_SERVER_ERROR).json({
      message: error.message || 500,
    });
  }
}

// remove
export async function remove_variant(req, res) {
  try {
    const id_variant = req?.params?.id;
    if (!id_variant) {
      return res.status(StatusCodes?.NOT_FOUND).json({
        error: true,
        message: "Không có biến thể sản phẩm!",
      });
    }
    const result = await Variant.findByIdAndDelete(id_variant);
    if (!result._id) {
      return res.status(StatusCodes?.BAD_REQUEST).json({
        error: true,
        message: "Đã xảy ra lỗi, vui lòng thử lại!",
      });
    }
    return res.status(StatusCodes?.OK).json({
      error: false,
      message: "Đã xóa biến thể sản phẩm!",
    });
  } catch (error) {
    return res.status(StatusCodes?.INTERNAL_SERVER_ERROR).json({
      message: error.message || 500,
    });
  }
}
