import Attribute from "../../Model/Products/Attribute";
import { StatusCodes } from "http-status-codes";

export async function get_attribute (req, res) {
    const {id_item} = req.params;
    try {
        const data_attribute = await Attribute.find({id_item : id_item});
        if (!data_attribute || data_attribute.length < 1) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message : 'No data!'
            })
        };
        return res.status(StatusCodes.OK).json({
            message : 'Done',
            data_attribute
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message : error.message || 'Lỗi rồi đại vương ơi!!'
        })
    }
}