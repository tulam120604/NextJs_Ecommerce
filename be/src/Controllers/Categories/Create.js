import { StatusCodes } from "http-status-codes";
import Categories from "../../Model/Products/Categories.js";
import { upload_img } from "../../middleware/upload.js";

export async function Create_Categories(req, res) {
  try {
    const name_Cate = await Categories.find();
    const category_name = req.body.category_name;
    for (let i of name_Cate) {
      if (category_name === i.category_name) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Danh muc da ton tai!",
        });
      }
    }
    const img_upload = await upload_img(req.file);
    const value = {
      category_name,
      category_img: img_upload.secure_url,
    };
    const data = await Categories.create(value);
    if (!data || !data._id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Tao danh muc that bai!",
      });
    }
    return res.status(StatusCodes.CREATED).json({
      message: "OK",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 500,
    });
  }
}
