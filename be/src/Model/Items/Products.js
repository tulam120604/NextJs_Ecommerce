import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongoooseDelete from "mongoose-delete";
import Categories from "./Categories";

const schema_Products = new mongoose.Schema(
  {
    short_name: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    gallery: [],
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    price_product: Number,
    trending: {
      type: Boolean,
      default: false,
    },
    des_product: {
      type: String,
      minlength: 6,
      maxlength: 5000,
      required: true,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
    count_stock: {
      type: Number,
      default: 0,
    },
    sale_quantity: {
      type: Number,
      default: 0,
    },
    variant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Variant",
    },
    stock: Number,
    made_in: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

schema_Products.index({ short_name: 1 });

schema_Products.plugin(mongoosePaginate);
schema_Products.plugin(mongoooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

schema_Products.post("save", async function (doc, next) {
  try {
    await Categories.findByIdAndUpdate(doc.category_id, {
      $inc: { countProduct: 1 },
    });
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model("Products", schema_Products);
