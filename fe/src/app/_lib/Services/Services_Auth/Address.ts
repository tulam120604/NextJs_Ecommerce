const apiURi = process.env.NEXT_PUBLIC_DB_HOST;

export async function get_address (id_user : string | number, accessToken : string) {
    try {
        const res = await fetch (`${apiURi}/address/${id_user}`, {
            method : 'get',
            headers : {
                'Authorization' : `Bearer ${accessToken}`
            }
        });
        if (!res.ok){
            return res
        }
        const data = await res.json();
        return data
    }catch (error){
        return error || 'Lỗi rồi đại vương ơi!'
    }
}


export async function create_address (item  : {id_user: string | number, address : string | number , accessToken : string}) {
    try {
        const res = await fetch (`${apiURi}/address/${item?.id_user}`, {
            method : 'get',
            headers : {
                'Authorization' : `Bearer ${item?.accessToken}`
            },
            body : JSON.stringify(item?.address)
        });
        if (!res.ok){
            return res
        }
        const data = await res.json();
        return data
    }catch (error){
        return error || 'Lỗi rồi đại vương ơi!'
    }
}

export async function edit_address (item : {id_user : string | number, address : string | number}, accessToken : string) {
    try {
        const res = await fetch (`${apiURi}/address/${item?.id_user}`, {
            method : 'PUT',
            headers : {
                'Authorization' : `Bearer ${accessToken}`
            },
            body : JSON.stringify(item?.address)
        });
        if (!res.ok){
            return res
        }
        const data = await res.json();
        return data
    }catch (error){
        return error || 'Lỗi rồi đại vương ơi!'
    }
}


export async function remove_address (id_address : string | number, accessToken : string) {
    try {
        const res = await fetch (`${apiURi}/address/${id_address}`, {
            method : 'delete',
            headers : {
                'Authorization' : `Bearer ${accessToken}`
            }
        });
        if (!res.ok){
            return res
        }
        const data = await res.json();
        return data
    }catch (error){
        return error || 'Lỗi rồi đại vương ơi!'
    }
}