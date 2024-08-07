import Account from '../../Model/Auth/Account';
import Orders from '../../Model/Orders/Order';
import Carts from '../../Model/Cart/Cart';
import Products from '../../Model/Products/Products'
import { StatusCodes } from 'http-status-codes';
import Attribute from '../../Model/Products/Attribute';


export async function create_Order(req, res) {
    const { user_id, items_order, infor_user,notes_order, action_order } = req.body;
    try {
        const check_user = await Account.findById(user_id);
        if (!check_user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No user!'
            })
        };
        const data_order = await Orders.create({ user_id, items_order, infor_user, notes_order });
        for (let i of items_order) {
            if (i.product_id.attributes) {
                const data_attr = await Attribute.find({ id_item: i.product_id._id });
                for (let j of data_attr) {
                    for (let k of j.varriants) {
                        if (k.color_item == i.color_item) {
                            for (let x of k.size_item) {
                                if (x.name_size) {
                                    if (x.name_size == i.size_attribute_item) {
                                        x.stock_item = x.stock_item - i.quantity;
                                    }
                                } else {
                                    x.stock_item = x.stock_item - i.quantity;
                                }
                            }
                        }
                    }
                    await j.save();
                }
            }
            else {
                const data_item = await Products.find({ _id: i.product_id._id });
                for (let a of data_item) {
                    a.stock = a.stock - i.quantity;
                    await a.save();
                }
            }
        };
        if (action_order === 'cart_item') {
            const data_cart = await Carts.findOne({ user_id: user_id });
            data_cart.items = data_cart.items.filter((i) => {
                return !items_order.some((j) => {
                    const check_Product_Id = i.product_id.toString() === j.product_id._id.toString();
                    const check_Color = i.color_item ? i.color_item === j.color_item : true;
                    const check_Size = i.size_attribute_item ? i.size_attribute_item === j.size_attribute_item : true;
                    return check_Product_Id && check_Color && check_Size
                });
            });
            await data_cart.save();
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
        const totalItems1 = await Orders.countDocuments({ status_item_order: 1 });
        const totalItems2 = await Orders.countDocuments({ status_item_order: 2 });
        const totalItems3 = await Orders.countDocuments({ status_item_order: 3 });
        const totalItems4 = await Orders.countDocuments({ status_item_order: 4 });
        const totalItems5 = await Orders.countDocuments({ status_item_order: 5 });
        const totalItems6 = await Orders.countDocuments({ status_item_order: 6 });
        const data_order = await Orders.paginate(querry, options);
        return res.status(StatusCodes.OK).json({
            message: 'OK',
            data_order,
            totalItems,
            totalItems1,
            totalItems2,
            totalItems3,
            totalItems4,
            totalItems5,
            totalItems6
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


export async function get_item_order(req, res) {
    try {
        const id_item_order = req.params.id_item;
        const data_item_orders = await Orders.findOne({
            "items_order._id" : id_item_order
        });
        const data_item = data_item_orders.items_order.filter(item => item._id.toString() === id_item_order.toString());
        return res.status(StatusCodes.OK).json({
            message : 'OK',
            data_item
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Loi server !'
        })
    }
}