import Account from '../../Model/Auth/Account.js';
import Orders from '../../Model/Orders/Order.js';
import { StatusCodes } from 'http-status-codes';


export async function get_Order_User(req, res) {
    const { user_id } = req.params;
    const {
        _page = 1,
        _limit = 3,
        _status_item = ''
    } = req.query;
    try {
        const options = {
            page: _page,
            limit: _limit,
            sort: { date_time: -1 }
        }
        const check_user = await Account.findById(user_id);
        if (!check_user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "No user!"
            })
        };

        const querry = { user_id: user_id }
        if (_status_item) {
            querry.$and = [
                { status_item_order: _status_item }
            ]
        }
        const totalItems = await Orders.countDocuments(querry);
        const data_order = await Orders.paginate(querry, options);
        console.log()
        return res.status(StatusCodes.OK).json({
            message: 'OK',
            data_order,
            totalItems,
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi server rồi đại vương ơi!'
        })
    }
}

export async function get_all_Order(req, res) {
    const {
        _page = 1,
        _limit = 20,
        _search = '',
    } = req.query;
    const options = {
        page: _page,
        limit: _limit,
        sort: { date_time: -1 }
    }
    try {
        const data_order = await Orders.paginate({}, options);
        return res.status(StatusCodes.OK).json({
            message: 'OK',
            data_order
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi server rồi đại vương ơi!'
        })
    }
}

// list item user order by seller
export async function list_item_order_by_seller(req, res) {
    try {
        const {
            _page = 1,
            _limit = 20,
        } = req.query;
        const options = {
            page: _page,
            limit: _limit,

            sort: { date_time: -1 }
        }
        const querry = {
            items_order: {
                $elemMatch: {
                    'product_id.id_user_seller': req.params.id_seller
                }
            },
        }
        const data_order = await Orders.paginate(querry, options);
        return res.status(StatusCodes.OK).json({
            message: 'OK',
            data_order
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Loi server !'
        })
    }
}

// get one order
export async function detail_order(req, res) {
    try {
        const { id, user_id } = req.query;
        let data_order_by_user;
        const data_order_by_id = await Orders.findOne({ _id: id.toString() });
        if (user_id) {
            data_order_by_user = await Orders.findOne({
                _id: id.toString(),
                user_id: user_id
            })
        }
        return res.status(StatusCodes.OK).json({
            message: 'OK',
            data_order_by_user,
            data_order_by_id
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Loi server !'
        })
    }
}

// list item order shipper
export async function list_item_order_by_shipper(req, res) {
    try {
        const {
            _page = 1,
            _limit = 20,
            _search = ''
        } = req.query;
        const options = {
            page: _page,
            limit: _limit,
            sort: { date_time: -1 }
        }
        const querry = {
            status_item_order: '4'
        };
        if (_search) {
            querry.$and = [
                {
                    code_order: { $regex: new RegExp(_search, 'i') }
                }
            ]
        }
        const data = await Orders.paginate(querry, options);
        return res.status(StatusCodes.OK).json({
            message: 'OK',
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Loi server !'
        })
    }
}