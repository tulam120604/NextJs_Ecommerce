const apiURi = 'http://localhost:2000/v1/order';
import { toast } from "react-toastify";



export async function add_order(item: any) {
    try {
        const res = await fetch(`${apiURi}/add`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        if (!res.ok) {
            toast.error('Đặt hàng không thành công!', { autoClose: 500 });
            console.log('Lỗi rồi đại vương ơi!')
            return res
        } else {
            toast.success('Đặt hàng thành công!', { autoClose: 500 });
            sessionStorage.removeItem('item_order');
        }
        await res.json();
        return res
    } catch (error) {
        return error || 'Lỗi rồi đại vương ơi!';
    }
};

export async function get_order_user(id_user: any) {
    try {
        const res = await fetch(`${apiURi}/${id_user}`);
        if (!res.ok) {
            console.log('Lỗi rồi đại vương ơi!')
            return res
        }
        const data = await res.json();
        return data
    } catch (error) {
        return error || 'Lỗi rồi đại vương ơi!';
    }
}

export async function get_all_order(token: any) {
    try {
        if (token) {
            const res = await fetch(`${apiURi}/all`);
            if (!res.ok) {
                toast.error('Lỗi, vui lòng kiếm tra lại kết nối internet!', { autoClose: 500 });
                console.log('Lỗi rồi đại vương ơi!')
                return res
            }
            const data = await res.json();
            return data
        }
        else {
            console.log('Đại vương là giả mạo!');
            return;
        }
    } catch (error) {
        return error || 'Lỗi rồi đại vương ơi!';
    }
}


export async function update_status_order(dataClient: any) {
    try {
        const res = await fetch(`${apiURi}/update_status/${dataClient.id_user}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataClient.item)
        })
        if (!res.ok) {
            toast.error('Hủy đơn không thành công!', { autoClose: 500 });
            console.log('Lỗi rồi đại vương ơi!')
            return res
        } else {
            toast.success('Hủy đơn hàng thành công!', { autoClose: 500 });
        }
        await res.json();
        return res
    } catch (error) {
        return error || 'Lỗi rồi đại vương ơi!';
    }
}


export async function restore_buy_order(dataClient: any) {
    try {
        const res = await fetch(`${apiURi}/restore_buy_item`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataClient)
        })
        if (!res.ok) {
            toast.error('Đặt lại đơn không thành công!', { autoClose: 500 });
            console.log('Lỗi rồi đại vương ơi!')
            return res
        } else {
            toast.success('Đặt lại đơn thành công!', { autoClose: 500 });
        }
        await res.json();
        return res
    } catch (error) {
        return error || 'Lỗi rồi đại vương ơi!';
    }
}