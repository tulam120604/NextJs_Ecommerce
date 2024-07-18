import { StatusCodes } from 'http-status-codes';
import Account from '../../Model/Auth/Account';
import { Validate_Auth } from '../../Validates/Auth';
import brcyptjs from 'bcryptjs';

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