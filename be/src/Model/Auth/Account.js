import mongoose from 'mongoose';

const schema_Auth = new mongoose.Schema({
    user_name : {
        type : String,
        minglength :3,
        trim : true,
        required : true,
    },
    email : {
        type : String,
        trim : true,
        required : true,
    },
    password : {
        type: String,
        min : 6,
        trim : true,
        required : true,
    },
    role: {
        type : String,
        enum : ['admin_global', 'admin_local', 'user'],
        default : 'user',
    }
},  
{
    timestamp : true, versionKey : false
});

export default mongoose.model('Account', schema_Auth);