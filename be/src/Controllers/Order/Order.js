import Account from '../../Model/Auth/Account.js';
import Orders from '../../Model/Orders/Order.js';
import { StatusCodes } from 'http-status-codes';
import { update_quantity_item } from '../Products/Edit.js';
import { update_quantity_item_in_cart } from '../Cart/Get.js';


export async function create_Order(req, res) {
    const { user_id, items_order, infor_user, notes_order, action_order } = req.body;
    try {
        const check_user = await Account.findById(user_id);
        if (!check_user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No user!'
            })
        };
        const data_order = await Orders.create({ user_id, items_order, infor_user, notes_order });
        if (action_order === 'cart_item') {
            await update_quantity_item_in_cart(user_id, items_order)
        }
        return res.status(StatusCodes.CREATED).json({
            message: 'OK',
            data_order,
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || "Lỗi server rồi đại vương ơi!"
        })
    }
}

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

export async function update_status_order(req, res) {
    const { order_id, status_item_order } = req.body;
    try {
        const check_user = await Account.findById(req.params.user_id);
        if (!check_user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Không tìm thấy người dùng!"
            })
        }
        const item_order = await Orders.findOne({ _id: order_id });
        if (!item_order) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Không tìm thấy đơn hàng!"
            })
        };
        if (status_item_order === 2) {
            await update_quantity_item(item_order.items_order);
        }
        item_order.status_item_order = status_item_order;
        const data_order = await item_order.save();
        return res.status(StatusCodes.OK).json({
            message: "Ok",
            data_order
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi server rồi đại vương ơi!'
        })
    }
}

export async function restore_buy_item_order(req, res) {
    const { id_order, user_id, items_order, infor_user } = req.body;
    try {
        const check_user = await Account.findById(user_id);
        if (!check_user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Không tìm thấy người dùng!"
            })
        }
        await Orders.findOneAndDelete({ _id: id_order });
        const item_order = await Orders.create({ user_id, items_order, infor_user })
        if (!item_order) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Không tìm thấy đơn hàng!"
            })
        };
        return res.status(StatusCodes.CREATED).json({
            message: 'OK',
            item_order
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi server rồi đại vương ơi!'
        })
    }
}

// chi tiet san pham trong don hang de feedback
export async function get_detail_item_order(req, res) {
    try {
        const id_item_order = req.params.id_item;
        const data_item_orders = await Orders.findOne({
            "items_order._id": id_item_order
        });
        const data_item = data_item_orders.items_order.filter(item => item._id.toString() === id_item_order.toString());
        return res.status(StatusCodes.OK).json({
            message: 'OK',
            data_item
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Loi server !'
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