import { StatusCodes } from 'http-status-codes';
import Categories from '../../Model/Products/Categories';

export async function GetAllCategories (req, res) {
    try {
        let data = await Categories.find();
        // for (let i = 0; i < data.length; i++) {
        //     if(data[i].category_name === 'Tất cả') {
        //         data.filter((item) => item.category_name !== data[i].category_name)
        //     }
        // }
        const a = data.filter(item => (item.category_name !== 'Chưa phân loại'));
        data = a;
        data.sort((a, b) => {
            if(a.category_name !== 'Khác') {
                return -1
            }
            if (b.category_name !== 'Khác') {
                return 1
            }
            return 0
        })
        if(!data || data.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message : 'No data!'
            })
        }
        return res.status(StatusCodes.OK).json({
            message : 'Done',
            data
        })
    }
    catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi server rồi đại vương ơi!'
        })
    }
}