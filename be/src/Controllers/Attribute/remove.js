import Attribute from "../../Model/Products/Attribute.js";
import { StatusCodes } from "http-status-codes";
import Category_attribute from "../../Model/Products/Category_attribute.js";

// loai thuoc tinh
export async function remove_category_attribute(req, res) {
    try {
        if (!req.params.id_account) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No account!'
            })
        }
        await Category_attribute.deleteOne({
            id_account,
            _id: req.body._id_item
        });
        return res.status(StatusCodes.OK).json({
            message: 'OK'
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi rồi đại vương ơi!!'
        })
    }
}

// thuoc tinh
export async function remove_attribute_catalog(req, res) {
    try {
        const { id_item } = req.body;
        if (!req.params.id_account) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No user!'
            })
        }
        await Attribute.deleteOne({
            id_account,
            _id: id_item
        })
        return res.status(StatusCodes.OK).json({
            message: 'OK',
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi rồi đại vương ơi!!'
        })
    }
}