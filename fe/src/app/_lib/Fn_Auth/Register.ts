'use client';

const apiURi = 'http://localhost:2000/v1';

export async function Create_Account (item : any) {
    try {
        const res = await fetch (`${apiURi}/register`, {
            method : 'post',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(item)
        });
        if (!res.ok) {
           console.warn('Dang ki that bai !');
        }
       return res
    } catch (error) {
        return ('<span>Lỗi rồi đại vương ơi!!</span>')
    }
}