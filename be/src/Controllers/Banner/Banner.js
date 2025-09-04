import { StatusCodes } from "http-status-codes";
import Banner from "../../Model/Banner/Banner.js";

// get all banner
export async function get_banner(req, res) {
  try {
    const data = await Banner.find();
    return res.status(StatusCodes.OK).json({
      message: "OK",
      data,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: true,
      message: error,
    });
  }
}

// create
export async function create_banner(req, res) {
  try {
    const result = await Banner.create(req.body);
    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Đã xảy ra lỗi, vui lòng thử lại!",
        error: true,
      });
    }
    return res.status(StatusCodes.OK).json({
      message: "OK",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: true,
      message: error,
    });
  }
}
