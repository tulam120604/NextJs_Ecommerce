import Products from '../../Model/Products/Products';
import { StatusCodes } from 'http-status-codes';


// get all
export async function get_Item_Dashboard(req, res) {
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
        if (!data.docs || data.docs.length === 0) {
            return res.status(StatusCodes.OK).json({
                message: "Khong co data!",
            })
        };
        return res.status(StatusCodes.OK).json({
            message: "Done!",
            data
        })
    }
    catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi server rồi đại vương ơi!'
        })
    }
};


// get by categories, madeIn, panigation, ...
export async function get_Item_Client(req, res) {
    const {
        _page = 1,
        _sort = '',
        _limit = 100,
        _search = '',
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
        const data = await Products.paginate(querry, options);
        await Products.populate(data.docs, { path: 'category_id', select: 'category_name' });
        await Products.populate(data.docs, { path: 'attributes' });
        for (const id_data of data.docs) {
            if (id_data.attributes) {
                let current = 1;
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
        };
        data.docs = data.docs.filter((item) => item.count_stock > 0);
        if (!data) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Khong co data!"
            })
        }
        return res.status(StatusCodes.OK).json({
            message: 'Done',
            data,
        })
    }
    catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi server rồi đại vương ơi!'
        })
    }
};

// get detail

export async function get_Detail_Client(req, res) {
    try {
        const data = await Products.findById(req.params.id).populate('attributes');
        if (data.attributes) {
            data.attributes.varriants = data.attributes.varriants.map(item => {
                const dataAttr = item.size_item.filter(attr => attr.stock_item > 0)
                return {
                    ...item,
                    size_item: dataAttr
                }
            })
            await data.save()
        }
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


export async function get_Detail_Dashboard(req, res) {
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

// get by category
export async function get_item_by_category(req, res) {
    const {
        _page = 1,
        _limit = 100,
        _search = '',
        _sort = '',
    } = req.query;
    try {
        const options = {
            page: _page,
            limit: _limit
        }
        const querry = {
            category_id: req.params.category_id
        };
        if (_search) {
            querry.$and = [
                {
                    short_name: { $regex: new RegExp(_search, 'i') }
                }
            ]
        }
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
        return res.status(StatusCodes.OK).json({
            message: 'Done!',
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi rồi đại vương ơi!'
        })
    }
}

// search
export async function search_Item(req, res) {
    const {
        _search = ''
    } = req.query;
    try {
        const querry = {};
        if (_search) {
            querry.$and = [
                {
                    short_name: { $regex: RegExp(_search, 'i') }
                }
            ]
        }
        const data = await Products.find(querry);
        return res.status(StatusCodes.OK).json({
            message: 'Done',
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi rồi đại vương ơi!'
        })
    }
}
