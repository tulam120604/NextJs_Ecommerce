import { StatusCodes } from "http-status-codes";
import Orders from "../../Model/Orders/Order.js";

export async function caculate_revenue(req, res) {
  try {
    const id_user = req.user.id;
    const role = req.user.role;
    // tính tổng giá trị các đơn hàng status = 5
    const mathStatus = {
      $match: { status_item_order: "5" },
    };

    // tách mảng items_order
    const unwindItems = {
      $unwind: "$items_order",
    };

    // nhóm
    const groupBySeller = {
      $group: {
        _id: "$items_order.product_id.seller.role", // nhóm lại theo role để lọc
        totalAmount: { $sum: "$items_order.total_price_item" }, // tính tổng doanh thu
        nameSeller: { $first: "$items_order.product_id.seller.user_name" }, // tên người bán
        emailSeller: { $first: "$items_order.product_id.seller.email" }, // email người bán
        avatarSeller: { $first: "$items_order.product_id.seller.avatar" }, // avatar người bán
        countItems: { $sum: 1 },
      },
    };
    const result = await Orders.aggregate([
      mathStatus,
      unwindItems,
      groupBySeller,
    ]);
    if (!id_user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Không tìm thấy tài khoản!",
      });
    }
    if (role === "seller") {
      const data = result.filter((role) => role.seller === "seller");
      return res.status(StatusCodes.OK).json({
        message: "OK",
        data,
      });
    }
    return res.status(StatusCodes.OK).json({
      message: "OK",
      data: result,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 500,
    });
  }
}
