import Products from "../../Model/Items/Products.js";
import { StatusCodes } from "http-status-codes";

// hàm chung tham chiếu sang danh mục, biến thể sản phẩm và tính toán số lượng
async function populate_and_caculation_quantity(querry, options, mode) {
  let data;
  if (mode === "dashboard") {
    const skip_product = (+options.page - 1) * +options.limit;
    const [docs, totalDocs] = await Promise.all([
      Products.findWithDeleted(querry)
        .skip(skip_product)
        .limit(+options.limit)
        .sort(options.sort)
        .lean(),
      Products.findWithDeleted(querry).countDocuments(),
    ]);
    await Products.populate(docs, [
      {
        path: "category_id",
        select: "category_name",
      },
      { path: "variant" },
    ]);
    data = {
      docs,
      totalDocs,
      totalPages: Math.ceil(totalDocs / +options.limit),
    };
  } else {
    data = await Products.paginate(querry, options);
    await Products.populate(data.docs, [
      {
        path: "category_id",
        select: "category_name",
      },
      { path: "variant" },
    ]);
    // await Products.populate(data.docs, );
  }
  for (const item of data.docs) {
    if (item.variant) {
      let current = 0;
      item.variant.variants.forEach((b) => {
        b.value_variants.forEach((l) => {
          current += l.stock_variant;
        });
      });
      item.count_stock = current;
    } else {
      item.count_stock = item.stock;
    }
  }
  return data;
}

// list item dashboard
export async function list_product_dashboard(req, res) {
  const { _page = 1, _limit = 20, _search = "" } = req.query;
  const options = {
    page: _page,
    limit: _limit,
    sort: { createdAt: -1 },
  };
  try {
    const role_user = req.user.role;
    const id_user = req.user.id;
    let querry = {};
    if (role_user === "seller") {
      querry = { seller: id_user };
    }
    // const check_user
    if (_search) {
      querry.$and = [
        {
          short_name: { $regex: new RegExp(_search, "i") },
        },
      ];
    }
    const data = await populate_and_caculation_quantity(
      querry,
      options,
      "dashboard"
    );
    if (!data.docs || data.docs.length === 0) {
      return res.status(StatusCodes.OK).json({
        message: "Khong co du lieu!",
      });
    }
    return res.status(StatusCodes.OK).json({
      message: "OK!",
      data,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 500,
    });
  }
}

// list item client
export async function list_product_client(req, res) {
  const { _page = 1, _limit = 100, _search = "", _bestseller = "" } = req.query;

  const sort = _bestseller ? { sale_quantity: -1 } : { createdAt: -1 };
  const options = {
    page: _page,
    limit: _limit,
    sort: sort,
  };
  try {
    let querry = {};
    const seller = req.headers["id_user_seller"];
    if (seller) {
      querry = { seller };
    }
    if (_search) {
      querry.$and = [
        {
          short_name: { $regex: new RegExp(_search, "i") },
        },
      ];
    }
    const data = await populate_and_caculation_quantity(
      querry,
      options,
      "client"
    );
    data.docs = data.docs.filter((item) => item.count_stock > 0);
    if (!data) {
      return res.status(StatusCodes.OK).json({
        message: "Khong co data!",
      });
    }
    return res.status(StatusCodes.OK).json({
      message: "Done",
      data,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 500,
    });
  }
}

// get product detail client
export async function view_detail_product_client(req, res) {
  try {
    const data = await Products.findById(req.params.id).populate("variant");
    if (data.variant) {
      let quantity_sales = 0;
      data.variant.variants = data.variant.variants.map((item) => {
        for (let i of item.value_variants) {
          quantity_sales += i.sales_item;
        }
        const dataAttr = item.value_variants.filter(
          (attr) => attr.stock_variant > 0
        );
        return {
          ...item,
          size_item: dataAttr,
        };
      });
      data.sale_quantity = quantity_sales;
      // console.log(data.sale_quantity)
      await data.save();
    }
    return res.status(StatusCodes.OK).json({
      message: "Done",
      data,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 500,
    });
  }
}

// get detail product dashboard
export async function view_detail_product_dashboard(req, res) {
  try {
    const data = await Products.findById(req.params.id)
      .populate("category_id")
      .populate("variant");
    return res.status(StatusCodes.OK).json({
      message: "Done",
      data,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 500,
    });
  }
}

// get by category
export async function list_product_by_category(req, res) {
  try {
    const { _page = 1, _limit = 100, _search = "", _sort = "" } = req.query;
    const options = {
      page: _page,
      limit: _limit,
    };
    let querry = {
      category_id: req.params.category_id,
    };
    const id_current_product = req.headers["id_current_product"];
    if (id_current_product) {
      querry = {
        ...querry,
        _id: { $ne: id_current_product },
      };
    }
    if (_search) {
      querry.$and = [
        {
          short_name: { $regex: new RegExp(_search, "i") },
        },
      ];
    }
    const data = await populate_and_caculation_quantity(
      querry,
      options,
      "client"
    );
    data.docs = data.docs.filter((item) => item.count_stock > 0);
    return res.status(StatusCodes.OK).json({
      message: "Done!",
      data,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 500,
    });
  }
}

// search
export async function search_product(req, res) {
  const { _search = "" } = req.query;
  try {
    const querry = {};
    if (_search) {
      querry.$and = [
        {
          short_name: { $regex: RegExp(_search, "i") },
        },
      ];
    }
    const data = await Products.find(querry);
    return res.status(StatusCodes.OK).json({
      message: "Done",
      data,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 500,
    });
  }
}
