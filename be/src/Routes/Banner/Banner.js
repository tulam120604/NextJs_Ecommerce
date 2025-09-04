import express from "express";
import { get_banner, create_banner } from "../../Controllers/Banner/Banner";
import { middleWare } from "../../middleware/Auth";

const Router_Banner = express.Router();

Router_Banner.get("/get_banner", get_banner);
Router_Banner.post("/create_banner", middleWare, create_banner);

export default Router_Banner;
