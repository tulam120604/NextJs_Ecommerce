import { StatusCodes } from 'http-status-codes';
import Account from '../../Model/Auth/Account.js';
import { Validate_Auth } from '../../Validates/Auth.js';
import brcyptjs from 'bcryptjs';
import Notifications from '../../Model/Notifications/Notifications.js';
import { black_list_token, createAccessToken, createRefeshToken } from '../../middleware/Auth.js';
import Blacklist_token from '../../Model/Blacklist_Token/blacklist_token.js';
import jwt from 'jsonwebtoken';

export async function create_Account(req, res) {
    try {
        const { user_name, email, password } = req.body;
        const { error } = Validate_Auth.validate(req.body, { abortEarly: false });
        if (error) {
            const message = error.details.map(e => e.message);
            return res.status(StatusCodes.BAD_REQUEST).json({
                message
            })
        };
        const check_userName = await Account.findOne({ user_name });
        if (check_userName) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Ten dang nhap da ton tai !"
            })
        }
        const check_email = await Account.findOne({ email });
        if (check_email) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Email da ton tai!"
            })
        }
        const hassPass = await brcyptjs.hash(password, 10);
        const role = (email === 'admin@admin.com') ? 'admin_global' : (email === 'admin_v1@admin.com') ? 'admin_local' : 'user';
        const data = await Account.create({
            ...req.body,
            password: hassPass,
            role
        });
        data.password = undefined;
        return res.status(StatusCodes.CREATED).json({
            message: "Done !",
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi server rồi đại vương ơi!'
        })
    }
}


export async function Login(req, res) {
    try {
        const { email, password } = req.body;
        const check_email = await Account.findOne({ email });
        if (!check_email) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: 'Email khong dung !'
            })
        };
        const check_password = await brcyptjs.compare(password, check_email.password);
        if (!check_password) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Sai mat khau !"
            })
        };
        const accessToken = createAccessToken(check_email._id);
        const refeshToken = createRefeshToken(check_email._id);
        check_email.password = undefined;
        return res.status(StatusCodes.OK).json({
            message: 'Login Done !',
            check_email,
            accessToken,
            refeshToken
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || "Lỗi server rồi đại vương ơi!"
        })
    }
}

export async function log_out(req, res) {
    try {
        const token = req.headers.authorization;
        if (token) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No token'
            })
        }

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || "Lỗi server rồi đại vương ơi!"
        })
    }
}

export async function granting_premissions(req, res) {
    const id_user = req.body.sender_id._id;
    try {
        const data = await Account.findOne({ _id: id_user });
        if (!data) {
            return res.status(StatusCodes.NOT_FOUND).jsoN({
                message: 'No data!'
            })
        };
        data.role = 'seller';
        data.user_name = req.body.user_name;
        data.email = req.body.email;
        data.phone = req.body.phone;
        await data.save();
        await Notifications.create({
            notes: 'Confirm',
            notification_message: 'Quản trị viên đã chấp nhận yêu cầu trở thành nhà phân phối trên Store88, bạn vui lòng đăng nhập lại để bắt đầu kinh doanh mặt hàng của mình.Chúc may mắn!',
            receiver_id: id_user,
            sender_id: req.body.receiver_id
        })
        return res.status(StatusCodes.OK).json({
            message: 'OK'
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error || "Lỗi rồi đại vương ơi!!"
        })
    }
}


export async function logout(req, res) {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No token'
            })
        };
        await Blacklist_token.create({ token });
        return res.status(StatusCodes.OK).json({
            message: 'OK logout!'
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error || "Lỗi rồi đại vương ơi!!"
        })
    }
}

// refesh token 
export async function refesh_token(req, res) {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No token'
            })
        };
        const check_blacklist_token = await black_list_token(token);
        if (check_blacklist_token) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Token không được sử dụng nữa!'
            })
        };
        jwt.verify(token, 'tulam', async (error, decoded) => {
            if (error === 'TokenExpiredError') {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    message: 'Token hết hạn!'
                })
            }
            if (error === 'JsonWebTokenError') {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    message: "Token không hợp lệ!"
                })
            }
            try {
                const user = await Account.findOne({_id : decoded.userId})
                if (!user) {
                    return res.status(StatusCodes.NOT_FOUND).json({
                        message: 'Không tìm thấy user!'
                    })
                }
                const new_token = createAccessToken(decoded.userId);
                return res.status(StatusCodes.OK).json({
                    message: 'OK!',
                    new_token
                })
            } catch (error) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: 'Không thể tạo token!'
                })
            }
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error || "Lỗi rồi đại vương ơi!!"
        })
    }
}
