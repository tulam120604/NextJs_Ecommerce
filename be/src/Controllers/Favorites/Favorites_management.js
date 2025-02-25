import Favorites from '../../Model/Products/Favorites.js';
import Products from '../../Model/Products/Products.js';
import { StatusCodes } from 'http-status-codes';


export async function list_item_favorites(req, res) {
    try {
        const { _page, _limit } = req.query;
        const options = { page: _page, limit: _limit }
        const id_user = req.user.id;
        if (!id_user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "No User"
            })
        };
        const data_favorites_by_user = await Favorites.findOne({ id_user });
        const data = await Products.paginate({
            _id: { $in: data_favorites_by_user.items }
        }, options);
        await Products.populate(data.docs, { path: 'variant' });
        for (const id_data of data.docs) {
            if (id_data.variant) {
                let current = 0;
                id_data.variant.variants.map((b) => {
                    b.value_variants.map(l => {
                        current += l.stock_variant
                    })
                })
                id_data.count_stock = current;
            }
            else {
                id_data.count_stock = id_data.stock
            }
        };
        data.docs = data.docs.filter((item) => item.count_stock > 0);
        return res.status(StatusCodes.OK).json({
            message: "OK",
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error
        })
    }
}

export async function view_item_favorite(req, res) {
    try {
        const id_user = req.user.id;
        const id_item = req.headers.id_item;
        if (!id_user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "No User"
            })
        };
        const data_favorite = await Favorites.findOne({ id_user: id_user });
        if (!data_favorite) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No data'
            })
        }
        const data = data_favorite.items.find(item => item.toString() === id_item.toString());
        return res.status(StatusCodes.OK).json({
            message: "OK",
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error
        })
    }
}

export async function add_item_to_favorite(req, res) {
    try {
        const id_user = req.user.id;
        if (!id_user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No User'
            })
        };
        let data_favorite = await Favorites.findOne({ id_user });
        if (!data_favorite) {
            data_favorite = new Favorites({
                id_user: id_user,
                items: []
            })
        }
        data_favorite.items.push(req.body.id_item);
        await data_favorite.save();
        return res.status(StatusCodes.OK).json({
            message: 'OK'
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error
        })
    }
}

export async function remove_item_favorite(req, res) {
    try {
        const id_user = req.user.id;
        const data_favorite = await Favorites.findOne({ id_user });
        if (!data_favorite) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: error.message
            })
        }
        if (!req.body.id_item) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No Item'
            })
        };
        await Favorites.updateOne(
            { id_user: id_user },
            { $pull: { items: req.body.id_item.toString() } }
        );
        return res.status(StatusCodes.OK).json({
            message: 'OK'
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error
        })
    }
}