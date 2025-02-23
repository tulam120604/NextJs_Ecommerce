import Products from "../../Model/Products/Products.js";
import { StatusCodes } from "http-status-codes";

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
      querry = { id_user_seller: id_user };
    }
    // const check_user
    if (_search) {
      querry.$and = [
        {
          short_name: { $regex: new RegExp(_search, "i") },
        },
      ];
    }
    const data = await Products.paginate(querry, options);
    await Products.populate(data.docs, {
      path: "category_id",
      select: "category_name",
    });
    await Products.populate(data.docs, { path: "variant" });
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
    if (!data.docs || data.docs.length === 0) {
      return res.status(StatusCodes.OK).json({
        message: "Khong co data!",
      });
    }
    return res.status(StatusCodes.OK).json({
      message: "OK!",
      data,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error
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
    const id_user_seller = req.headers["id_user_seller"];
    if (id_user_seller) {
      querry = { id_user_seller: id_user_seller };
    }
    if (_search) {
      querry.$and = [
        {
          short_name: { $regex: new RegExp(_search, "i") },
        },
      ];
    }
    const data = await Products.paginate(querry, options);
    await Products.populate(data.docs, {
      path: "category_id",
      select: "category_name",
    });
    await Products.populate(data.docs, { path: "variant" });
    for (const item of data.docs) {
      if (item.variant) {
        let current = 0;
        let quantity_sale = 0;
        item.variant.variants.map((b) => {
          b.value_variants.map((l) => {
            current += l.stock_variant;
            quantity_sale += l.sales_item;
          });
        });
        item.count_stock = current;
        item.sale_quantity = quantity_sale;
      } else {
        item.count_stock = item.stock;
      }
    }
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
      message: error
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
      message: error
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
      message: error
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
    const data = await Products.paginate(querry, options);
    await Products.populate(data.docs, {
      path: "category_id",
      select: "category_name",
    });
    await Products.populate(data.docs, { path: "variant" });
    for (const id_data of data.docs) {
      if (id_data.variant) {
        let current = 0;
        id_data.variant.variants.map((b) => {
          b.value_variants.map((l) => {
            current += l.stock_variant;
          });
        });
        id_data.count_stock = current;
      } else {
        id_data.count_stock = id_data.stock;
      }
    }
    data.docs = data.docs.filter((item) => item.count_stock > 0);
    return res.status(StatusCodes.OK).json({
      message: "Done!",
      data,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error
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
      message: error
    });
  }
}
