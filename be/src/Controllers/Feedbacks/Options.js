import Account from '../../Model/Auth/Account';
import { StatusCodes } from 'http-status-codes';
import Orders from '../../Model/Orders/Order';
import Products from '../../Model/Products/Products';
import Feedback from '../../Model/Feedback/Feedback';

export async function add_feedback(req, res) {
    const { user_id, item_id, content_feedback } = req.body;
    try {
        const check_user = await Account.findOne({ _id: user_id });
        if (!check_user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "No user!"
            })
        }
        const check_item = await Products.findById({ _id: item_id.product_id._id });
        if (!check_item) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No Item'
            })
        };
        const data_item_order = await Orders.findOne({
            "items_order._id": item_id._id
        });
        if (Array.isArray(data_item_order.items_order)) {
            for (let i of data_item_order.items_order) {
                if (i._id.toString() === item_id._id.toString()) {
                    i.status_feedback = true;
                }
            }
        }
        await data_item_order.save();
        const data_body_feedback = {
            ...req.body,
            item_id: item_id.product_id._id
        }
        const data = await Feedback.create(data_body_feedback);
        return res.status(StatusCodes.OK).json({
            message: 'Done!',
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Loi server !'
        })
    }
}


export async function get_feedback(req, res) {
    const {
        _page = 1,
        _limit = 20,
    } = req.query;
    const options = {
        page: _page,
        limit: _limit
    }
    try {
        const data = await Feedback.paginate({}, options);
        if (!data) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "No data!"
            })
        };
        return res.status(StatusCodes.OK).json({
            message: "Ok",
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Loi server!'
        })
    }
}

export async function get_feedback_detail_item(req, res) {
    const {
        _page = 1,
        _limit = 20
    } = req.query;
    try {
        const options = {
            page: _page,
            limit: _limit
        }
        const querry = {
            item_id: req.params.id_item
        }
        const data_feedback = await Feedback.paginate(querry, options);
        await Feedback.populate(data_feedback.docs, { path: 'user_id' });
        return res.status(StatusCodes.OK).json({
            message: 'OK',
            data_feedback
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Loi server!'
        })
    }
}

export async function check_feedback_by_item(req, res) {
    try {

    } catch (error) {

    }
}