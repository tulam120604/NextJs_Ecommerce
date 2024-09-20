import Attribute from "../../Model/Products/Attribute.js";
import { StatusCodes } from "http-status-codes";

export async function create_attributes(req, res) {
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
        await Attribute.create({
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


export async function update_attributes(req, res) {
    try {
        const { _id, id_account } = req.body;
        if (_id || id_account) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Can not find account or attributes!'
            })
        }
        const data_attribute = await Attribute.findOne({ _id });

        if (!data_attribute) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No attribute'
            })
        }

    } catch (error) {
        return res.status(StatusCodes).json({
            message: error.message
        })
    }
}