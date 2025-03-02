import { StatusCodes } from "http-status-codes";
import Products from "../../Model/Products/Products.js";

export async function get_recycle_items(req, res) {
  const { _page, _limit } = req.query;
  try {
    const skip_product = (+_page - 1) * _limit;
    const data = await Products.findWithDeleted({ deleted: true })
      .skip(skip_product)
      .limit(+_limit)
      .populate({
        path: "category_id",
        select: "category_name",
      })
      .populate({ path: "variant" });
    for (const item of data) {
      if (item.variant) {
        let current = 0;
        item.variant.variants.map((b) => {
          b.value_variants.map((l) => {
            current += l.stock_variant;
          });
        });
        item.count_stock = current;
      } else {
        item.count_stock = item.stock;
      }
    }
    const totalPage = data.length;
    return res.status(StatusCodes.OK).json({
      message: "Done!",
      data,
      totalPages: Math.ceil(totalPage / _limit),
      currentPage: _page,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error,
    });
  }
}

export async function restore_item(req, res) {
  try {
    if (!req.params.id) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "No data!",
      });
    }
    await Products.restore({ _id: req.params.id });
    return res.status(StatusCodes.OK).json({
      message: "Restore OK!",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error,
    });
  }
}

// destroy
export async function destroy_items(req, res) {
  try {
    await Products.findByIdAndDelete(req.params.id);
    return res.status(StatusCodes.OK).json({
      message: "Deleted OK!!",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error,
    });
  }
}
