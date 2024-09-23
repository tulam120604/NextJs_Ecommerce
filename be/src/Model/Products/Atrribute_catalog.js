import mongoose from 'mongoose';

const Schema_Attribute_Catalog = new mongoose.Schema({
    id_account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    varriants: [
        {
            _id_varriant: {
                type: mongoose.Schema.Types.ObjectId,
                auto: true
            },
            name_varriant: {
                type: String,
            },
            hex_color: String,
            type_varriant : String,
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

export default mongoose.model('Attribute_Catalog', Schema_Attribute_Catalog);