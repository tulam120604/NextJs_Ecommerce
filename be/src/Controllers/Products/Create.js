import Products from "../../Model/Products/Products.js";
import Categories from "../../Model/Products/Categories.js";
import { StatusCodes } from "http-status-codes";
import { validateProducts } from "../../Validates/Products.js";
import cloudinary from "../../utils/cloudinary.js";
import { create_variant } from "./Create_variant.js";
import { upload_img } from "../../middleware/upload.js";


// create 
export async function Create_Product(req, res) {
    const { category_id } = req.body;
    const id_user = req.user.id
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
        const img_upload = await upload_img(images);
        const url_image_gallery = img_upload.map(uri_secure => uri_secure.secure_url)
        const allData = {
            ...dataClient,
            category_id: category_id ? category_id : checkNameCategory._id,
            id_user_seller: id_user,
            gallery: url_image_gallery,
            variant: null,
        };
        const { error } = validateProducts.validate(req.body, { abortEarly: false });
        if (error) {
            const message = error.details.map(e => e.message);
            return res.status(StatusCodes.BAD_REQUEST).json({
                message
            })
        }
        if (dataClient.variant) {
            const convert_variant = JSON.parse(dataClient.variant);
            const variant = await create_variant(convert_variant);
            const dataRequest = {
                ...allData,
                variant: variant._id
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
            message: error
        })
    }
};