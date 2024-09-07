import axios from 'axios';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import { StatusCodes } from 'http-status-codes';
import qs from 'qs'

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
    const total_price = req.body.items_order.reduce((acc, curr) => (acc + curr.total_price_item), 0);
    const embed_data = {
        redirecturl: "http://localhost:5000/"
    };
    try {
        // đổ thông tin từ trang thanh toán
        const transID = Math.floor(Math.random() * 10000000);
        const items = req.body.items_order.map(value => ({
            id: value._id,
            quantity: value.quantity,
            price: value.total_price_item,
        }))
        const order = {
            app_id: config.app_id,
            app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
            app_user: "user123",
            app_time: Date.now(), // miliseconds
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount: total_price,
            description: `Store88 - Mời đại vương thanh toán đơn hàng.`,
            bank_code: "",
            callback_url: "https://3670-222-252-195-159.ngrok-free.app/v1/callback"
        };

        // appid|apptransid|appuser|amount|apptime|embeddata|item
        const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
        order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

        try {
            const { data } = await axios.post(config.endpoint, null, { params: order });
            // console.log(data)
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

// call back
export async function callBack_payment(req, res) {
    let result = {};

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
            // thanh toán thành công
            // merchant cập nhật trạng thái cho đơn hàng
            let dataJson = JSON.parse(dataStr, config.key2);
            console.log("update order's status = success where apptransid =", dataJson.app_trans_id);
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