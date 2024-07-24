import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import mongoooseDelete from 'mongoose-delete';

const schema_Products = new mongoose.Schema({
    short_name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
        maxlength: 255,
    },
    feature_product: {
        type: Object,
    },
    gallery: [],
    price_product: Number,
    trending: {
        type: Boolean,
        default: false,
    },
    des_product: {
        type: String,
        minlength: 6,
        maxlength: 5000,
        required: true,
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories',
    },
    count_stock: {
        type: Number,
        default: 1,
    },
    attributes:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attribute'
    },
    stock: Number,
    made_in: {
        type: String,
    }
}, {
    timestamps: true, versionKey: false
});

schema_Products.plugin(mongoosePaginate);
schema_Products.plugin(mongoooseDelete,
    { overrideMethods: 'all' },
    { deletedAt: true },
)

export default mongoose.model('Products', schema_Products);