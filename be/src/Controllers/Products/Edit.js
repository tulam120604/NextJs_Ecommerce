import Products from "../../Model/Products/Products.js";
import Attribute from "../../Model/Products/Attribute.js";
import { StatusCodes } from 'http-status-codes';
import { validateProducts } from "../../Validates/Products.js";
import cloudinary from "../../utils/cloudinary.js";


// edit all field
export async function edit_Product(req, res) {
    const { short_name, ...rest } = req.body;
    try {
        const check_id = await Products.findById(req.params.id);
        if (!check_id) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No data',
            })
        }
        const { error } = validateProducts.validate(req.body, { abortEarly: false });
        if (error) {
            const message = error.details.map(e => e.message);
            return res.status(StatusCodes.BAD_REQUEST).json({
                message
            })
        };
        const check_name = await Products.findOne({ short_name });
        if (check_name) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Ten san pham da ton tai!'
            })
        };
        let img_upload = Array.isArray(req.body.gallery) ? req.body.gallery : [req.body.gallery];
        if (req.files) {
            const upload_file = req.files.map(file => (
                cloudinary.uploader.upload(file.path)
            ))
            const promise_upload = await Promise.allSettled(upload_file);
            promise_upload.map(uri_secure => {
                img_upload.push(uri_secure.value.secure_url)
            });
        }
        let convert_Attributes;
        if (req.body.attributes) {
            convert_Attributes = JSON.parse(req.body.attributes);
        }
        if (convert_Attributes) {
            await Attribute.findOneAndDelete({ id_item: req.params.id });
            if (!Array.isArray(convert_Attributes)) {
                convert_Attributes = Object.keys(convert_Attributes)
                    .filter(key => !['_id', 'id_item', 'varriants', 'createdAt', 'updatedAt'].includes(key))
                    .map(key => convert_Attributes[key]);
            }
            const varriant = convert_Attributes.map(item => (
                {
                    color_item: convert_Attributes ? item.color_item : '',
                    size_item: item.size_item.map(size =>
                    (
                        {
                            name_size: size.name_size ? size.name_size.toString() : '',
                            stock_item: size.stock_item ? size.stock_item : 0,
                            price_attribute: size.price_attribute > 0 && size.price_attribute
                        }
                    )
                    )
                }
            ))
            const new_attribute = await Attribute.create({ id_item: req.params.id, varriants: varriant, })
            const dataClient = {
                ...req.body,
                attributes: null,
                gallery: img_upload
            }
            const data = await Products.findByIdAndUpdate(req.params.id, {
                $set: {
                    ...dataClient,
                    attributes: new_attribute._id
                }
            }, { new: true });
            return res.status(StatusCodes.OK).json({
                message: 'Done !',
                data
            })
        }
        else {
            const dataClient = {
                ...req.body,
                attributes: convert_Attributes,
                gallery: img_upload
            }
            const data = await Products.findByIdAndUpdate(req.params.id, dataClient, { new: true });
            return res.status(StatusCodes.OK).json({
                message: 'Done !',
                data
            })
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || "Lỗi server rồi đại vương ơi!"
        })
    }
}


// update quantity item when order 
export async function update_quantity_item(data_items_order) {
    for (let i of data_items_order) {
        if (i.product_id.attributes) {
            const data_attr = await Attribute.find({ id_item: i.product_id._id });
            for (let j of data_attr) {
                for (let k of j.varriants) {
                    if (k.color_item == i.color_item) {
                        for (let x of k.size_item) {
                            if (x.name_size) {
                                if (x.name_size == i.size_attribute_item) {
                                    x.stock_item = x.stock_item - i.quantity;
                                }
                            } else {
                                x.stock_item = x.stock_item - i.quantity;
                            }
                        }
                    }
                }
                await j.save();
            }
        }
        else {
            const data_item = await Products.find({ _id: i.product_id._id });
            for (let a of data_item) {
                a.stock = a.stock - i.quantity;
                await a.save();
            }
        }
    };
}