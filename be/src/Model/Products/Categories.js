import mongoose from 'mongoose';

const schema_Categories = new mongoose.Schema({
    category_name : {
        type: String,
        trim : true,
        maxlength : 50,
    },
    category_img : Object,
},
{
    timestamps: true, versionKey: false
});

export default mongoose.model('Categories' , schema_Categories);