import Atrribute from "../../Model/Products/Attribute.js";
import Variant from "../../Model/Products/Variant.js";
import { StatusCodes } from "http-status-codes";

export async function create_attribute(req, res) {
    try {
        const { id_account } = req.body;
        if (!id_account) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No Account!'
            })
        }
        const attribute_by_account = await Atrribute.find({
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
        await Atrribute.create(req.body);
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
    const varriant = data_variant.map(item => (
        {
            attribute: data_variant ? item.attribute : '',
            value_variants: item.value_variants.map(value =>
            (
                {
                    name_variant: value.name_variant ? value.name_variant.toString() : '',
                    stock_variant: value.stock_variant ? value.stock_variant : 0,
                    price_variant: value.price_variant > 0 && value.price_variant
                }
            )
            )
        }
    ));
    const data = await Variant.create({ variants: varriant });
    return data
}