import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import Account from "../Model/Auth/Account.js";
import blacklist_token from "../Model/Blacklist_Token/blacklist_token.js";

export async function black_list_token(tokenClient) {
  const tokenBlackList = await blacklist_token.findOne({ token: tokenClient });
  return !!tokenBlackList;
}

export function createAccessToken(user) {
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.SCERET_KEY_JWT,
    { expiresIn: "7d" }
  );
}

export function createRefeshToken(userId) {
  return jwt.sign({ userId }, process.env.SCERET_KEY_JWT, { expiresIn: "30d" });
}

export async function verify_token(token) {
  const decoded_jwt = await new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SCERET_KEY_JWT, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      resolve(decoded);
    });
  });
  const user = await Account.findOne({ _id: decoded_jwt.userId });
  return user;
}

// lấy thông tin user qua cookie
export async function middleWare_get_user_from_cookie(req, res, next) {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Không có thông tin!",
      });
    }
    if (await black_list_token(token)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Token không hợp lệ!",
      });
    }
    const user = await verify_token(token);
    req.user = user;
    return next();
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}

// check role uri adminstration
export async function middleWare(req, res, next) {
  try {
    // lay token
    const token = req.cookies.access_token;
    // console.log(cookie);
    if (!token) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Khong tim thay token!!",
      });
    }
    if (await black_list_token(token)) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Token không hợp lệ!!",
      });
    }
    const user = await verify_token(token);
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Người dùng không tồn tại!!",
      });
    }
    req.user = user;
    if (user.role === "admin_global" || user.role === "seller") {
      return next();
    } else if (user.role === "admin_local") {
      if (req.method !== "GET" && req.method !== "POST") {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: "Bạn chỉ được phép xem và thêm item!",
        });
      }
      return next();
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Bạn là kẻ giả mạo!!",
      });
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Token het han!!",
      });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Token khong hop le!!",
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Loi server!!",
    });
  }
}
