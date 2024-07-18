import { StatusCodes } from "http-status-codes";
import Categories from "../../Model/Products/Categories";

export async function Create_Categories (req, res) {
    try {
        const name_Cate = await Categories.find();
        const trim_req_body = req.body.category_name.trim()
        for(let i of name_Cate){
            if(trim_req_body === i.category_name) {
               return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Trung ten danh muc !!!'
               })
            }
        }
        const data = await Categories.create(req.body);
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