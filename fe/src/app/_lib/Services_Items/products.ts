// PRODUCTS
import { toast } from "react-toastify";

const apiURi = 'http://localhost:2000/v1';

// list item client
export async function getLimit_and_paginate(page: number, count_item: number) {
    try {
        const uri = `${apiURi}/products?_page=${page}&_limit=${count_item}`;
        const res = await fetch(uri);
        if (!res.ok) {
            console.warn('Call data failer')
            return res
        }
        const data = await res.json();
        return data
    } catch (error) {
        return (error || "Lỗi rồi đại vương ơi!");
    }
}

// limit item
export async function getLimit(countItem: number) {
    try {
        const res = await fetch(`${apiURi}/products?&_limit=${countItem}`);
        if (!res.ok) {
            console.warn('Call data failer')
            return res
        }
        const data = await res.json();
        return data
    } catch (error) {
        return (error || "Lỗi rồi đại vương ơi!");
    }
}

// detail
export async function getDetail(id: number | string) {
    try {
        const res = await fetch(`${apiURi}/products/${id}`);
        if (!res.ok) {
            console.warn('Call data failer')
            return res
        }
        const data = await res.json();
        return data.data
    } catch (error) {
        return (error || "Lỗi rồi đại vương ơi!");
    }
}

// detail dashboard
export async function getDetailDashboard(id: number | string) {
    try {
        const res = await fetch(`${apiURi}/products/dashboard/${id}`);
        if (!res.ok) {
            console.warn('Call data failer');
            return res
        }
        const data = await res.json();
        return data.data
    } catch (error) {
        return (error || "Lỗi rồi đại vương ơi!");
    }
}

// list items dashboard 
export async function list_ITems_Dashboard(accessToken: any, page: number, limit_item: number) {
    try {
        if (accessToken) {
            const uri = `${apiURi}/products/admin?_page=${page}&_limit=${limit_item}`;
            const res = await fetch(uri, {
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!res.ok) {
                console.warn('Call data failer');
                return res
            };
            const data_All  = await res.json();
            return data_All
        }
        console.error('Không có quyền truy cập!');
        return 'Không có quyền truy cập !';
    } catch (error) {
        return (error || "Lỗi rồi đại vương ơi!");
    }
}


export async function list_All_Item_Dashboard(token: any) {
    try {
        if (token) {
            const uri = `${apiURi}/products/admin`;
            const res = await fetch(uri, {
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!res.ok) {
                console.warn('Call data failer');
            };
            const data = await res.json();
            return data
        }
        console.error('Không có quyền truy cập!');
        return 'Không có quyền truy cập !';
    } catch (error) {
        return (error || "Lỗi rồi đại vương ơi!");
    }
}


// add
export async function addItem(item: any) {
    try {
        const res = await fetch(`${apiURi}/products`, {
            method: 'post',
            headers: {
                'authorization': `Bearer ${item.accessToken}`,
                // 'Content-Type': 'multipart/form-data'
            },
            body: item.data_item
        });
        // console.log(res);
        if (!res.ok) {
            toast.success(`Có lỗi xảy ra khi thêm sản phẩm !`, { autoClose: 500 })
            console.warn('Call data failer');
        }
        else {
            toast.success(`Đã thêm sản phẩm !`, { autoClose: 500 })
        }
        const data = await res.text();
        return data
    } catch (error) {
        return (error || "Lỗi rồi đại vương ơi!");
    }
}

// remove
export async function removeItem(item: any) {
    try {
        const res = await fetch(`${apiURi}/products/${item.id_item}`, {
            method: 'delete',
            headers: {
                'authorization': `Bearer ${item.token}`
            }
        });
        if (!res.ok) {
            toast.success(`Có lỗi xảy ra khi xóa sản phẩm mã ${item.id_item} !`, { autoClose: 500 })
            console.warn('Call data failer');
        } else {
            toast.success(`Đã xóa sản phẩm mã ${item.id_item} !`, { autoClose: 500 })
        }
        await res.json();
        console.log("success delete!")
    } catch (error) {
        return (error || "Lỗi rồi đại vương ơi!");
    }
}

// recycle items adminstration 
export async function list_Recycle_ITems_Admin(token: any, page?: Number) {
    try {
        if (token) {
            let uri = `${apiURi}/products/admin/trash`;
            // if (page) {
            //     uri += `?_page=${page}`
            // }
            const res = await fetch(uri, {
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!res.ok) {
                console.warn('Call data failer');
            };
            const { data } = await res.json();
            return data;
        }
        console.error('Không có quyền truy cập!');
        return 'Không có quyền truy cập !';
    } catch (error) {
        return (error || "Lỗi rồi đại vương ơi!");
    }
}

// restore :
export async function restore_items_admin(dataClient: any) {
    try {
        let uri = `${apiURi}/products/admin/trash/${dataClient.id_item}`;
        // if (page) {
        //     uri += `?_page=${page}`
        // }
        const res = await fetch(uri, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${dataClient.token}`,
            }
        });
        if (!res.ok) {
            toast.success(`khôi phục sản phẩm mã ${dataClient.id_item} thất bại!`, { autoClose: 500 })
            console.warn('Call data failer');
        };
        console.log("Restore Success !");
    } catch (error) {
        return (error || "Lỗi rồi đại vương ơi!");
    }
}

// edit 
export async function edit_items_admin(dataClient?: any) {
    try {
        let uri = `${apiURi}/products/admin/${dataClient.id_item}`;
        const res = await fetch(uri, {
            method: 'PUT',
            headers: {
                "authorization": `Bearer ${dataClient.accessToken}`,
                // "Content-Type" : "application/json"
            },
            body: dataClient.data_item
        });
        if (!res.ok) {
            toast.error(`Có lỗi xảy ra khi sửa sản phẩm mã ${dataClient.id_item} !`, { autoClose: 500 })
            console.warn('Kiem tra lai server hoac internet!')
        }
        else {
            toast.success(`Đã sửa sản phẩm mã ${dataClient.id_item} !`, { autoClose: 500 })
        }
        return res
    } catch (error) {
        return (error || "Lỗi rồi đại vương ơi!");
    }
};


// get item by category :
export async function get_item_by_category(page?: any, id_cateory?: any) {
    try {
        let uri = `${apiURi}/products/category/${id_cateory}`
        if (page) {
            uri += `?_page=${page}`
        }
        const res = await fetch(uri);
        if (!res.ok) {
            console.warn(res);
            return res
        }
        const data = await res.json();
        return data
    } catch (error) {
        return (error || "Lỗi rồi đại vương ơi!");
    }
}

// search
export async function search_item(item?: any) {
    try {
        let uri = `${apiURi}/products/search`;
        if (item) {
            uri += `?&_search=${item}`;
        }
        const res = await fetch(uri);
        if (!res.ok) {
            console.warn(res);
            return res
        };
        const { data } = await res.json();
        return data
    } catch (error) {
        return (error || "Lỗi rồi đại vương ơi!");
    }
}