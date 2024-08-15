import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import Account from '../Model/Auth/Account';
import blacklist_token from '../Model/Blacklist_Token/blacklist_token';


export async function black_list_token(tokenClient) {
    const tokenBlackList = await blacklist_token.findOne({ token: tokenClient });
    return !!tokenBlackList
}

export function createAccessToken(userId) {
    return jwt.sign({ userId }, 'tulam', { expiresIn: '1d' })
}

export function createRefeshToken(userId) {
    return jwt.sign({ userId }, 'tulam', { expiresIn: '7d' })
}


export async function middleWare(req, res, next) {
    try {
        // lay token
        if (!req.headers.authorization) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Khong tim thay token !"
            })
        }
        const token = req.headers.authorization.split(" ")[1];
        if (await black_list_token(token)) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: 'Token không hợp lệ!!'
            })
        }
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, 'tulam', (error, decoded) => {
                if (error) {
                    return reject(error)
                }
                resolve(decoded)
            })
        });
        const user = await Account.findOne({ _id: decoded.userId });
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: 'Người dùng không tồn tại!!'
            })
        };
        if (user.role === 'admin_global' || user.role === 'seller') {
            return next();
        }
        else if (user.role === 'admin_local') {
            if (req.method !== 'GET' && req.method !== 'POST') {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    message: 'Bạn chỉ được phép xem và thêm item!'
                })
            }
            return next();
        }
        else {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: 'Bạn là kẻ giả mạo!!'
            })
        }
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Token het han !"
            })
        }
        else if (error.name === 'JsonWebTokenError') {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Token khong hop le !"
            })
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Loi server'
        })
    }
}
