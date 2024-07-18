import Account from '../../Model/Auth/Account';
import {StatusCodes} from 'http-status-codes';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import { Validate_Auth } from '../../Validates/Auth';

export async function Login (req, res) {
    try {
        const {email, password} = req.body;
        const check_email = await Account.findOne({email});
        if (!check_email) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message : 'Email khong dung !'
            })
        };
        const check_password = await  bcryptjs.compare(password, check_email.password);
        if (!check_password) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message : "Sai mat khau !"
            })
        };
        const token = jwt.sign({id: check_email._id}, 'admin', {expiresIn : '7d'});
        check_email.password = undefined;
        return res.status(StatusCodes.OK).json({
            message : 'Login Done !',
            check_email,
            token
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message : error.message || "Lỗi server rồi đại vương ơi!"
        })
    }
}