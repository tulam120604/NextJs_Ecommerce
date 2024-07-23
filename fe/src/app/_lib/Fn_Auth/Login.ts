'use client';

const apiURi = 'http://localhost:2000/v1';

export async function Sign_In(item: any) {
    try {
        const res = await fetch(`${apiURi}/login`, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        if (!res.ok) {
            console.warn('Dang nhap that bai !');
        }
        else if (res.status === 200) {
            const data = await res.json();
            // console.log(data.check_email)
            localStorage.setItem('account', JSON.stringify(data));
        }
        return res
    } catch (error) {
        return error || '<span>Lỗi rồi đại vương ơi!!</span>'
    }
}