import jwt from 'jsonwebtoken';
import {StatusCodes} from 'http-status-codes';
import Account from '../Model/Auth/Account';

export async function middleWare (req, res, next) {
    try {
        // lay token
        if (!req.headers.authorization) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message : "Khong tim thay token !"
            })
        }
        const token = req.headers.authorization.split(" ")[1];
        const user = await jwt.verify(token , 'admin', async (error, decoded) => {
            if (error) {
                if (error.name === 'TokenExpiredError') {
                    return res.status(StatusCodes.UNAUTHORIZED).json({
                        message : "Token het han !"
                    })
                }
                if (error.name === 'JsonWebTokenError') {
                    return res.status(StatusCodes.UNAUTHORIZED).json({
                        message : "Token khong hop le !"
                    })
                }
            }
            return await Account.findOne({_id : decoded.id })
        });
        if (user.role === 'admin_global') {
            next();
        }
        else if (user.role === 'admin_local') {
            if (req.method !== 'GET') {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    message : "Ban chi duoc phep xem va them item !"
                })
            }
            next();
        }
        else {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message : "Ban khong thuoc quan tri vien !"
            })
        }
    } catch (error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message : error.message || 'Loi server'
        })
    }

}