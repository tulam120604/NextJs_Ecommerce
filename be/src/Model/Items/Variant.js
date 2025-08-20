import mongoose from 'mongoose';

const schema_varriant = new mongoose.Schema({
    variants: [
        {
            attribute: {
                type: String,
                required: true
            },
            value_variants: [
                {
                    name_variant: String,
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