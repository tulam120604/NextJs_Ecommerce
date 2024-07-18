import Categories from '../../Model/Products/Categories';
import Products from '../../Model/Products/Products';
import { StatusCodes } from 'http-status-codes';


// get all
export async function GetAll_Admin(req, res) {
    const {
        _page = 1,
        _limit = 20,
        _sort = '',
        _search = ''
    } = req.query;
    const options = {
        page: _page,
        limit: _limit
    }
    try {
        const querry = {};
        if (_search) {
            querry.$and = [
                {
                    short_name: { $regex: new RegExp(_search, 'i') }
                }
            ];
        };
        const data = await Products.paginate(querry, options);
        const data_All = await Products.populate(data.docs, { path: 'category_id', select: 'category_name' });
        // for (let i = 0; i < data_All.length; i++) {
        //     let totalStock = 0;
        //     for (let j = 0; j < data_All[i].attributes.length; j++) {
        //         totalStock += data_All[i].attributes[j].stock_item;
        //     }
        //     data_All[i].count_stock = totalStock;
        // }
        // console.log(stock_quantity);
        // const dataCate = await Products.find().populate('category_id');
        // console.log(dataCate)
        // for (let i = 0; i < data.docs.length; i++) {
        //     // console.log(data.docs[i])
        // }
        if (!data_All || data_All.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Khong co data!",
            })
        };
        return res.status(StatusCodes.OK).json({
            message: "Done!",
            data_All
        })
    }
    catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi server rồi đại vương ơi!'
        })
    }
};


// get by categories, madeIn, panigation, ...
export async function GetAllClient(req, res) {
    const {
        _page = 1,
        _sort = '',
        _limit = 20,
        _search = '',
        _categories_id = '',
    } = req.query;
    const options = {
        page: _page,
        limit: _limit,
    };

    try {
        const querry = {};
        if (_search) {
            querry.$and = [
                {
                    short_name: { $regex: new RegExp(_search, 'i') }
                }
            ]
        };
        // if (_categories_id) {
        //     querry.categories_id = _categories_id;
        // };
        // if (_search || _categories_id) {
        //     if (_search) {
        //         querry.$and = [
        //             {
        //                 short_name: { $regex: new RegExp(_search, 'i') }
        //             }
        //         ]
        //     }
        // }
        const data = await Products.paginate(querry, options);
        if (!data) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Khong co data!"
            })
        }
        return res.status(StatusCodes.OK).json({
            message: 'Done',
            data
        })
    }
    catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi server rồi đại vương ơi!'
        })
    }
};

// get detail

export async function GetDetail(req, res) {
    try {
        const data = await Products.findById(req.params.id);
        return res.status(StatusCodes.OK).json({
            message: "Done",
            data
        })
    }
    catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || "Lỗi server rồi đại vương ơi!"
        })
    }
};
