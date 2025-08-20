import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const SchemaFavorite = new mongoose.Schema({
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products'
        }
    ]
}, { timestamps : true, versionKey : false });

SchemaFavorite.plugin(mongoosePaginate);

export default mongoose.model('Favorites', SchemaFavorite);