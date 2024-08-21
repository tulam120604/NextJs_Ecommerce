import axios from 'axios';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import { StatusCodes } from 'http-status-codes';

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
    const embed_data = {
        redirecturl: "http://localhost:5000"
    };
    try {
        // đổ thông tin từ trang thanh toán
        const transID = Math.floor(Math.random() * 10000000);
        const items = [{}];
        const order = {
            app_id: config.app_id,
            app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
            app_user: "user123",
            app_time: Date.now(), // miliseconds
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount: req.body.total_price,
            description: `Store88 - Mời đại vương thanh toán đơn hàng.`,
            bank_code: "",
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