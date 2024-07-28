import { StatusCodes } from "http-status-codes";
import Categories from "../../Model/Products/Categories";
import cloudinary from "../../utils/cloudinary";

export async function Create_Categories (req, res) {
    const {category_name, category_img} = req.body;
    try {
        const name_Cate = await Categories.find();
        const trim_req_body = req.body.category_name
        for(let i of name_Cate){
            if(trim_req_body === i.category_name) {
               return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Trung ten danh muc !!!'
               })
            }
        }
        const img_upload = await cloudinary.uploader.upload(req.file.path);
        const all_data = {
            ...req.body,
            category_img : img_upload.secure_url
        }
        const data = await Categories.create(all_data);
        return res.status(StatusCodes.OK).json({
            message : 'Done',
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message : error.message || 'Lỗi server rồi đại vương ơi!'
        })
    }
}