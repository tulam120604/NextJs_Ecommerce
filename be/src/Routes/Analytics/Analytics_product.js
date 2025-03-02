import express from "express";
import { caculate_revenue } from "../../Controllers/Analytics/Analytics_product.js";
import { middleWare } from "../../middleware/Auth.js";

const Router_analytics = express.Router();

Router_analytics.get(
  "/analytics/caculate_revenue",
  middleWare,
  caculate_revenue
);

export default Router_analytics;
