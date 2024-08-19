const apiURi = process.env.NEXT_PUBLIC_DB_HOST;
import { toast } from 'react-toastify'

export async function get_address(id_user: string | number) {
    try {
        const res = await fetch(`${apiURi}/address/${id_user}`);
        if (!res.ok) {
            return res
        }
        const data = await res.json();
        return data
    } catch (error) {
        return error || 'Lỗi rồi đại vương ơi!'
    }
}


export async function create_address(item: { user_id: string | number, about_address: any }) {
    try {
        const res = await fetch(`${apiURi}/address/${item?.user_id}`, {
            method: 'post',
            headers: {
                'Content-Type': `application/json`
            },
            body: JSON.stringify(item)
        });
        if (!res.ok) {
            toast.success('Lỗi, không thể thêm địa chỉ, vui lòng thử lại.', { autoClose: 500 })
            return res
        }
        else {
            toast.success('Đã thêm địa chỉ mới.', { autoClose: 500 })
        }
        const data = await res.json();
        return data
    } catch (error) {
        return error || 'Lỗi rồi đại vương ơi!'
    }
}

export async function edit_address(item: { id_user: string | number, address: string | number }, accessToken: string) {
    try {
        const res = await fetch(`${apiURi}/address/${item?.id_user}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(item?.address)
        });
        if (!res.ok) {
            return res
        }
        const data = await res.json();
        return data
    } catch (error) {
        return error || 'Lỗi rồi đại vương ơi!'
    }
}


export async function remove_address(id_address: string | number) {
    try {
        const res = await fetch(`${apiURi}/address/${id_address}`, {
            method: 'delete',
        });
        if (!res.ok) {
            return res
        }
        const data = await res.json();
        return data
    } catch (error) {
        return error || 'Lỗi rồi đại vương ơi!'
    }
}