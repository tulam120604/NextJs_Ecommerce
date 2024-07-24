import Attribute from '../../Model/Products/Attribute';
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
        await Products.populate(data.docs, { path: 'category_id', select: 'category_name' });
        await Products.populate(data.docs, { path: 'attributes' });
        for (const id_data of data.docs) {
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
        // console.log(data_All)
        if (!data.docs || data.docs.length === 0) {
            return res.status(StatusCodes.OK).json({
                message: "Khong co data!",
            })
        };
        return res.status(StatusCodes.OK).json({
            message: "Done!",
            data_All : data.docs
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
        _limit = 100,
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
        await Products.populate(data.docs, { path: 'category_id', select: 'category_name' });
        await Products.populate(data.docs, { path: 'attributes' });
        for (const id_data of data.docs) {
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
        const data = await Products.findById(req.params.id).populate('attributes');
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
