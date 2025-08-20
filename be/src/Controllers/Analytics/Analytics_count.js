import { StatusCodes } from "http-status-codes";
import Products from "../../Model/Items/Products.js";
import Category from "../../Model/Items/Categories.js";
import Orders from "../../Model/Orders/Order.js";
import Account from "../../Model/Auth/Account.js";

export async function analytics_count(req, res) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Unauthorized access",
      });
    }

    let productCount;
    let categoryCount;
    let orderCount;
    let userCount;
    let sellerCount;
    let data;

    // Example of counting products, orders, and users
    if (user.role === "seller") {
      productCount = await Products.findWithDeleted().countDocuments({
        seller: user._id,
      });
      orderCount = await Orders.countDocuments({ userId: user._id });
      data = {
        productCount,
        orderCount,
      };
    } else {
      productCount = await Products.findWithDeleted().countDocuments();
      categoryCount = await Category.countDocuments();
      orderCount = await Orders.countDocuments();
      userCount = await Account.countDocuments();
      sellerCount = await Account.countDocuments({ role: "seller" });
      data = {
        productCount,
        categoryCount,
        orderCount,
        userCount,
        sellerCount,
      };
    }

    return res.status(StatusCodes.OK).json({
      message: "Analytics data retrieved successfully",
      data,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 500,
    });
  }
}
