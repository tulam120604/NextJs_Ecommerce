import Account from '../../Model/Auth/Account';
import Comment from '../../Model/Comments/Comments';
import {StatusCodes} from 'http-status-codes';
import Products from '../../Model/Products/Products';

export async function Add_Comment (req, res) {
    const {user_id, item_id, content_comment } = req.body;
    try {
        const check_user = await Account.findOne({_id : user_id});
        if (!check_user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message : "No user!"
            })
        }
        const check_item = await Products.findById({ _id : item_id });
        if (!check_item) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message : 'No Item'
            })
        };
        const data = await Comment.create(content_comment);
        return res.status(StatusCodes.OK).json({
            message : 'Done!',
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message : error.message || 'Loi server !'
        })
    }
}


export async function Get_Comment (req, res) {
    const {
        _page = 1,
        _limit = 20,
    } = req.query;
    const options = {
        page : _page,
        limit : _limit
    }
    try {
        const data = await Comment.paginate({} , options);
        if (!data) {
            return res.status(StatusCode.NOT_FOUND).json({
                message : "No data!"
            })
        };
        return res.status(StatusCodes.OK).json({
            message : "Ok",
            data
        })
    } catch (error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message : error.message || 'Loi server!'
        })
    }
}