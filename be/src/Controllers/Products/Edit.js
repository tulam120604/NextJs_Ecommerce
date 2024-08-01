import Products from "../../Model/Products/Products";
import Attribute from "../../Model/Products/Attribute";
import {StatusCodes} from 'http-status-codes';
import { validateProducts } from "../../Validates/Products";
import cloudinary from "../../utils/cloudinary";


// edit all field
export async function edit_Product (req, res) {
    const {short_name, ...rest} = req.body;
    try {
        const check_id = await Products.findById(req.params.id);
        if (!check_id) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message :  'No data',
            })
        }
        const {error} = validateProducts.validate(req.body, {abortEarly : false});
        if (error) {
            const message = error.details.map(e =>  e.message);
            return res.status(StatusCodes.BAD_REQUEST).json({
                message
            })
        };
        // const check_edit = await Products.find({...rest});
        // if (check_edit) {
        //     return res.status(StatusCodes.NO_CONTENT).json({
        //         message : 'Khong co gi thay doi!'
        //     })
        // };
        // console.log(check_edit)

        const check_name = await Products.findOne({short_name});
        if (check_name) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message : 'Ten san pham da ton tai!'
            })
        };
        let img_upload;
        if (!req.body.feature_product) {
            img_upload = await cloudinary.uploader.upload(req.file.path);
        }
        let convert_Attributes;
        if (req.body.attributes) {
         convert_Attributes = JSON.parse(req.body.attributes);
        }
        if(convert_Attributes){
            await Attribute.findOneAndDelete({id_item : req.params.id});
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
            const new_attribute = await Attribute.create({id_item: req.params.id,varriants: varriant,})
            const dataClient = {
                ... req.body,
                attributes : null,
                feature_product : img_upload ? img_upload.secure_url : req.body.feature_product
            }
            const data = await Products.findByIdAndUpdate(req.params.id, {
                $set : {
                ...dataClient,
                attributes : new_attribute._id}
            }, {new : true});
            return res.status(StatusCodes.OK).json({
                message : 'Done !',
                data
            })
        }
        else {
            const dataClient = {
                ... req.body,
                attributes : convert_Attributes,
                feature_product : img_upload ? img_upload.secure_url : req.body.feature_product
            }
            const data = await Products.findByIdAndUpdate(req.params.id,dataClient, {new : true});
            return res.status(StatusCodes.OK).json({
                message : 'Done !',
                data
            })
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message : error.message || "Lỗi server rồi đại vương ơi!"
        })
    }
}

// edit one field

// export async function edit_Field_Product (req, res) {
//     try {
        
//     } catch (error) {
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//             message : error.message || "Loi server!"
//         })
//     }
// }