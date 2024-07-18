import mongoose from 'mongoose';

const Schema_Middleware_Cart_Order = new mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Account'
    },
    items_middleware : [],
    total_price : {
        type : Number,
        required : true
    }
}, {timestamps : true, versionKey: false});

export default mongoose.model('Middleware_Cart_Order', Schema_Middleware_Cart_Order)