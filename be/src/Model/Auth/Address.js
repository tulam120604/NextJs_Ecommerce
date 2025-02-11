import mongoose from 'mongoose';

const Address_Schema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    about_address: {
        user_name: {
            type: String,
            minlength: 3,
            maxlength: 50,
            required: true
        },
        phone: {
            type: String,
            minlength: 10,
            maxlength: 10,
            required: true,
            match: /^[0-9]+$/
        },
        address: {
            type: String,
            minlength: 3,
            maxlength: 200,
            required: true
        },
        provinces: {
            type: String,
            required: true
        }
    },
    status_address: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true, versionKey: false
})

export default mongoose.model('Address', Address_Schema);