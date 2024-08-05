import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Order_Schema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    code_order: {
        type: String,
        auto: true,
        unique: true,
    },
    items_order: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                auto: true
            },
            product_id: Object,
            color_item: String,
            quantity: Number,
            size_attribute_item: String,
            price_item: Number,
            total_price_item: Number,
        }

    ],
    infor_user: {
        name_user: {
            type: String,
            trim: true,
            minleng: 2,
        },
        address: {
            type: String,
            trim: true,
            required: true
        },
        phone: {
            type: String,
            minleng: 10,
            maxLeng: 10,
            required: true,
        },
        email_user: {
            type: String,
            trim: true
        },
    },
    notes_order: String,
    status_item_order: {
        type: String,
        enum: ['1', '2', '3', '4', '5', '6'],
        default: '1'
    },
    date_time: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false, timestamps: true });

Order_Schema.pre('save', function (next) {
    if (!this.code_order) {
        const date = Date.now().toString();
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        this.code_order = `${date}-${random}`;
    }
    next();
})
Order_Schema.plugin(mongoosePaginate);


export default mongoose.model('Orders', Order_Schema);