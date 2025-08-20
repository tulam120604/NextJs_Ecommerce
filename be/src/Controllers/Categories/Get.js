import { StatusCodes } from 'http-status-codes';
import Categories from '../../Model/Items/Categories.js';

export async function GetAllCategories(req, res) {
    try {
        let data = await Categories.find();
        data = data.filter(item => (item.category_name !== 'Chưa phân loại'));
        data.sort((a, b) => {
            if (a.category_name !== 'Khác') {
                return -1
            }
            if (b.category_name !== 'Khác') {
                return 1
            }
            return 0
        })
        if (!data || data.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No data!'
            })
        }
        return res.status(StatusCodes.OK).json({
            message: 'OK',
            data
        })
    }
    catch (error) {
       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 500,
    });
    }
}

export async function Get_detail_category(req, res) {
    try {
        const data = await Categories.findById(req.params.id_category);
        return res.status(StatusCodes.OK).json({
            message: 'OK',
            data
        })
    } catch (error) {
       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 500,
    });
    }
}