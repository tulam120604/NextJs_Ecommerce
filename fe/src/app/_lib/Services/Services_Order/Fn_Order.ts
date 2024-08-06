const apiURi = 'http://localhost:2000/v1';
import { toast } from "react-toastify";



export async function add_order(item: any) {
    try {
        const res = await fetch(`${apiURi}/order/add`, {
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

export async function get_order_user(id_user: any, page: number, limit: number, status_item_order?: string | number) {
    try {
        let uri = `${apiURi}/order/${id_user}?_page=${page}&_limit=${limit}`;
        if (status_item_order) {
            uri += `&_status_item=${status_item_order}`
        }
        const res = await fetch(uri);
        if (!res.ok) {
            return res
        }
        const data = await res.json();
        return data
    } catch (error) {
        return error || 'Lỗi rồi đại vương ơi!';
    }
}

export async function get_all_order(accessToken: any) {
    try {
        if (accessToken) {
            const res = await fetch(`${apiURi}/list_orders`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                }
            });
            if (!res.ok) {
                toast.error('Lỗi, vui lòng kiếm tra lại!', { autoClose: 500 });
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
        const res = await fetch(`${apiURi}/order/update_status/${dataClient.id_user}`, {
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
        const res = await fetch(`${apiURi}/order/restore_buy_item`, {
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

export async function get_item_order(id_item: string | number) {
    try {
        const res = await fetch (`${apiURi}/order/feedback/${id_item}`);
        if (!res.ok){
            toast.error('Có lỗi xảy ra, vui lòng kiểm tra lại!', { autoClose: 500 });
            return res
        };
        const data = await res.json();
        return data
    } catch (error) {
        return error || 'Lỗi rồi đại vương ơi!';
    }
}