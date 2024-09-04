import mongoose from 'mongoose';

const Address_Schema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    about_address: {
        user_name: String,
        phone: String,
        address: String,
        provinces : String
    },
    status_address: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true, versionKey: false
})

export default mongoose.model('Address', Address_Schema);