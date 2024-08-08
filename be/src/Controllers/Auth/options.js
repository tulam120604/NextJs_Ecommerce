import { StatusCodes } from 'http-status-codes';
import Account from '../../Model/Auth/Account';
import { Validate_Auth } from '../../Validates/Auth';
import brcyptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createAccessToken, createRefeshToken } from '../../middleware/Auth';

export async function create_Account (req, res) {
    try {
        const {user_name, email, password} = req.body;
        const {error} = Validate_Auth.validate(req.body, {abortEarly : false});
        if (error) {
            const message = error.details.map(e => e.message);
            return res.status(StatusCodes.BAD_REQUEST).json({
                message
            })
        };
        const check_userName = await Account.findOne({user_name});
        if (check_userName) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message : "Ten dang nhap da ton tai !"
            })
        }
        const check_email = await Account.findOne({email});
        if (check_email) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message : "Email da ton tai!"
            })
        }
        const hassPass = await brcyptjs.hash(password, 10);
        const role = (email === 'admin@admin.com') ? 'admin_global' : (email === 'admin_v1@admin.com') ? 'admin_local' : 'user';
        const data = await Account.create({
            ... req.body,
            password : hassPass,
            role
        });
        data.password = undefined;
        return res.status(StatusCodes.CREATED).json({
            message : "Done !",
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message : error.message || 'Lỗi server rồi đại vương ơi!'
        })
    }
}


export async function Login (req, res) {
    try {
        const {email, password} = req.body;
        const check_email = await Account.findOne({email});
        if (!check_email) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message : 'Email khong dung !'
            })
        };
        const check_password = await brcyptjs.compare(password, check_email.password);
        if (!check_password) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message : "Sai mat khau !"
            })
        };
        const accessToken = createAccessToken(check_email._id);
        const refeshToken = createRefeshToken(check_email._id);
        check_email.password = undefined;
        return res.status(StatusCodes.OK).json({
            message : 'Login Done !',
            check_email,
            accessToken,
            refeshToken
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message : error.message || "Lỗi server rồi đại vương ơi!"
        })
    }
}

export async function log_out (req, res) {
    try {
        const token = req.headers.authorization;
        if (token) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message : 'No token'
            })
        }
        
    }catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message : error.message || "Lỗi server rồi đại vương ơi!"
        })
    }
}

export async function granting_premissions (req, res) {
    const id_user = req.body._id;
    try {
        const data = await Account.findOne({_id : id_user});
        if (!data) {
            return res.status(StatusCodes.NOT_FOUND).jsoN({
                message : 'No data!'
            })
        };
        data.role = 'seller';
        await data.save();
        return res.status(StatusCodes.OK).json({
            message : 'OK'
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error || "Lỗi rồi đại vương ơi!!"
        })
    }
}
