import { StatusCodes } from 'http-status-codes';
import Products from '../../Model/Products/Products';
import Attribute from '../../Model/Products/Attribute';

export async function get_recycle_items(req, res) {
    const {
        _page = 1,
        _limit = 2,
    } = req.query;
    const options = {
        page: _page,
        limit: _limit
    }
    try {
        const respon = await Products.findWithDeleted({ deleted: true });
        const data = await Products.populate(respon, { path: 'category_id', select: 'category_name' })
        await Products.populate(data, { path: 'attributes' });
        for (const id_data of data) {
            if (id_data.attributes) {
                let current = 0;
                id_data.attributes.varriants.map((b) => {
                    b.size_item.map(l => {
                        current += l.stock_item
                    })
                })
                id_data.count_stock = current;
            }
            else {
                id_data.count_stock = id_data.stock
            }
        }
        return res.status(StatusCodes.OK).json({
            message: "Done!",
            data
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || "Lỗi server rồi đại vương ơi!"
        })
    }
};

export async function restore_item(req, res) {
    try {
        if (!req.params.id) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "No data!"
            })
        }
        await Products.restore({ _id: req.params.id });
        return res.status(StatusCodes.OK).json({
            message: "Restore Done!"
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || "Loi server !"
        })
    }
}


// destroy
export async function destroy_items(req, res) {
    try {
        await Products.findByIdAndDelete(req.params.id);
        await Attribute.deleteMany({ id_item: req.params.id });
        return res.status(StatusCodes.OK).json({
            message: 'Done delete!!'
        })
    } catch (error) {
        return res.statud(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || "Lỗi server rồi đại vương ơi!"
        })
    }
}