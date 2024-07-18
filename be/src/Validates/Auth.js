import Joi from 'joi';

export const Validate_Auth = Joi.object({
    user_name : Joi.string().required().trim().min(3).messages({
        'any.required': 'Ten dang nhap la bat buoc !',
        'string.empty' : 'Ten dang nhap khong duoc de trong !',
        'string.trim' : 'Ten dang nhap khong duoc phep la khoang trong !',
        'string.min': 'Ten dang nhap it nhat phai chua {#limit} ki tu !'
    }),
    email : Joi.string().email().required().messages({
        'string.any' : 'Email la bat buoc !',
        'string.empty' : 'Email khong duoc de trong !',
        'string.email' : 'Email khong dung dinh dang !',
    }),
    password : Joi.string().required().trim().min(6).messages({
        'any.required': 'Mat khau la bat buoc !',
        'string.empty' : 'Mat khau khong duoc de trong !',
        'string.trim' : 'Mat khau khong duoc phep la khoang trong !',
        'string.min' : 'Mat khau it nhat {#limit} ki tu !'
    })
})