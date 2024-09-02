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
        // nếu có 2 sản phẩm từ 2 shop khác nhau thì tạo riêng 2 đơn
        const group_items_order_by_seller = [];
        for (let i of items_order) {
            const id_seller = i.product_id.id_user_seller;
            let check_group_item_order_by_seller = group_items_order_by_seller.find(a => a.id_shop === id_seller);
            // tìm id_seller trong mảng group_item kia bằng find, nếu chưa có thì tạo 1 obj
            // check_group_item_order_by_seller mới để push vào mảng, nếu đã có rồi thì push i vào items
            if (!check_group_item_order_by_seller) {
                check_group_item_order_by_seller = { id_shop: id_seller, items: [] };
                group_items_order_by_seller.push(check_group_item_order_by_seller)
            }
            check_group_item_order_by_seller.items.push(i)
        }
        // dùng promise allSettled vì await không thể return trong loop được
        const promise_order = group_items_order_by_seller.map(data => {
            return Orders.create({
                user_id,
                items_order: data.items,
                infor_user,
                notes_order,
            })
        })
        await Promise.allSettled(promise_order)
        await update_quantity_item(items_order);
        if (action_order === 'cart_item') {
            await update_quantity_item_in_cart(user_id, items_order)
        }
        return res.status(StatusCodes.CREATED).json({
            message: 'OK',
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || "Lỗi server rồi đại vương ơi!"
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
        // if (status_item_order === 2) {
        //     await update_quantity_item(item_order.items_order);
        // }
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