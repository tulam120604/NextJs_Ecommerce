import Account from "../../Model/Auth/Account.js";
import Orders from "../../Model/Orders/Order.js";
import { StatusCodes } from "http-status-codes";

// list item user order by user
export async function list_item_order_by_user(req, res) {
  try {
    const user_id = req.user.id;
    const { _page = 1, _limit = 3, _status_item = "" } = req.query;
    const options = {
      page: _page,
      limit: _limit,
      sort: { date_time: -1 },
    };
    const check_user = await Account.findById(user_id);
    if (!check_user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "No user!",
      });
    }

    const querry = { user_id: user_id };
    if (_status_item) {
      querry.$and = [{ status_item_order: _status_item }];
    }
    const totalItems = await Orders.countDocuments(querry);
    const data_order = await Orders.paginate(querry, options);
    console.log();
    return res.status(StatusCodes.OK).json({
      message: "OK",
      data_order,
      totalItems,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 500,
    });
  }
}

// list item user order by dashboard
export async function list_item_order_by_dashboard(req, res) {
  try {
    const user_id = req.user.id;
    const check_user = await Account.findById(user_id);
    const { _page = 1, _limit = 20 } = req.query;
    const options = {
      page: _page,
      limit: _limit,
      sort: { date_time: -1 },
    };
    let querry = {};
    // neu quyen use la admin thi tra ve tat ca item order, khong thi chi tra ve item cua nguoi ban hang
    if (check_user.role === "seller") {
      querry = {
        items_order: {
          $elemMatch: {
            "product_id.seller": user_id,
          },
        },
      };
    }
    const data_order = await Orders.paginate(querry, options);
    return res.status(StatusCodes.OK).json({
      message: "OK",
      data_order,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 500,
    });
  }
}

// get one order
export async function view_detail_order(req, res) {
  try {
    const { id } = req.query;
    const user_id = req.user.id;
    let data_order_by_user;
    const data_order_by_id = await Orders.findOne({ _id: id.toString() });
    if (user_id) {
      data_order_by_user = await Orders.findOne({
        _id: id.toString(),
        user_id: user_id,
      });
    }
    return res.status(StatusCodes.OK).json({
      message: "OK",
      data_order_by_user,
      data_order_by_id,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 500,
    });
  }
}

// list item order shipper
export async function list_item_order_by_shipper(req, res) {
  try {
    const { _page = 1, _limit = 20, _search = "" } = req.query;
    const options = {
      page: _page,
      limit: _limit,
      sort: { date_time: -1 },
    };
    const querry = {
      status_item_order: "4",
    };
    if (_search) {
      querry.$and = [
        {
          code_order: { $regex: new RegExp(_search, "i") },
        },
      ];
    }
    const data = await Orders.paginate(querry, options);
    return res.status(StatusCodes.OK).json({
      message: "OK",
      data,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 500,
    });
  }
}
