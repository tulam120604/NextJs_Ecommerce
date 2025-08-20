import Carts from '../../Model/Cart/Cart.js';
import { StatusCodes } from 'http-status-codes';
import Products from "../../Model/Items/Products.js";


export async function Add_To_Cart(req, res) {
    try {
        const { product_id, quantity, attribute, name_variant, price_item_attr, status_checked } = req.body;
        const user_id = req.user.id;
        const data_item = await Products.findById(product_id).populate('variant');
        let stock_product = 0;
        if (data_item.variant) {
            const check_name_variant = data_item.variant.variants.find(value => value.attribute === attribute);
            const check_value_variant = check_name_variant.value_variants.find(item => (item?.name_variant?.trim() 
            ? item?.name_variant : undefined) === name_variant);
            stock_product = check_value_variant.stock_variant;
        }
        else {
            stock_product = data_item.stock
        }
        let price_item = (price_item_attr > 0) ? price_item_attr : data_item?.price_product;
        let name_varriant;
        let value_varriant;
        if (data_item.variant) {
            const varr = data_item.variant.variants.find(value => value.attribute === attribute);
            if (varr) {
                for (let i of varr.value_variants) {
                    // check có biến thể hay không để gán vào 2 biến let trên
                    if (i.name_variant === name_variant) {
                        name_varriant = varr.attribute;
                        value_varriant = i.name_variant
                    }
                    else {
                        name_varriant = varr.attribute
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
                name_varriant,
                value_varriant,
                total_price_item: price_item * quantity,
                status_checked
            });
        } else {
            let check_item = false
            for (let i = 0; i < data_cart.items.length; i++) {
                if (data_cart.items[i].product_id == product_id) {
                    if (data_cart.items[i].name_varriant == attribute) {
                        if (data_cart.items[i].value_varriant == name_variant) {
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
                    name_varriant,
                    value_varriant,
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
            messgae: error
        })
    }
};


// up quantity 
export async function up_quantity(req, res) {
    try {
        const { product_id, attribute, name_variant } = req.body;
        const user_id = req.user.id;
        const data_user_Cart = await Carts.findOne({ user_id });
        if (!data_user_Cart || data_user_Cart.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Khong tim thay user!"
            })
        };
        for (let i = 0; i < data_user_Cart.items.length; i++) {
            if (data_user_Cart.items[i].product_id == product_id) {
                if (data_user_Cart.items[i].name_varriant == attribute && data_user_Cart.items[i].value_varriant == name_variant) {
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
      message: error.message || 500,
    });
    }
};


// dow quantity
export async function dow_quantity(req, res) {
    try {
        const { product_id, attribute, name_variant } = req.body;
        const user_id = req.user.id;
        const data_user_cart = await Carts.findOne({ user_id });
        if (!data_user_cart || data_user_cart.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Khong tim thay nguoi dung !"
            })
        };
        for (let i = 0; i < data_user_cart.items.length; i++) {
            if (data_user_cart.items[i].product_id == product_id) {
                // console.log(data_user_cart.items[i].product_id);
                if (data_user_cart.items[i].name_varriant == attribute && data_user_cart.items[i].value_varriant == name_variant) {
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
      message: error.message || 500,
    });
    }
}

export async function remove_item_cart(req, res) {
    const { item_id } = req.body;
    const user_id = req.user.id;
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
      message: error.message || 500,
    });
    }
}


export async function remove_all_item_cart(req, res) {
    const user_id = req.user.id;
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
      message: error.message || 500,
    });
    }
}