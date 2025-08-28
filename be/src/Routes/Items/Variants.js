import express from "express";
import {
  create_variant,
  remove_variant,
  update_variant,
} from "../../Controllers/Products/Variants.js";

const RoutesVariants = express.Router();

RoutesVariants.post("/product/variant/create", create_variant);
RoutesVariants.put("/product/variant/update", update_variant);
RoutesVariants.delete("/product/variant/remove/:id", remove_variant);


export default RoutesVariants;
