import mongoose from "mongoose";

const Banner_Schema = new mongoose.Schema({
    banner_name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    banner_img: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false
})

export default mongoose.model("Banner", Banner_Schema);