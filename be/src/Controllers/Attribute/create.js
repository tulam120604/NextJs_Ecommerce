import Atrribute from "../../Model/Products/Atrribute.js";
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
        return res.status(StatusCodes).json({
            message: error.message
        })
    }
};


export async function create_variant(req, res) {
    try {
        const { value_variants } = req.body;
        if (!value_variants || value_variants.length < 1) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Not variants'
            })
        };
        const varriant = value_variants.map(item => (
            {
                name_varriant: value_variants ? item.name_varriant : '',
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
        await Variant.create(varriant);
    } catch (error) {
        return res.status(StatusCodes).json({
            message: error.message
        })
    }
}