import Attribute_Catalog from '../../Model/Products/Atrribute_catalog.js'
import { StatusCodes } from "http-status-codes";

export async function create_attributes_catalog(req, res) {
    try {
        const { id_account, values } = req.body;
        if (!id_account) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Not account!'
            })
        };
        if (!values) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No value attribute!'
            })
        }
        const check_seller_attribute_catalog = await Attribute_Catalog.findOne({ id_account });
        if (!check_seller_attribute_catalog) {
            await Attribute_Catalog.create({
                id_account,
                varriants: [values]
            });
        }
        else {
            check_seller_attribute_catalog.varriants.push(values);
            await check_seller_attribute_catalog.save();
        }
        return res.status(StatusCodes.OK).json({
            message: 'OK'
        })
    } catch (error) {
        return res.status(StatusCodes).json({
            message: error.message
        })
    }
};


export async function create_value_attributes_catalog(req, res) {
    try {
        const { key, id_account, value_varriant } = req.body;
        if (key || id_account) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Can not find account or attributes!'
            })
        }
        const data_attribute = await Attribute_Catalog.findOne({ 'varriants.key': key });
        if (!data_attribute) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No attribute!'
            })
        }
        const varriant = data_attribute.varriants.find(data => data.key.toString() === key.toString());
        if (!varriant) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No varriant!'
            })
        }
        varriant.value_varriant = value_varriant;
        await data_attribute.save();
        return res.status(StatusCodes.CREATED).json({
            message: 'OK create value varriant!'
        })
    } catch (error) {
        return res.status(StatusCodes).json({
            message: error.message
        })
    }
}