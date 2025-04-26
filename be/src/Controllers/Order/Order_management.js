import Account from '../../Model/Auth/Account.js';
import Orders from '../../Model/Orders/Order.js';
import { StatusCodes } from 'http-status-codes';
import { update_quantity_item } from '../Products/Edit.js';
import { update_quantity_item_in_cart } from '../Cart/Get_cart.js';

// tạo đơn hàng trong database
export async function save_item_order(user_id, items_order, infor_user, notes_order, payment_method, status_order) {
    const check_user = await Account.findById(user_id);
    if (!check_user) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: 'No user!'
        })
    };
    // nếu có 2 sản phẩm từ 2 shop khác nhau thì tạo riêng 2 đơn
    let total_price_order_amount = -30000; // fix giá ship là 30k
    const group_items_order_by_seller = [];
    for (let i of items_order) {
        total_price_order_amount += i.total_price_item;
        const id_seller = i.product_id.seller._id;
        let check_group_item_order_by_seller = group_items_order_by_seller.find(a => a.id_shop === id_seller);
        // tìm id_seller trong mảng group_item kia bằng find, nếu chưa có thì tạo 1 obj
        // check_group_item_order_by_seller mới để push vào mảng, nếu đã có rồi thì push i vào items
        if (!check_group_item_order_by_seller) {
            check_group_item_order_by_seller = { id_shop: id_seller, items: [] };
            group_items_order_by_seller.push(check_group_item_order_by_seller);
        }
        check_group_item_order_by_seller.items.push(i);
    }
    // dùng promise allSettled vì await không thể return trong loop được
    const promise_order = group_items_order_by_seller.map(data => {
        return Orders.create({
            user_id,
            items_order: data.items,
            total_price_order_amount,
            infor_user,
            notes_order,
            payment_method,
            status_item_order: String(status_order)
        })
    })
    await Promise.allSettled(promise_order)
    await update_quantity_item(items_order);
    await update_quantity_item_in_cart(user_id, items_order)
}

// tao don hang
export async function create_Order(req, res) {
    const { items_order, infor_user, notes_order, payment_method } = req.body;
    const user_id = req.user.id
    try {
        await save_item_order(user_id, items_order, infor_user, notes_order, payment_method, 1);
        return res.status(StatusCodes.CREATED).json({
            message: 'OK',
        })
    } catch (error) {
       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 500,
    });
    }
}

// cap nhat trang thai don hang
export async function update_status_order(req, res) {
    const { order_id, status_item_order } = req.body;
    try {
        const check_user = await Account.findById(req.user.id);
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
      message: error.message || 500,
    });
    }
}

// mua lại đơn hàng
export async function buy_again(req, res) {
    const { id_order, items_order, infor_user } = req.body;
    const user_id = req.user.id
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
      message: error.message || 500,
    });
    }
}



// chi tiet san pham trong don hang de danh gia
export async function view_detail_item_order(req, res) {
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
      message: error.message || 500,
    });
    }
}