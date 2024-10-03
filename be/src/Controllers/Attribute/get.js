import Attribute_Catalog from '../../Model/Products/Atrribute_catalog.js'
import { StatusCodes } from "http-status-codes";

export async function get_attribute_catalog(req, res) {
    const id_item = req.params.id_item;
    try {
        const data_attribute = await Attribute_Catalog.find({ id_item: id_item });
        if (!data_attribute || data_attribute.length < 1) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No data!'
            })
        };
        return res.status(StatusCodes.OK).json({
            message: 'Done',
            data_attribute
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi rồi đại vương ơi!!'
        })
    }
}

export async function get_attribute_catalog_by_user(req, res) {
    try {
        if (!req.params.id_account) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No user!'
            })
        }
        const data = await Attribute_Catalog.findOne({ id_account: req.params.id_account });
        return res.status(StatusCodes.OK).json({
            message: 'OK',
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi rồi đại vương ơi!!'
        })
    }
}