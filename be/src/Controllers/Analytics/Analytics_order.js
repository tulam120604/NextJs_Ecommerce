import Order from "../../Model/Orders/Order.js";
import { StatusCodes } from "http-status-codes";

export async function analytics_orders(req, res) {
  try {
    const year = parseInt(req.query.year || new Date().getFullYear(), 10);
    const month = parseInt(req.query.month);
    const id_user = req.user.id;
    // const role = req.user.role;
    const start = new Date(`${year}-01-01T00:00:00Z`);
    const end = new Date(`${year + 1}-01-01T00:00:00Z`);

    const stats = await Order.aggregate([
      {
        $match: {
          status_item_order: "5",
          date_time: { $gte: start, $lt: end },
        },
      },
       { $unwind: "$items_order" },
      ...(id_user
        ? [
            {
              $match: {
                "items_order.product_id.seller._id": id_user,
              },
            },
          ]
        : []),
      {
        $group: {
          _id: { month: { $month: "$date_time" } },
          totalOrders: { $sum: 1 },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);
    // chuẩn hóa output cho FE
    const result = Array.from({ length: 12 }, (_, i) => {
      const stat = stats.find((s) => s._id.month === i + 1);
      return {
        month: i + 1,
        totalOrders: stat ? stat.totalOrders : 0,
      };
    });
    return res.status(StatusCodes.OK).json({
      message: "Success",
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 500,
      error: true,
    });
  }
}
