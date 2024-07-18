import Account from '../Model/Auth/Account';
import Middleware_Cart_Order from '../Model/MiddleWare_Cart_Order';
import { StatusCodes } from 'http-status-codes';


export async function create_Middleware_Cart_Order(req, res) {
    const { user_id, items_middleware, total_price } = req.body;
    try {
        let check_data_middleware_cart_order = await Middleware_Cart_Order.findOne({ user_id });
        if (!check_data_middleware_cart_order) {
            check_data_middleware_cart_order = new Middleware_Cart_Order({
                user_id: user_id,
                items_middleware: [],
                total_price
            })
        };
        check_data_middleware_cart_order.items_middleware = items_middleware;
        const data = await check_data_middleware_cart_order.save();
        return res.status(StatusCodes.CREATED).json({
            message: 'OK Create',
            data
        })

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi rồi đại vương ơi!'
        })
    }
}


export async function get_Middleware_Cart_Order(req, res) {
    const { data } = req.body;
    const { user_id } = req.params;
    try {
        const check_user = await Account.findById(user_id);
        if (!check_user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Not user!'
            })
        };
        const data = await Middleware_Cart_Order.find();
        // console.log(data);
        return res.status(StatusCodes.CREATED).json({
            message: 'OK get',
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi rồi đại vương ơi!'
        })
    }
}