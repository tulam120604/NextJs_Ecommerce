import Account from '../../Model/Auth/Account';
import Carts from '../../Model/Cart/Cart';
import { StatusCodes } from 'http-status-codes';

export async function list_carts(req, res) {
    const { user_id } = req.params;
    try {
        const user = await Account.findById(user_id);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Khong tim thay tai khoan !"
            })
        }
        const cart = await Carts.findOne({ user_id }).populate('items.product_id');
        const count_total_price = cart.items.reduce((past_value, present_value) => {
            if (present_value.product_id === null || !present_value.product_id) {
                return past_value;
            }
            else if (present_value.status_checked === false) {
                return past_value;
            }
            else {
                return past_value + present_value.total_price_item;
            }
        }, 0);
        //  console.log(count_total_price);
        cart.total_price = count_total_price;
        if (!cart || cart.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Khong co san pham trong gio!'
            })
        };
        cart.items = cart.items.filter((item) => (
            (item.product_id !== null) && item
        ))
        await cart.save();
        return res.status(StatusCodes.OK).json({
            message: "Done !",
            cart
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || "Loi server"
        })
    }
};



export async function checked_item_cart(req, res) {
    const { user_id, id_item, item_checkked } = req.body;
    try {
        const user = await Account.findById(user_id);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "No user!!"
            })
        };
        const data_cart = await Carts.findOne({ user_id }).populate('items.product_id');
        for (let i = 0; i < data_cart.items.length; i++) {
            if (data_cart.items[i].product_id._id.toString() == id_item._id) {
                data_cart.items[i].status_checked = item_checkked
            }
        }
        // console.log(data);
        const data = await data_cart.save();
        return res.status(StatusCodes.OK).json({
            message: 'OK checked item cart!!!',
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            mesage: error.message || 'Loi server!'
        })
    }
}