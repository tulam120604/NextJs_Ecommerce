import {StatusCodes} from 'http-status-codes';
import Products from '../../Model/Products/Products';

export async function get_recycle_items (req, res) {
    const {
        _page = 1,
        _limit = 2,
    } = req.query;
    const options = {
        page : _page,
        limit : _limit
    }
    try {
        const respon = await Products.findWithDeleted({deleted: true });
        const data = await Products.populate(respon, {path : 'category_id', select : 'category_name'})
        return res.status(StatusCodes.OK).json({
            message : "Done!",
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message : error.message || "Lỗi server rồi đại vương ơi!"
        })
    }
};

export async function restore_item (req, res) {
    console.log(req.params.id);
    try {
        if (!req.params.id) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message : "No data!"
            })
        }
        await Products.restore({_id : req.params.id});
        return res.status(StatusCodes.OK).json({
            message : "Restore Done!"
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message : error.message || "Loi server !"
        })
    }
}


// destroy
export async function destroy_items (req, res) {
    try {
        await Products.findByIdAndDelete(req.params.id);
        return res.status(StatusCodes.OK).json({
            message : 'Done delete!!'
        })
    } catch (error) {
        return res.statud(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message : error.message || "Lỗi server rồi đại vương ơi!"
        })
    }
}