const apiURi = 'http://localhost:2000/v1/order';


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
            console.log('Lỗi rồi đại vương ơi!')
            return res
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