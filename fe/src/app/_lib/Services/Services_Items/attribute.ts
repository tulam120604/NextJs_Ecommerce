const apiURi = 'http://localhost:2000/v1/attribute';

// get attribute by item
export async function get_attribute_by_item(id_item?: string | number) {
    try {
        const res = await fetch(`${apiURi}/${id_item}`);
        if (!res.ok) {
            console.warn('Call data failer')
        }
        const  {data_attribute}  = await res.json();
        return data_attribute
        } catch (error) {
        return(error || "Lỗi rồi đại vương ơi!");
    }
}


