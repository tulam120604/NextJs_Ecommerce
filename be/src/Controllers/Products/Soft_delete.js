import Products from "../../Model/Items/Products.js";
import { StatusCodes } from "http-status-codes";

export async function soft_remove(req, res) {
  try {
    const result = await Products.delete({ _id: req.params.id });
    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Đã xảy ra lỗi!",
      });
    }
    return res.status(StatusCodes.OK).json({
      message: "Đã ẩn sản phẩm!",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 500,
    });
  }
}

// restore
export async function restore_item(req, res) {
  try {
    const result = await Products.restore({ _id: req.params.id });
    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Đã xảy ra lỗi!",
      });
    }
    return res.status(StatusCodes.OK).json({
      message: "Đã khôi phục sản phẩm!",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 500,
    });
  }
}
