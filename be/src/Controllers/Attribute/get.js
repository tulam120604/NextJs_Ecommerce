import Attribute from "../../Model/Products/Attribute.js";
import { StatusCodes } from "http-status-codes";
import Category_attribute from "../../Model/Products/Category_attribute.js";


// the loai thuoc tinh
export async function get_category_attribute(req, res) {
    try {
        const { id_account } = req.params.id_account;
        if (!id_account) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No account!'
            })
        };
        const data = await Category_attribute.find({
            id_account: req.params.id_account
        });
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


export async function get_one_category_attribute(req, res) {
    try {
        const { id_account } = req.params.id_account;
        if (!id_account) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No account!'
            })
        };
        const data = await Category_attribute.findOne({
            id_account,
            _id: req.headers['_id_customer_request_headers']
        })
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

// thuoc tinh
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

export async function get_one_attribute_catalog(req, res) {
    try {
        const id_account = req.params.id_account;
        if (!id_account) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No account!'
            })
        };
        const data = await Attribute.findOne({
            id_account,
            _id: req.headers['_id_customer_request_headers']
        });
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
