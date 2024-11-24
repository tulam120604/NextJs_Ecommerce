import Attribute from "../../Model/Products/Attribute.js";
import { StatusCodes } from "http-status-codes";
import Category_attribute from "../../Model/Products/Category_attribute.js";

// loai thuoc tinh
export async function update_category_attribute(req, res) {
    try {
        const id_account = req.params.id_account;
        if (!id_account) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No account!'
            })
        };
        const category_attribute = await Category_attribute.find({
            id_account,
        });
        const check_name_category_attribute = category_attribute.some(value =>
            value?.name_category_attribute?.toString().trim() === req.body.name_category_attribute?.toString()?.trim()
        );
        if (check_name_category_attribute) {
            return res.status(StatusCodes.CONFLICT).json({
                message: 'Ten loai thuoc tinh da ton tai!'
            })
        };
        await Category_attribute.updateOne({
            id_account,
            _id: req.body._id_item
        });
        return res.status(StatusCodes.NO_CONTENT).json({
            message: 'OK'
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message
        })
    }
}


// thuoc tinh
export async function update_attribute_catalog(req, res) {
    try {
        const id_account = req.params.id_account;
        if (!id_account) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No account!'
            })
        };
        const attribute_catalog = await Attribute.find({
            id_account
        });
        const check_attribute_catalog = attribute_catalog.some(value =>
            value?.name_attribute?.toString()?.trim() === req.body.name_attribute?.toString()?.trim()
        );
        if (check_attribute_catalog) {
            return res.status(StatusCodes.CONFLICT).json({
                message: 'Ten thuoc tinh da ton tai!'
            })
        };
        await Attribute.updateOne({
            id_account,
            _id: req.body._id_item
        })
        return res.status(StatusCodes.NO_CONTENT).json({
            message: 'OK'
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message
        })
    }
}