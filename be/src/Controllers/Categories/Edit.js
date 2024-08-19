import { StatusCodes } from "http-status-codes";
import Categories from "../../Model/Products/Categories";


// add product to category
export async function AddProductToCategories (req, res) {
    try {
        const data = await Categories.findByIdAndUpdate({_id : req.params.id} ,
            {$push : {products : req.body.products}}
        )
        return res.status(StatusCodes.OK).json({
            message : "Done",
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message : error.message || 'Lỗi server rồi đại vương ơi!'
        })
    }
}