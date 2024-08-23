import Favorites from '../../Model/Products/Favorites.js';
import Products from '../../Model/Products/Products.js';
import { StatusCodes } from 'http-status-codes';


export async function list_favorites(req, res) {
    try {
        const { _page, _limit } = req.query;
        const options = { page: _page, limit: _limit }
        const id_user = req.params.id_user;
        if (!id_user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "No User"
            })
        };
        const data_favorites_by_user = await Favorites.findOne({ id_user });
        const data = await Products.paginate({
            _id: { $in: data_favorites_by_user.items }
        }, options);
        await Products.populate(data.docs, { path: 'attributes' });
        return res.status(StatusCodes.OK).json({
            message: "OK",
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Loi server roi dai vuong oi'
        })
    }
}


export async function create_favorite(req, res) {
    try {
        const { id_user } = req.body;
        if (!id_user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'NO User'
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
            message: error.message || "Loi server roi dai vuong oi!"
        })
    }
}

export async function remove_favorite(req, res) {
    try {
        const id_user = req.params.id_user;
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
            message: error.message || 'Loi server roi dai vuong oi!'
        })
    }
}