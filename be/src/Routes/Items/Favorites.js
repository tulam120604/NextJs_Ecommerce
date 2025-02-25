import express from "express";
import {
  add_item_to_favorite,
  list_item_favorites,
  remove_item_favorite,
  view_item_favorite,
} from "../../Controllers/Favorites/Favorites_management.js";
import { middleWare_get_user_from_cookie } from "../../middleware/Auth.js";

const Routes_Favorites = express.Router();

Routes_Favorites.get(
  "/list_item_favorite",
  middleWare_get_user_from_cookie,
  list_item_favorites
);
Routes_Favorites.get(
  "/view_item_favorite",
  middleWare_get_user_from_cookie,
  view_item_favorite
);
Routes_Favorites.post(
  "/add_item_favorite",
  middleWare_get_user_from_cookie,
  add_item_to_favorite
);
Routes_Favorites.post(
  "/remove_item_favorite",
  middleWare_get_user_from_cookie,
  remove_item_favorite
);

export default Routes_Favorites;
