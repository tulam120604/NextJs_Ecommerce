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
            return res
        }
        else if (res.status === 200) {
            const data = await res.json();
            // console.log(data)
            document.cookie = `access_token=${data.accessToken}; Path=/; Secure; SameSite=None; max-age=604800000`;
            document.cookie = `refesh_token=${data.refeshToken}; Path=/; SameSite=None; max-age=604800000`;
            localStorage.setItem('account', JSON.stringify(data?.check_email?.user_name));
        }
        return res
    } catch (error: any) {
        return error || 'Đã có lỗi xảy ra!!'
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
            toast.error('Tạo tài khoản thất bại!', { autoClose: 500 })
            return res
        }
        if (res.status === 201) {
            toast.success("Đăng kí tài khoản thành công!", { autoClose: 500 });
        }
        return res
    } catch (error: any) {
        return error || 'Đã có lỗi xảy ra!!'
    }
}

// infor
export async function infor_user(accessToken: string) {
    try {
        const res = await fetch(`${apiURi}/infor_account`, {
            method: 'get',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (!res.ok) {
            return res
        }
        const data = await res.json();
        return data
    } catch (error: any) {
        return error || 'Đã có lỗi xảy ra!!'
    }
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
            return res
        };
        const data = await res.json();
        return data
    } catch (error: any) {
        return error || 'Đã có lỗi xảy ra!!'
    }
}

// cap quyen cho user
export async function cap_quyen_tai_khoan(dataForm: { id_user: string | number, accessToken: string }) {
    try {
        const res = await fetch(`${apiURi}/granting_premissions`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${dataForm?.accessToken}`
            },
            body: JSON.stringify(dataForm?.id_user)
        });
        if (!res.ok) {
            toast.error('Cấp quyền thất bại!', { autoClose: 500 });
            return res
        }
        else {
            toast.success('Cấp quyền thành công!', { autoClose: 500 })
        }
        return res
    } catch (error: any) {
        return error || 'Đã có lỗi xảy ra!!'
    }
}


// dang xuat
export async function logout(token: string) {
    try {
        const res = await fetch(`${apiURi}/logout`, {
            method: 'post',
            credentials: 'include',
            headers: {
                'Authorization': `${token}`
            }
        });
        if (!res.ok) {
            toast.error('Đăng xuất thất bại, vui lòng thử lại sau!', { autoClose: 500 });
            return res;
        };
        localStorage.removeItem('account')
        return res
    } catch (error: any) {
        return error || 'Đã có lỗi xảy ra!!'
    }
}

// refesh token 
export async function refesh_token(token: { refeshToken: string }) {
    try {
        const res = await fetch(`${apiURi}/refesh_token`, {
            method: 'post',
            headers: {
                'Authorization': token?.refeshToken
            }
        })
        if (!res.ok) {
            toast.error('Không thể xác minh danh tính, vui lòng đăng nhập và thử lại sau!', { autoClose: 500 });
            return res
        }
        const data = await res.json();
        return data
    } catch (error: any) {
        return error || 'Đã có lỗi xảy ra!!'
    }
}


// check token expired 
export async function check_token_expired(user: { id: string, accessToken: string }) {
    try {
        const res = await fetch(`${apiURi}/check_token_expired/${user?.id}`, {
            method: 'get',
            headers: {
                "Authorization": `Bearer ${user?.accessToken}`
            }
        });
        if (!res.ok) {
            const { message } = await res.json();
            if (message === 'Token het han !') {
                return res
            }
            return res;
        }
        const data_user = await res.json()
        return data_user
    } catch (error: any) {
        return error || 'Đã có lỗi xảy ra!!'
    }
}

// infor
export async function infor_shop(id?: string | number) {
    try {
        const res = await fetch(`${apiURi}/inforshop/${id}`);
        console.log(res)
        if (!res.ok) {
            return res
        }
        const data = await res.json();
        return data
    } catch (error: any) {
        return error || 'Đã có lỗi xảy ra!!'
    }
}