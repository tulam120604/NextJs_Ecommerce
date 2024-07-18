import Carts from '../../Model/Cart/Cart';
import { StatusCodes } from 'http-status-codes';
import Products from "../../Model/Products/Products";
import Attribute from '../../Model/Products/Attribute';


export async function Add_To_Cart(req, res) {
    const { user_id, product_id, quantity, color, size_attribute } = req.body;
    try {
        const data_item = await Products.findById(product_id);
        const attribute_item = await Attribute.find({ id_item: data_item?._id });
        let price_item = data_item?.price_product;
        let quantity_by_item = 0;
        let color_item;
        let size_attribute_item
        if (data_item.attributes) {
            for (let i = 0; i < attribute_item.length; i++) {
                for (let j = 0; j < attribute_item[i]?.values.length; j++) {
                    if (attribute_item[i]?.values[j].color_item == color && attribute_item[i]?.values[j].size_item == size_attribute) {
                        quantity_by_item = attribute_item[i]?.values[j].stock_item;
                        color_item = attribute_item[i]?.values[j].color_item;
                        size_attribute_item = attribute_item[i]?.values[j].size_item;
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
        }
        if (data_cart.items.length === 0) {
            data_cart.items.push({
                product_id,
                quantity,
                price_item,
                quantity_by_item,
                color_item,
                size_attribute_item,
                total_price_item: price_item * quantity
            });
        } else {
            let check_item = false
            for (let i = 0; i < data_cart.items.length; i++) {
                if (data_cart.items[i].product_id == product_id) {
                    if (data_cart.items[i].color_item == color) {
                        if (data_cart.items[i].size_attribute_item == size_attribute) {
                            data_cart.items[i].quantity = data_cart.items[i].quantity + quantity;
                            data_cart.items[i].total_price_item = price_item * data_cart.items[i].quantity;
                            check_item = true
                        }
                    }
                }
            }
            if (!check_item) {
                data_cart.items.push({
                    product_id,
                    quantity,
                    price_item,
                    quantity_by_item,
                    color_item,
                    size_attribute_item,
                    total_price_item: price_item * quantity
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
                if (data_user_cart.items[i].color_item == color && data_user_cart.items[i].color_item == color) {
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
    const { user_id, product_id } = req.body;
    try {
        const data_cart = await Carts.findOne({ user_id });
        if (!data_cart) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "No data!"
            })
        };
        console.log(data_cart)
        data_cart.items = data_cart.items.filter((id_item) => id_item.product_id.toString() !== product_id);
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


export async function remove_all_item_cart(req, res) {
    const { user_id, list_item } = req.body;
    try {
        const data_cart = await Carts.findOne({ user_id });
        if (!data_cart) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "No data!"
            })
        };
        data_cart.items = data_cart.items.filter(item => (
            !list_item.some(id_item => item.product_id.toString() === id_item._id)
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