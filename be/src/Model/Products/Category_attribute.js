import mongoose from "mongoose";

const schema_category_attribute = new mongoose.Schema({
    name_category_attribute: {
        type: String,
        required: true,
        unique: true
    },
    category_attribute: {
        type: String,
        required: true,
        unique: true
    },
    id_account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }
}, { timestamps: true, versionKey: false });

export default mongoose.model('Category_attribute', schema_category_attribute);