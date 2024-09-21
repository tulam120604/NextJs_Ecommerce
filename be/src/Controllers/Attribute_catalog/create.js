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
        if (values || values.length < 1) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No value attribute!'
            })
        }
        const varriant = values.map(item => ({
            color_item: item.color_item,
            size_item: []
        }))
        await Attribute_Catalog.create({
            id_account,
            varriants: varriant
        });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
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
        const { _id, id_account, value_varriant } = req.body;
        if (_id || id_account) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Can not find account or attributes!'
            })
        }
        const data_attribute = await Attribute_Catalog.findOne({ 'varrriants._id_varriant': _id });
        if (!data_attribute) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No attribute'
            })
        }
        const varriant = data_attribute.varriants.find(data => data._id_varriant.toString() === _id.toString());
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