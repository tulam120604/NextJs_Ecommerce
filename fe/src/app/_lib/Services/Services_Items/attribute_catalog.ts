const apiURi = process.env.NEXT_PUBLIC_DB_HOST;

// get attribute by item
export async function get_attributeCatalog_by_item(id_item?: string | number) {
    try {
        const res = await fetch(`${apiURi}/attribute_catalog/${id_item}`);
        if (!res.ok) {
            return res
        }
        const { data_attribute } = await res.json();
        return data_attribute
    } catch (error) {
        return (error || "Lỗi rồi đại vương ơi!");
    }
}


export async function create_attributesCatalog(value: any) {
    try {
        const res = await fetch(`${apiURi}/attribute_catalog/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        });
        if (!res.ok) {
            return res
        };
        return res
    } catch (error) {
        return (error || "Lỗi rồi đại vương ơi!");
    }
}

export async function create_value_attributeCatalog(value: any) {
    try {
        const res = await fetch(`/attribute_catalog/create_value`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        });
        if (!res.ok) {
            return res
        };
        return res
    } catch (error) {
        return error
    }
}
