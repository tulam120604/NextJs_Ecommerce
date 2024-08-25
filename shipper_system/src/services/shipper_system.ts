const apiUri = import.meta.env.PORT;

export async function get_item_order(dataClient: { id_user?: string | number, token?: string }) {
    try {
        const res = await fetch(`${apiUri}/${dataClient?.id_user}`, {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${dataClient?.token}`
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