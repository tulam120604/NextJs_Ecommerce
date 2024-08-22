import Account from "../../Model/Auth/Account.js";
import Notifications from "../../Model/Notifications/Notifications.js";
import { StatusCodes } from 'http-status-codes'

export async function add_notification(req, res) {
    try {
        let receiver = req.body.receiver_id
        const find_account = await Account.findOne({ email: req.body.receiver_id });
        if (find_account) {
            receiver = find_account._id
        }
        const data_body = {
            ...req.body,
            receiver_id: receiver,
            sender_id: req.params.sender_id
        }
        if (data_body.receiver_id.toString() === req.params.sender_id.toString()) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Trùng tài khoản!'
            })
        };
        const data_notification = await Notifications.create(data_body);
        return res.status(StatusCodes.CREATED).json({
            message: 'OK',
            data_notification
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Lỗi server rồi đại vương ơi!!'
        })
    }
}

export async function get_notification(req, res) {
    try {
        const data_notification = await Notifications.find({ receiver_id: req.params.receiver_id }).sort({
            createdAt: -1
        }).populate('sender_id');
        return res.status(StatusCodes.OK).json({
            message: 'OK',
            data_notification
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Lỗi server rồi đại vương ơi!!'
        })
    }
}


export async function send_notification(req, res) {
    try {
        const data_notification = await Notifications.findOne({ _id: req.body.id_item });
        if (!data_notification) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No data!'
            })
        };
        if (!data_notification.status_message) {
            data_notification.status_message = !data_notification.status_message;
            await data_notification.save();
        }
        return res.status(StatusCodes.OK).json({
            message: 'OK'
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Lỗi server rồi đại vương ơi!!'
        })
    }
}