import { StatusCodes } from "http-status-codes";
import Account from "../../Model/Auth/Account.js";

export async function list_Account(req, res) {
  const { _page = 1, _limit = 20, _search = "" } = req.query;
  try {
    const options = {
      page: _page,
      limit: _limit,
    };
    const querry = {};
    const data = await Account.paginate(querry, options);
    const account_seller = await Account.find({ role: "seller" });
    if (!data || data.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Khong co data !",
      });
    }
    return res.status(StatusCodes.OK).json({
      message: "OK",
      data,
      account_seller,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error,
    });
  }
}

export async function get_detail_user(req, res) {
  try {
    const id_user = req.params.id ?? req.user.id;
    const data = await Account.findById(id_user).populate("address");
    if (!data) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "No data!",
      });
    }
    data.password = null;
    return res.status(StatusCodes.OK).json({
      message: "OK",
      data
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error,
    });
  }
}
