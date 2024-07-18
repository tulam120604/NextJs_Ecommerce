'use client';

const apiURi = 'http://localhost:2000/v1';

// list
export async function list_Categories () {
    try {
        const res = await fetch (`${apiURi}/category`);
        if (!res.ok) {
            console.warn('Call data failer!')
        }
        const {data} = await res.json();
        return data
    } catch (error) {
        return ('<span>Lỗi rồi đại vương ơi!!</span>')
    }
}

// detail
export async function detail_Categories (id : any) {
    try {
        const res = await fetch (`${apiURi}/category/${id}`);
        if (!res.ok) {
            console.warn('Call data failer!')
        }
        const {data} = await res.json();
        return data
    } catch (error) {
        return ('<span>Lỗi rồi đại vương ơi!!</span>')
    }
}

// add
export async function add_Categories (item : any) {
    try {
        const res = await fetch (`${apiURi}/category/}`, {
            method : 'post',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(item)
        });
        if (!res.ok) {
            console.warn('Call data failer!')
        }
        const {data} = await res.json();
        return data
    } catch (error) {
        return ('<span>Lỗi rồi đại vương ơi!!</span>')
    }
}

// edit
export async function edit_Categories (item : any) {
    try {
        const res = await fetch (`${apiURi}/category/${item.id}}`, {
            method : 'put',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(item)
        });
        if (!res.ok) {
            console.warn('Call data failer!')
        }
        const {data} = await res.json();
        return data
    } catch (error) {
        return ('<span>Lỗi rồi đại vương ơi!!</span>')
    }
}

// remove
export async function remove_Categories (id : any) {
    try {
        const res = await fetch (`${apiURi}/category/${id}}`, {
            method : 'delete',
        });
        if (!res.ok) {
            console.warn('Call data failer!')
        }
        const {data} = await res.json();
        return data
    } catch (error) {
        return ('<span>Lỗi rồi đại vương ơi!!</span>')
    }
}