import Account from '../../Model/Auth/Account';
import Orders from '../../Model/Orders/Order';
import Carts from '../../Model/Cart/Cart';
import { StatusCodes } from 'http-status-codes';


export async function create_Order(req, res) {
    const { user_id, items_order, infor_user } = req.body;
    try {
        const check_user = await Account.findById(user_id);
        let delete_items_cart = await Carts.findOne({user_id});
        delete_items_cart.items = delete_items_cart.items.filter((item) => 
        (!items_order.some((item_order) => item.product_id.toString() === item_order.product_id._id))
        )
        await delete_items_cart.save();
        if (!check_user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No user!'
            })
        };
        // console.log(delete_items_cart)
        const data_order = await Orders.create({user_id, items_order, infor_user});
        // console.log(data_order);
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
    const { user_id} = req.params ;
    try { 
        const check_user = await Account.findById(user_id);
        if (!check_user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message : "No user!"
            })
        };
        const data_order = await Orders.find({user_id : user_id});
        console.log(data_order);
        return res.status(StatusCodes.OK).json({
            message : 'OK',
            data_order
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
    const options  = {
        page : _page,
        limit : _limit
    }
    try { 
        const data_order = await Orders.paginate({}, options);
        console.log(data_order);
        return res.status(StatusCodes.OK).json({
            message : 'OK',
            data_order
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi server rồi đại vương ơi!'
        })
    }
}