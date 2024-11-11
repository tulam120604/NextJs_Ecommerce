import Attribute from "../../Model/Products/Attribute.js";
import { StatusCodes } from "http-status-codes";

export async function remove_attribute_catalog(req, res) {
    try {
        const { id_item } = req.body;
        if (!req.params.id_account) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No user!'
            })
        }
        await Attribute.updateOne(
            { $pull: { varriants: { key: id_item } } }
        );
        return res.status(StatusCodes.OK).json({
            message: 'OK',
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi rồi đại vương ơi!!'
        })
    }
}