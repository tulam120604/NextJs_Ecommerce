import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';


const Comments_Schema = new mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Account',
    },
    item_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Products',
    },
    content  : {
        type : String,
        minLength : 3,
        maxLength: 2500,
    }
}, {timestamps : true, versionKey : false});

Comments_Schema.plugin(mongoosePaginate);

export default mongoose.model("Comment", Comments_Schema);