import Variant from "../../Model/Products/Variant.js";
// create variant
export async function create_variant(data_variant) {
    if (!data_variant || data_variant.length < 1) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: 'Không có biến thể sản phẩm!'
        })
    };
    const arr_variant = [];
    data_variant.map(item => {
        if (item.attribute && item.attribute.trim()) {
            const value = {
                attribute: data_variant ? item.attribute : '',
                value_variants: item.value_variants.map(value =>
                (
                    {
                        name_variant: value.name_variant && value.name_variant.toString(),
                        stock_variant: value.stock_variant && value.stock_variant,
                        price_variant: value.price_variant && value.price_variant
                    }
                )
                )
            };
            arr_variant.push(value)
        }
    });
    const data = await Variant.create({ variants: arr_variant });
    return data
}