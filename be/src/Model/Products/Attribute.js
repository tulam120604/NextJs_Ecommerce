import mongoose from 'mongoose';

const Schema_Attribute = new mongoose.Schema({
    varriants: [
        {
            name_varriant: {
                type: String,
            },
            value_varriant: [
                {
                    name_value: String,
                    stock_item: {
                        type: Number,
                        min: 0,
                        default: 0
                    },
                    price_attribute: {
                        type: Number,
                        default: 0,
                        min: 0
                    },
                    sale_quantity_attr: {
                        type: Number,
                        default: 0
                    }
                }
            ],
        }
    ]
}, { timestamps: true, versionKey: false });

export default mongoose.model('Attribute', Schema_Attribute);