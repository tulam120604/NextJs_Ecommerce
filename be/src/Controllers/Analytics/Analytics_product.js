import { StatusCodes } from "http-status-codes";
import Orders from "../../Model/Orders/Order.js";

export async function caculate_revenue(req, res) {
  try {
    const id_user = req.user.id;
    const role = req.user.role;
    // tính tổng giá trị các đơn hàng
    const result = await Orders.aggregate([
      {
        $unwind: "$items_order",
      },
      {
        $match: {
          "$items_order.product_id.id_user_seller.role": { $gt: "admin_global" },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$items_order.total_price_item" },
        },
      },
    ]);
    console.log(result);
    if (!id_user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "No user!",
      });
    }
    let total_revenue = 0;
    if (role === "seller") {
    }
    return total_revenue;
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error,
    });
  }
}
