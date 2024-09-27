import Attribute_Catalog from '../../Model/Products/Atrribute_catalog.js'
import { StatusCodes } from "http-status-codes";

export function update_attribute_catalog(req, res) {
    try {
        
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message
        })
    }
}