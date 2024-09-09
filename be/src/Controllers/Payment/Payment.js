import axios from 'axios';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import { StatusCodes } from 'http-status-codes';
import qs from 'qs';
import Orders from '../../Model/Orders/Order.js';
import Account from '../../Model/Auth/Account.js';
import { update_quantity_item } from '../Products/Edit.js';
import { update_quantity_item_in_cart } from '../Cart/Get.js';

// APP INFO
const config = {
    app_id: "2554",
    key1: process.env.ZALOPAY_KEY_1,
    key2: process.env.ZALOPAY_KEY_2,
    endpoint: process.env.END_POINT
};
// const config = {
//     appid: "554",
//     key1: "8NdU5pG5R2spGHGhyO99HN1OhD8IQJBn",
//     key2: "uUfsWgfLkRLzq6W2uNXTCxrfxs51auny",
//     endpoint: "https://sandbox.zalopay.com.vn/v001/tpe/createorder"
//   };

export async function create_payment(req, res) {
    // tao don hang
    const { user_id, items_order, infor_user, notes_order, payment_method } = req.body;
    // ****
    const total_price = req.body.items_order.reduce((acc, curr) => (acc + curr.total_price_item), 0);
    const embed_data = {
        redirecturl: "http://localhost:5000/"
    };
    try {
        // lưu data đơn hàng vào db
        const check_user = await Account.findById(user_id);
        if (!check_user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No user!'
            })
        };
        // nếu có 2 sản phẩm từ 2 shop khác nhau thì tạo riêng 2 đơn
        const group_items_order_by_seller = [];
        for (let i of items_order) {
            const id_seller = i.product_id.id_user_seller._id;
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
                infor_user,
                notes_order,
                payment_method,
            })
        })
        const item_order = await Promise.allSettled(promise_order);
        // await update_quantity_item(items_order);
        // await update_quantity_item_in_cart(user_id, items_order);
        // đổ thông tin từ trang thanh toán
        const transID = Math.floor(Math.random() * 10000000);
        const items = items_order.map(value => ({
            id: value._id,
            quantity: value.quantity,
            price: value.total_price_item,
        }));

        // app_trans_id từ id order
        const app_trans_id = item_order.map(data => data.value._id.toString());
        const order = {
            app_id: config.app_id,
            app_trans_id: app_trans_id.join(','), // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
            app_user: "user123",
            app_time: Date.now(), // miliseconds
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount: total_price,
            description: `Store88 - Mời đại vương thanh toán đơn hàng.`,
            bank_code: "",
            callback_url: "https://dc42-2405-4802-471-c0-2055-db6f-e2b1-a578.ngrok-free.app/v1/callback"
        };

        // appid|apptransid|appuser|amount|apptime|embeddata|item
        const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
        order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
        try {
            const { data } = await axios.post(config.endpoint, null, { params: order });
            console.log(data)
            return res.status(StatusCodes.CREATED).json({
                data
            })
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message
            })
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi server rồi đại vương ơi!'
        })
    }
}

// callback
export async function callBack_payment(req, res) {
    let result = {};
    // console.log(JSON.parse(req.body.data))
    try {
        let dataStr = req.body.data;
        let reqMac = req.body.mac;
        let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
        console.log("mac =", mac);

        // kiểm tra callback hợp lệ (đến từ ZaloPay server)
        if (reqMac !== mac) {
            // callback không hợp lệ
            result.returncode = -1;
            result.returnmessage = "mac not equal";
        }
        else {
            const parse_dataStr = JSON.parse(dataStr)
            const apptransid = parse_dataStr.app_trans_id.split(',')

            const queryPromise = apptransid.map(value => {
                let postData = {
                    app_id: config.app_id,
                    app_trans_id: apptransid, // Input your apptransid
                }
                let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
                postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
                let postConfig = {
                    method: 'post',
                    url: process.env.END_POINT_QUERY,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: qs.stringify(postData)
                };
                const result = axios(postConfig);
                console.log(result.data);
                return result
            })

            const results = await Promise.allSettled(queryPromise);

            // update status đơn hàng
            const statusUpdatePromises = results.map((response, index) => {
                const resultData = response.data;
                if (resultData.returncode === '1') {
                    // Cập nhật trạng thái đơn hàng
                    return Orders.updateOne(
                        { _id: apptransid[index] }, // Cập nhật trạng thái cho đơn hàng tương ứng
                        {
                            status_item_order: '2'
                        }
                    );
                }
            });

            await Promise.allSettled(statusUpdatePromises);
            // thanh toán thành công
            // merchant cập nhật trạng thái cho đơn hàng
            console.log('Cập nhật thành công trạng thái đơn hàng');
            result.returncode = 1;
            result.returnmessage = "success";
        }
    } catch (ex) {
        result.returncode = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
        result.returnmessage = ex.message;
    }
    // thông báo kết quả cho ZaloPay server
    res.json(result);
};

// truy vấn trạng thái đơn hàng
export async function query_status_order(req, res) {
    const apptransid = req.params.apptransid
    let postData = {
        app_id: config.app_id,
        app_trans_id: apptransid, // Input your apptransid
    }
    let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
    postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    let postConfig = {
        method: 'post',
        url: process.env.END_POINT_QUERY,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(postData)
    };

    try {
        const result = await axios(postConfig);
        console.log(result.data)
        return res.status(StatusCodes.OK).json({
            result: result.data
        })
    } catch (error) {
        console.log(error)
    }
}