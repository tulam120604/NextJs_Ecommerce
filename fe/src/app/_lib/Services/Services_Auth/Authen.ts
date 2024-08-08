'use client';

const apiURi = process.env.NEXT_PUBLIC_DB_HOST;

// login
export async function sign_In(item: any) {
    try {
        const res = await fetch(`${apiURi}/login`, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        if (!res.ok) {
            console.warn('Dang nhap that bai !');
        }
        else if (res.status === 200) {
            const data = await res.json();
            // console.log(data.check_email)
            localStorage.setItem('account', JSON.stringify(data));
        }
        return res
    } catch (error) {
        return error || '<span>Lỗi rồi đại vương ơi!!</span>'
    }
}

// register

import { toast } from "react-toastify";

export async function create_Account(item: any) {
    try {
        const res = await fetch(`${apiURi}/register`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        if (!res.ok) {
            console.warn('Dang ki that bai !');
        }
        if (res.status === 201) {
            toast.success("Đăng kí tài khoản thành công!", { autoClose: 500 });
        }
        return res
    } catch (error) {
        return ('<span>Lỗi rồi đại vương ơi!!</span>')
    }
}

// infor
export async function infor_user(id: string | number) {
    try {
        const res = await fetch (`${apiURi}/infor/${id}`);
        if (!res.ok) {
            return res
        }
        const data = await res.json();
        return data
    } catch (error) {
        return ('<span>Lỗi rồi đại vương ơi!!</span>')
    }
}

// logout

export async function log_out (){
    
}

// get
export async function list_Account(accessToken: string) {
    try {
        const res = await fetch(`${apiURi}/account`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        if (!res.ok) {
            console.error('Lỗi rồi đại vương ơi!!')
        };
        const data = await res.json();
        return data
    } catch (error) {
        return ('<span>Lỗi rồi đại vương ơi!!</span>')
    }
}