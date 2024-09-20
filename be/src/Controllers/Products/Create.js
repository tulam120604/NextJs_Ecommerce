import Products from "../../Model/Products/Products.js";
import Categories from "../../Model/Products/Categories.js";
import { StatusCodes } from "http-status-codes";
import { validateProducts } from "../../Validates/Products.js";
import cloudinary from "../../utils/cloudinary.js";
import Attribute from "../../Model/Products/Attribute.js";


// create 
export async function Create_Product(req, res) {
    const { category_id } = req.body;
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
        if (!category_id) {
            if (!checkNameCategory) {
                checkNameCategory = await Categories.create({
                    category_name: 'Chưa phân loại'
                })
            }
        }

        const images = req.files;
        const upload_img = images.map(data_img => (
            cloudinary.uploader.upload(data_img.path)
        ))
        const img_upload = await Promise.all(upload_img);
        const url_image_gallery = img_upload.map(uri_secure => uri_secure.secure_url)
        const allData = {
            ...dataClient,
            category_id: category_id ? category_id : checkNameCategory._id,
            attributes: null,
            gallery: url_image_gallery
        };
        const { error } = validateProducts.validate(req.body, { abortEarly: false });
        if (error) {
            const message = error.details.map(e => e.message);
            return res.status(StatusCodes.BAD_REQUEST).json({
                message
            })
        }
        if (dataClient.attributes) {
            const convert_Attributes = JSON.parse(dataClient.attributes);
            const varriant = convert_Attributes.map(item => (
                {
                    name_varriant: convert_Attributes ? item.name_varriant : '',
                    value_varriant: item.value_varriant.map(value =>
                    (
                        {
                            name_value: value.name_value ? value.name_value.toString() : '',
                            stock_item: value.stock_item ? value.stock_item : 0,
                            price_attribute: value.price_attribute > 0 && value.price_attribute
                        }
                    )
                    )
                }
            ));
            const attribute_data = {
                varriants: varriant,
            }
            const new_attributes = await Attribute.create(attribute_data);
            const dataRequest = {
                ...allData,
                attributes: new_attributes._id
            }
            const data = await Products.create(dataRequest);
            return res.status(StatusCodes.CREATED).json({
                message: "Create Done",
                data
            })
        }
        else {
            const data = await Products.create(allData);
            return res.status(StatusCodes.CREATED).json({
                message: "Create Done",
                data
            })
        }
    }
    catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || 'Lỗi server rồi đại vương ơi!'
        })
    }
};