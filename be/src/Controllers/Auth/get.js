import { StatusCodes } from 'http-status-codes';
import Account from '../../Model/Auth/Account';

export async function getAll (req, res) {
    const {
        _page = 1,
        _limit = 20,
        _search = '',
    } = req.query;
    try {
        const querry = {};
        const data = await Account.find();
        if (!data || data.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message : "Khong co data !"
            })
        }
        return res.status(StatusCodes.OK).json({
            message : "OK",
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message : error.message || "Lỗi server rồi đại vương ơi!"
        })
    }
}

export async function getDetail (req, res) {
    try {
        const data = await Account.findById(req.params.id);
        if (!data) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message : 'No data!'
            })
        };
        return res.status(StatusCodes.OK).json({
            message : "OK",
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).sjon({
            message : error.message || "Lỗi server rồi đại vương ơi!"
        })
    }
}