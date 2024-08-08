'use client';
import { toast } from "react-toastify";

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
            toast.error('Tạo tài khoản thất bại!', {autoClose : 500})
            return res
        }
        else if (res.status === 200) {
            const data = await res.json();
            // console.log(data.check_email)
            localStorage.setItem('account', JSON.stringify(data));
        }
        return res
    } catch (error) {
        return error || 'Lỗi rồi đại vương ơi!!'
    }
}

// register


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
            toast.error('Tạo tài khoản thất bại!', {autoClose : 500})
            return res
        }
        if (res.status === 201) {
            toast.success("Đăng kí tài khoản thành công!", { autoClose: 500 });
        }
        return res
    } catch (error) {
        return 'Lỗi rồi đại vương ơi!!'
    }
}

// infor
export async function infor_user(id: string | number) {
    try {
        const res = await fetch(`${apiURi}/infor/${id}`);
        if (!res.ok) {
            return res
        }
        const data = await res.json();
        return data
    } catch (error) {
        return 'Lỗi rồi đại vương ơi!!'
    }
}

// logout

export async function log_out() {

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
        return 'Lỗi rồi đại vương ơi!!'
    }
}

// granting_premissions
export async function granting_premissions(id_user: string | number) {
    try {
        const res = await fetch(`${apiURi}/granting_premissions`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id_user)
        });
        if (!res.ok) {
            toast.error('Cấp quyền thất bại!', {autoClose : 500})
        }
        else {
            toast.success('Cấp quyền thành công!', {autoClose : 500})
        }
        return res
    } catch (error) {
        return 'Lỗi rồi đại vương ơi!!'
    }
}