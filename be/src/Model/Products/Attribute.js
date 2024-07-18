import mongoose from 'mongoose';

const Schema_Attribute = new mongoose.Schema({
    id_item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
    },
    values: [
        {
            color_item: {
                type: String,
            },
            size_item: {
                type: String,
            },
            stock_item: {
                type: Number,
                required: true,
                min: 1,
            },
        }
    ]
}, { timestamps: true, versionKey: false });

export default mongoose.model('Attributes', Schema_Attribute);