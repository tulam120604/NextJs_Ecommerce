import Products from "../../Model/Products/Products";
import Categories from "../../Model/Products/Categories";
import { StatusCodes } from "http-status-codes";
import { validateProducts } from "../../Validates/Products";
import cloudinary from "../../utils/cloudinary";
import Attribute from "../../Model/Products/Attribute";



// create 
export async function Create_Product(req, res) {
    const { short_name, category_id } = req.body;
    const dataClient = req.body;
    try {
        if (category_id) {
            const category = await Categories.findById(category_id);
            if (!category) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "Khong co loai san pham!"
                })
            }
        }
        let checkNameCategory = await Categories.findOne({
            category_name: 'Chưa phân loại'
        })
        if (!checkNameCategory) {
            checkNameCategory = await Categories.create({
                category_name: 'Chưa phân loại'
            })
        }
        const img_upload = await cloudinary.uploader.upload(req.file.path);
        const convert_Attributes = JSON.parse(dataClient.attributes);
        const allData = {
            ...dataClient,
            category_id: category_id ? category_id : checkNameCategory._id,
            attributes: [],
            feature_product: img_upload.secure_url
        };
        const { error } = validateProducts.validate(req.body, { abortEarly: false });
        if (error) {
            const message = error.details.map(e => e.message);
            return res.status(StatusCodes.BAD_REQUEST).json({
                message
            })
        }
        const data = await Products.create(allData);
        const attribute_data = {
            id_item: data?._id,
            values: []
        }
        convert_Attributes.map(item => (
            attribute_data.values.push(
                {
                    color_item: convert_Attributes ? item.color_item : '',
                    size_item: convert_Attributes ? item.size_item : '',
                    stock_item: convert_Attributes ? item.stock_item : ''
                }
            )
        ))
        const new_attributes = await Attribute.create(attribute_data);
        await Products.findByIdAndUpdate(data._id, {
            $push: { attributes: new_attributes.values.map(item => item._id) }
        })
        return res.status(StatusCodes.CREATED).json({
            message: "Create Done",
            data
        })
    }
    catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi server rồi đại vương ơi!'
        })
    }
};