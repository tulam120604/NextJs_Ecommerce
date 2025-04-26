import { StatusCodes } from "http-status-codes";
import Account from "../../Model/Auth/Account.js";
import { createAccessToken } from "../../middleware/Auth.js";

async function get_google_user_infor(access_token) {
  const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    method: "get",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!res.ok) {
    return {
      error: true,
      message: "Access token không hợp lệ hoặc đã hết hạn",
    };
  }
  const data = await res.json();
  return data;
}

// authenticate với google
export async function authenticate_with_google(req, res) {
  try {
    const { access_token } = req.body;
    const infor_account_google = await get_google_user_infor(access_token);
    const role =
      get_google_user_infor?.email === "admin@admin.com"
        ? "admin_global"
        : get_google_user_infor?.email === "admin_v1@admin.com"
        ? "admin_local"
        : "user";
    const account = {
      ...infor_account_google,
      user_name: infor_account_google.name,
      email: infor_account_google.email,
      avatar: infor_account_google.picture,
      role,
    };
    const check_account = await Account.findOne({
      email: infor_account_google.email,
    });
    if (check_account) {
      // nếu mà đã có thì trả về để fe tự redirect
      const token = createAccessToken(check_account._id);
      // const refeshToken = createRefeshToken(check_account._id);
      res.cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "Lax",
        maxAge: 604800000,
      });
      return res.status(StatusCodes.OK).json({
        message: "Login Done !",
      });
    }
    const data = await Account.create(account);
    return res.status(StatusCodes.CREATED).json({
      message: "Done !",
      data,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 500,
    });
  }
}
