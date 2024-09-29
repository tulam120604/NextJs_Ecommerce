import Attribute_Catalog from '../../Model/Products/Atrribute_catalog.js';
import { StatusCodes } from "http-status-codes";

export async function update_attribute_catalog(req, res) {
    try {
        const key = req.params.key;
        if (!key) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Not key'
            })
        }
        await Attribute_Catalog.findOneAndUpdate(
            { 'varriants.key': key },
            { $set: { 'varriants.$.name_varriant': req.body.name_varriant } },
            { new: true }
        )
        return res.status(StatusCodes.OK).json({
            message: 'OK'
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message
        })
    }
}