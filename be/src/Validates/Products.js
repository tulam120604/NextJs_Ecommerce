import Joi from 'joi';

export const validateProducts = Joi.object({
    short_name : Joi.string().min(3).max(255).trim().required().messages({
        'any.required' : 'Tên là bắt buộc!',
        'string.empty' : 'Tên không được để khoảng trống!',
        'string.min' : 'Tên đề ít nhất 3 kí tự!',
        'string.max' : 'Tên đề tối đa 255 kí tự!',
    }),
    price_product : Joi.number().min(1).required().messages({
        'any.required' : 'Giá là bắt buộc!',
        'number.min' : 'Giá tối thiểu là 1!',
        'number.empty' : 'Giá không được để khoảng trắng!'
    }),
    des_product : Joi.string().min(6).max(5000).required().messages({
        'any.required': "Mô tả là bắt buộc!",
        'string.empty': 'Mô tả không được để khoảng trắng!',
        'string.min' : 'Mô tả tối thiểu là 6 kí tự!',
        'string.max': 'Mô tả tối đa 5000 kí tự!',
    }),
    attributes : Joi.optional(),
    stock : Joi.optional(),
    category_id : Joi.string().optional(),
    made_in : Joi.string().optional(),
}) 