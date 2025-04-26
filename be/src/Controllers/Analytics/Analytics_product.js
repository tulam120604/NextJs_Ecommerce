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
      // {
      //   $match: {
      //     "$items_order._id": "67c4790b88828d590bade3f5",
      //   },
      // },
      {
        $group: {
          _id: "$items_order.product_id.seller.role", // nhóm lại theo role để lọc
          totalAmount: { $sum: "$items_order.total_price_item" }, // tính tổng doanh thu
          nameSeller: { $first: "$items_order.product_id.seller.user_name"}, // tên người bán
          emailSeller: { $first: "$items_order.product_id.seller.email"}, // email người bán
          avatarSeller: { $first: "$items_order.product_id.seller.avatar"}, // avatar người bán
          countItems: { $sum : 1}
        },
      },
    ]);
    if (!id_user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "No user!",
      });
    }
    if (role === "seller") {
      const data = result.filter(role => role.seller === 'seller');
      return res.status(StatusCodes.OK).json({
        message: 'OK',
        data
      }) 
    }
    return res.status(StatusCodes.OK).json({
      message : 'OK',
      data : result
    })
  } catch (error) {
   return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 500,
    });
  }
}
