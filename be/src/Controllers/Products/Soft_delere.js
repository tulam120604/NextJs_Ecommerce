import Products from '../../Model/Products/Products';
import {StatusCodes} from 'http-status-codes';

export async function Soft_remove (req, res) {
    try {
        const data = await Products.delete({_id : req.params.id});
        if (!data) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message : "No data!"
            })
        };
        return res.status(StatusCodes.OK).json({
            message : "Done soft remove !"
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message : error.message  | 'Loi server!'
        })
    };
}