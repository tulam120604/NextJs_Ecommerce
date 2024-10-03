import mongoose from 'mongoose';

const schema_varriant = new mongoose.Schema({
    varriants: [
        {
            attribute: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Attribute'
            },
            value_variants: [
                {
                    name_variant: {
                        type: String,
                        required: true
                    },
                    stock_variant: {
                        type: Number,
                        min: 0,
                        default: 0,
                    },
                    price_variant: {
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
        }
    ]
}, { timestamps: true, versionKey: false });

export default mongoose.model('Variant', schema_varriant)