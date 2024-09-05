import Carts from '../../Model/Cart/Cart.js';
import { StatusCodes } from 'http-status-codes';
import Products from "../../Model/Products/Products.js";


export async function Add_To_Cart(req, res) {
    const { user_id, product_id, quantity, color, size_attribute, price_item_attr, status_checked } = req.body;
    try {
        const data_item = await Products.findById(product_id).populate('attributes');
        let stock_product = 0;
        if (data_item.attributes) {
            const check_color = data_item.attributes.varriants.find(value => value.color_item === color);
            const check_name_size = check_color.size_item.find(item => (item?.name_size?.trim() ? item?.name_size : undefined) === size_attribute);
            stock_product = check_name_size.stock_item
        }
        else {
            stock_product = data_item.stock
        }
        let price_item = (price_item_attr > 0) ? price_item_attr : data_item?.price_product;
        let color_item;
        let size_attribute_item;
        if (data_item.attributes) {
            const varr = data_item.attributes.varriants.find(color_attr => color_attr.color_item === color);
            if (varr) {
                for (let i of varr.size_item) {
                    if (i.name_size === size_attribute) {
                        color_item = varr.color_item;
                        size_attribute_item = i.name_size
                    }
                    else {
                        color_item = varr.color_item
                    }
                }
            }
        }
        let data_cart = await Carts.findOne({ user_id });
        if (!data_cart) {
            data_cart = new Carts({
                user_id,
                items: [],
            })
        };
        if (data_cart.items.length < 1) {
            data_cart.items.push({
                product_id,
                quantity,
                price_item,
                color_item,
                size_attribute_item,
                total_price_item: price_item * quantity,
                status_checked
            });
        } else {
            let check_item = false
            for (let i = 0; i < data_cart.items.length; i++) {
                if (data_cart.items[i].product_id == product_id) {
                    if (data_cart.items[i].color_item == color) {
                        if (data_cart.items[i].size_attribute_item == size_attribute) {
                            data_cart.items[i].quantity = data_cart.items[i].quantity + quantity;
                            data_cart.items[i].total_price_item = price_item * data_cart.items[i].quantity;
                            data_cart.items[i].status_checked = status_checked
                            check_item = true
                        }
                        if (data_cart.items[i].quantity >= stock_product) {
                            data_cart.items[i].quantity = stock_product;
                            data_cart.items[i].total_price_item = price_item * data_cart.items[i].quantity;
                            data_cart.items[i].status_checked = status_checked
                        }
                    }
                }
            }
            if (!check_item) {
                data_cart.items.unshift({
                    product_id,
                    quantity,
                    price_item,
                    color_item,
                    size_attribute_item,
                    total_price_item: price_item * quantity,
                    status_checked
                });
            }
        }
        const data = await data_cart.save();
        return res.status(StatusCodes.CREATED).json({
            message: "Done!",
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            messgae: error.message || "Lỗi server rồi đại vương ơi!"
        })
    }
};


// up quantity 
export async function up_quantity(req, res) {
    const { user_id, product_id, color, size_attribute } = req.body;
    try {
        console.log(req.body)
        const data_user_Cart = await Carts.findOne({ user_id });
        if (!data_user_Cart || data_user_Cart.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Khong tim thay user"
            })
        };
        for (let i = 0; i < data_user_Cart.items.length; i++) {
            if (data_user_Cart.items[i].product_id == product_id) {
                if (data_user_Cart.items[i].color_item == color && data_user_Cart.items[i].size_attribute_item == size_attribute) {
                    data_user_Cart.items[i].quantity++;
                    data_user_Cart.items[i].total_price_item = data_user_Cart.items[i].price_item * data_user_Cart.items[i].quantity;
                }
            }
        };
        const data = await data_user_Cart.save();
        return res.status(StatusCodes.OK).json({
            message: 'Done !',
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || "Lỗi server rồi đại vương ơi!"
        })
    }
};


// dow quantity
export async function dow_quantity(req, res) {
    const { user_id, product_id, color, size_attribute } = req.body;
    try {
        const data_user_cart = await Carts.findOne({ user_id });
        if (!data_user_cart || data_user_cart.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Khong tim thay nguoi dung !"
            })
        };
        for (let i = 0; i < data_user_cart.items.length; i++) {
            if (data_user_cart.items[i].product_id == product_id) {
                // console.log(data_user_cart.items[i].product_id);
                if (data_user_cart.items[i].color_item == color && data_user_cart.items[i].size_attribute_item == size_attribute) {
                    data_user_cart.items[i].quantity--;
                    data_user_cart.items[i].total_price_item = data_user_cart.items[i].total_price_item - data_user_cart.items[i].price_item;
                    if (data_user_cart.items[i].quantity === 0) {
                        data_user_cart.items.splice(i, 1);
                    }
                }

            }
        };
        const data = await data_user_cart.save();
        return res.status(StatusCodes.OK).json({
            message: "Done",
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || "Lỗi server rồi đại vương ơi!"
        })
    }
}

export async function remove_item_cart(req, res) {
    const { user_id, item_id } = req.body;
    try {
        const data_cart = await Carts.findOne({ user_id });
        if (!data_cart) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "No data!"
            })
        };
        data_cart.items = data_cart.items.filter((id_item) => id_item._id.toString() !== item_id);
        await data_cart.save();
        return res.status(StatusCodes.OK).json({
            message: "Done remove!",
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || "Lỗi server rồi đại vương ơi!"
        })
    }
}


export async function remove_all_item_cart(req, res) {
    const { user_id } = req.body;
    try {
        const data_cart = await Carts.findOne({ user_id });
        if (!data_cart) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "No data!"
            })
        };
        // console.log(list_item);
        data_cart.items = data_cart.items.filter(item => (
            !item.status_checked
        ));
        const data = await data_cart.save();
        return res.status(StatusCodes.OK).json({
            message: "Done remove!",
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || "Lỗi server rồi đại vương ơi!"
        })
    }
}