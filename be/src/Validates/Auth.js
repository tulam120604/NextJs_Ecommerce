import Joi from 'joi';

export const Validate_Auth = Joi.object({
    user_name: Joi.string().required().trim().min(3).messages({
        'any.required': 'Ten dang nhap la bat buoc !',
        'string.empty': 'Ten dang nhap khong duoc de trong !',
        'string.trim': 'Ten dang nhap khong duoc phep la khoang trong !',
        'string.min': 'Ten dang nhap it nhat phai chua {#limit} ki tu !'
    }),
    email: Joi.string().email().required().messages({
        'string.any': 'Email la bat buoc !',
        'string.empty': 'Email khong duoc de trong !',
        'string.email': 'Email khong dung dinh dang !',
    }),
    password: Joi.string().required().trim().min(6).messages({
        'any.required': 'Mat khau la bat buoc !',
        'string.empty': 'Mat khau khong duoc de trong !',
        'string.trim': 'Mat khau khong duoc phep la khoang trong !',
        'string.min': 'Mat khau it nhat {#limit} ki tu !'
    })
})


// Joi schema để validate địa chỉ
export const Validate_Address_User = Joi.object({
    about_address: Joi.object({
        user_name: Joi.string().min(3).max(50).required().messages({
            'string.base': 'Tên người phải là chuỗi',
            'string.min': 'Tên người phải có ít nhất 3 ký tự',
            'string.max': 'Tên người không được vượt quá 50 ký tự',
            'any.required': 'Tên người là bắt buộc'
        }),
        phone: Joi.string().length(10).pattern(/^[0-9]+$/).required().messages({
            'string.base': 'Số điện thoại phải là chuỗi',
            'string.length': 'Số điện thoại phải có 10 ký tự',
            'string.pattern.base': 'Số điện thoại chỉ được chứa các ký tự số',
            'any.required': 'Số điện thoại là bắt buộc'
        }),
        address: Joi.string().min(3).max(200).required().messages({
            'string.base': 'Địa chỉ phải là chuỗi',
            'string.min': 'Địa chỉ phải có ít nhất 10 ký tự',
            'string.max': 'Địa chỉ không được vượt quá 200 ký tự',
            'any.required': 'Địa chỉ là bắt buộc'
        }),
        provinces: Joi.string().required().messages({
            'string.required': 'Tên tỉnh là bắt buộc'
        })
    })
});
