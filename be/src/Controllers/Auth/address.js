import Address from "../../Model/Auth/Address.js";
import { StatusCodes } from 'http-status-codes';

export async function create_address(req, res) {
    try {
        const user_id = req.params.user_id;
        if (!user_id) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No user'
            })
        };
        const total_address = await Address.countDocuments({ user_id });
        let default_address;
        if (total_address < 1) {
            default_address = true
        } else {
            default_address = false
        }
        const data = await Address.create({
            user_id: user_id,
            about_address: req.body.about_address,
            status_address: default_address
        })
        return res.status(StatusCodes.OK).json({
            message: 'OK',
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi rồi đại vương ơi!'
        })
    }
}

export async function get_address(req, res) {
    try {
        const data = await Address.find({ user_id: req.params.user_id });
        // default address
        const default_address = await Address.findOne({
            user_id: req.params.user_id,
            status_address: true
        })
        return res.status(StatusCodes.OK).json({
            message: 'OK',
            data,
            default_address
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi rồi đại vương ơi!'
        })
    }
}


export async function edit_address(req, res) {
    try {
        if (id_user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No user'
            })
        };
        if (!req.params.id) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'no user'
            })
        }
        const data = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(StatusCodes.OK).json({
            message: 'OK',
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi rồi đại vương ơi!'
        })
    }
}

export async function remove_address(req, res) {
    try {
        if (!req.params.id) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No data'
            })
        };
        await Address.findByIdAndDelete(req.params.id);
        return res.status(StatusCodes.OK).json({
            message: 'OK',
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi rồi đại vương ơi!'
        })
    }
}

export async function update_default_address(req, res) {
    try {
        const id_user = req.params.id_user;
        const id_address = req.body.id_address;
        const data_address = await Address.find({ user_id: id_user });
        if (!data_address) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No Data!'
            })
        }
        for (let i of data_address) {
            if (i._id.toString() === id_address.toString()) {
                i.status_address = true;
            } else {
                i.status_address = false;
            }
            await i.save();
        };
        return res.status(StatusCodes.OK).json({
            message: 'OK'
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi rồi đại vương ơi!'
        })
    }
}