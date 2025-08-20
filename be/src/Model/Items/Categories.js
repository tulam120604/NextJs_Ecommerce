import mongoose from "mongoose";

const schema_Categories = new mongoose.Schema(
  {
    category_name: {
      type: String,
      trim: true,
      maxlength: 50,
      required: true,
    },
    category_img: {
      type: String,
      required: true,
    },
    countProduct: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Categories", schema_Categories);
