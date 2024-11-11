import Attribute from "../../Model/Products/Attribute.js";
import { StatusCodes } from "http-status-codes";

export async function get_attribute_catalog(req, res) {
    try {
        const id_account = req.params.id_account;
        if (!id_account) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No account!'
            })
        };
        const data = await Attribute.find({ id_account });
        return res.status(StatusCodes.OK).json({
            message: 'OK',
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message
        })
    }
}
