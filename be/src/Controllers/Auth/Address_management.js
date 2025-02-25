import Address from "../../Model/Auth/Address.js";
import Account from "../../Model/Auth/Account.js";
import { StatusCodes } from 'http-status-codes';
import { Validate_Address_User } from "../../Validates/Auth.js";

export async function create_address(req, res) {
    try {
        const user = req.user
        const user_id = req.user.id;
        if (!user || !user_id) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No user'
            })
        };
        if (user.address.length > 4) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Đã đạt đến giới hạn địa chỉ trong 1 tài khoản, vui lòng xóa bớt 1 địa chỉ!'
            })
        }
        const { error } = Validate_Address_User.validate({
            about_address: req.body.about_address,
        }, {
            abortEarly: false
        })
        if (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message
            });
        }
        const total_address = await Address.countDocuments({ user_id });
        const account_user = await Account.findOne({ _id: user_id })
        let default_address = total_address < 1;
        const data = await Address.create({
            user_id: user_id,
            about_address: req.body.about_address,
            status_address: default_address
        })
        account_user.address.push(data._id);
        await account_user.save();
        return res.status(StatusCodes.CREATED).json({
            message: 'OK',
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error
        })
    }
}

export async function get_address(req, res) {
    try {
        const data = await Address.find({ user_id: req.user.id });
        // default address
        const default_address = await Address.findOne({
            user_id: req.user.id,
            status_address: true
        })
        return res.status(StatusCodes.OK).json({
            message: 'OK',
            data,
            default_address
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error
        })
    }
}


export async function edit_address(req, res) {
    try {
        if (!req.user.id) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'no user'
            })
        }
        const data = await Address.findByIdAndUpdate(req.user.id, req.body, { new: true });
        return res.status(StatusCodes.OK).json({
            message: 'OK',
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error
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
            message: error
        })
    }
}

export async function update_default_address(req, res) {
    try {
        const id_user = req.user.id;
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
            message: error
        })
    }
}