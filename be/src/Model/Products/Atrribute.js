import mongoose from 'mongoose';

const schema_attribute = new mongoose.Schema({
    id_account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    attribute: {
        type: String,
        required: true
    },
    attribute_category: {
        type: String,
        required: true
    },
    symbol_attribute: String
}, { timestamps: true, versionKey: false });

export default mongoose.model('Attribute', schema_attribute);