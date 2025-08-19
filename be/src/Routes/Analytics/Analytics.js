import express from "express";
import { caculate_revenue } from "../../Controllers/Analytics/Analytics_product.js";
import { analytics_count } from "../../Controllers/Analytics/Analytics_count.js";
import { middleWare } from "../../middleware/Auth.js";

const Router_analytics = express.Router();

Router_analytics.get(
  "/analytics/caculate_revenue",
  middleWare,
  caculate_revenue
);

// count analytics
Router_analytics.get("/analytics/summary", middleWare, analytics_count);
export default Router_analytics;
