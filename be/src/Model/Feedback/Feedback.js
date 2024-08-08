import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';


const Feedback_Schema = new mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Account',
    },
    item_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Products',
    },
    item_order : Object,
    content_feedback  : {
        type : String,
        minLength : 3,
        maxLength: 5000,
    }
}, {timestamps : true, versionKey : false});

Feedback_Schema.plugin(mongoosePaginate);

export default mongoose.model("Feedback", Feedback_Schema);