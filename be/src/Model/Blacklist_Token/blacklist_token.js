import  mongoose from 'mongoose';

const Blacklist_Token_Schema = new mongoose.Schema({
    token : String,
    expiryDate : Date
});

export default mongoose.model('BlackList_Token', Blacklist_Token_Schema);