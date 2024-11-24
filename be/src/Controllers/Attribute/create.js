import Attribute from "../../Model/Products/Attribute.js";
import Category_attribute from "../../Model/Products/Category_attribute.js";
import Variant from "../../Model/Products/Variant.js";
import { StatusCodes } from "http-status-codes";

// loai thuoc tinh 
export async function create_category_attribute(req, res) {
    try {
        const { id_account } = req.params.id_account;
        if (!id_account) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No account!'
            })
        };
        const check_name_category_attribute = await Category_attribute.findOne({
            name_category_attribute: req.body.name_category_attribute
        });
        if (check_name_category_attribute) {
            return res.status(StatusCodes.CONFLICT).json({
                message: "Ten loai thuoc tinh da ton tai!"
            })
        };
        await Category_attribute.create(req.body);
        return res.status(StatusCodes.CREATED).json({
            message: 'OK'
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message
        })
    }
}

// thuoc tinh
export async function create_attribute(req, res) {
    try {
        const { id_account } = req.params.id_account;
        if (!id_account) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No Account!'
            })
        }
        const attribute_by_account = await Attribute.find({
            id_account
        });
        const check_attribute = attribute_by_account.find((value) => (
            value.attribute.toString().trim() === req.body.attribute.toString().trim()
        ))
        if (check_attribute) {
            return res.status(StatusCodes.CONFLICT).json({
                message: 'Thuoc tinh da ton tai!'
            })
        }
        await Attribute.create(req.body);
        return res.status(StatusCodes.OK).json({
            message: 'OK'
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message
        })
    }
};


export async function create_variant(data_variant) {
    if (!data_variant || data_variant.length < 1) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: 'Not variants'
        })
    };
    const arr_variant = [];
    data_variant.map(item => {
        if (item.attribute && item.attribute.trim()) {
            const value = {
                attribute: data_variant ? item.attribute : '',
                value_variants: item.value_variants.map(value =>
                (
                    {
                        name_variant: value.name_variant && value.name_variant.toString(),
                        stock_variant: value.stock_variant && value.stock_variant,
                        price_variant: value.price_variant && value.price_variant
                    }
                )
                )
            };
            arr_variant.push(value)
        }
    });
    const data = await Variant.create({ variants: arr_variant });
    return data
}