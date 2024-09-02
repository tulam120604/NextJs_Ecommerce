const apiUri = import.meta.env.VITE_PORT;

export async function list_item_order(token: string) {
    try {
        const res = await fetch(`${apiUri}/item_order_shipper`, {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) {
            return res
        }
        const data = await res.json();
        return data
    } catch (error) {
        return error
    }
}

export async function detail_item_order(dataClient: { token: string, id?: string | number }) {
    try {
        const res = await fetch(`${apiUri}/detail_order?id=${dataClient?.id}`, {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${dataClient?.token}`
            }
        });
        if (!res) {
            return res
        }
        const data = await res.json();
        return data
    } catch (error) {
        return error
    }
}

export async function update_status_item_order(dataBody: { status: string | number, id_order: string | number, user_id: string | number }) {
    try {
        const res = await fetch(`${apiUri}/order/update_status/${dataBody?.user_id}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataBody)
        });
        if (!res.ok) {
            return res
        }
        return res
    } catch (error) {
        return error
    }
}