import mongoose from 'mongoose';

const Carts = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    items: [
        {
            product_id: {
                type: mongoose.Types.ObjectId,
                ref: 'Products'
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
            price_item: {
                type: Number,
                required: true,
            },
            total_price_item: {
                type: Number,
            },
            name_varriant: {
                type: String,
            },
            value_varriant: {
                type: String
            },
            status_checked: {
                type: Boolean,
                default: false,
            },
        }
    ],
    total_price: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true, versionKey: false
});
export default mongoose.model('Carts', Carts);