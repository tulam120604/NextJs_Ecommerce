import Account from '../../Model/Auth/Account';
import { StatusCodes } from 'http-status-codes';
import Products from '../../Model/Products/Products';
import Feedback from '../../Model/Feedback/Feedback';

export async function add_Feedback(req, res) {
    const { user_id, item_id, content_feedback } = req.body;
    try {
        const check_user = await Account.findOne({ _id: user_id });
        if (!check_user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "No user!"
            })
        }
        const check_item = await Products.findById({ _id: item_id });
        if (!check_item) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No Item'
            })
        };
        const data = await Feedback.create(content_feedback);
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


export async function get_Feedback(req, res) {
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