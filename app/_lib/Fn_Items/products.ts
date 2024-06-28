// PRODUCTS
// 'use client';

const apiURi = 'http://localhost:2000/v1';

// all client
export async function getAll (page? : number) {
    try {
        let uri = `${apiURi}/products`
        if (page) {
            uri += `?_page=${page}`
        }
        const res = await fetch(uri);
        if(!res.ok){
            console.warn('Call data failer')
        }
        const {data} = await res.json();
        return data.docs
    } catch (error) {
        console.error(error);
    }
}

// limit item
export async function getLimit (countItem : number) {
    try {
        const res = await fetch(`${apiURi}/products?&_limit=${countItem}`);
        if(!res.ok){
            console.warn('Call data failer')
        }
        const {data} = await res.json();
        return data.docs
    } catch (error) {
        console.error(error);
    }
}

// detail
export async function getDetail (id : number | string) {
    try {
        const res = await fetch(`${apiURi}/products/${id}`);
        if(!res.ok){
            console.warn('Call data failer')
        }
        const data = await res.json();
        return data.data
    } catch (error) {
        console.error(error);
    }
}

// add
export async function addItem (item : any) {
    try {
        const res = await fetch(`${apiURi}/products`, {
            method : 'post',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(item)
        });
        if(!res.ok){
            console.warn('Call data failer')
        }
        const data = await res.json();
        return data.data
    } catch (error) {
        console.error(error);
    }
}

// edit
export async function editItem (item : any) {
    try {
        const res = await fetch(`${apiURi}/products/${item.id}`, {
            method : 'put',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(item)
        });
        if(!res.ok){
            console.warn('Call data failer')
        }
        const data = await res.json();
        return data.data
    } catch (error) {
        console.error(error);
    }
}


// remove
export async function removeItem (id : any) {
    try {
        const res = await fetch(`${apiURi}/products/${id}`, {
            method : 'delete',
        });
        if(!res.ok){
            console.warn('Call data failer');
        }
        const data = await res.json();
        return data.data
    } catch (error) {
        console.error(error);
    }
}


// all adminstration 
export async function list_All_ITems () {
    try {
        const res = await fetch (`${apiURi}/products/admin`);
        if (!res.ok) {
            console.warn('Call data failer');
        };
        const data = await res.json();
        return data.data
    } catch(error) {
        console.error(error)
    }
}