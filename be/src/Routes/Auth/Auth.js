import express from "express";
import {
  get_profile_user,
  list_Account,
} from "../../Controllers/Auth/Get_account.js";
import {
  middleWare,
  middleWare_get_user_from_cookie,
} from "../../middleware/Auth.js";
import {
  login,
  logout,
  refesh_token,
  register,
  set_role_user_to_seller,
  update_profile_account,
} from "../../Controllers/Auth/Account_management.js";
import upload from "../../middleware/multer.js";
import { authenticate_with_google } from "../../Controllers/Auth/Google_Account.js";

const RoutesAuth = express.Router();
RoutesAuth.get("/account", middleWare, list_Account);
RoutesAuth.patch(
  "/account/update",
  upload.single("new_avatar"),
  middleWare_get_user_from_cookie,
  update_profile_account
);
RoutesAuth.get(
  "/infor_account",
  middleWare_get_user_from_cookie,
  get_profile_user
);
RoutesAuth.get("/inforshop/:id", get_profile_user);
RoutesAuth.post("/register", register);
RoutesAuth.post("/login", login);
RoutesAuth.post("/authenticate_with_google", authenticate_with_google);
RoutesAuth.post(
  "/set_role_user_to_seller",
  middleWare,
  set_role_user_to_seller
);
RoutesAuth.post("/logout", logout);
RoutesAuth.post("/refesh_token", refesh_token);

export default RoutesAuth;
