import mongoose from 'mongoose';

const schema_varriant = new mongoose.Schema({
    varriants: [
        {
            attribute: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Attribute'
            },
            stock_varriant: {
                type: Number,
                min: 0,
                default: 0,
            },
            price_varriant: {
                type: Number,
                min: 0,
                default: 0
            },
            sales_item: {
                type: Number,
                min: 0,
                default: 0
            }
        }
    ]
}, { timestamps: true, versionKey: false });

export default mongoose.model('Varriant', schema_varriant)