import Joi from 'joi';

export const validateProducts = Joi.object({
    short_name : Joi.string().min(3).max(255).trim().required().messages({
        'any.required' : 'Tên là bắt buộc!',
        'string.empty' : 'Tên không được để khoảng trống!',
        'string.min' : 'Tên đề ít nhất 3 kí tự!',
        'string.max' : 'Tên đề tối đa 255 kí tự!',
    }),
    price_product : Joi.optional(),
    des_product : Joi.string().min(6).max(5000).required().messages({
        'any.required': "Mô tả là bắt buộc!",
        'string.empty': 'Mô tả không được để khoảng trắng!',
        'string.min' : 'Mô tả tối thiểu là 6 kí tự!',
        'string.max': 'Mô tả tối đa 5000 kí tự!',
    }),
    feature_product : Joi.optional(),
    attributes : Joi.optional(),
    stock : Joi.optional(),
    category_id : Joi.string().optional(),
    made_in : Joi.string().optional(),
}) 