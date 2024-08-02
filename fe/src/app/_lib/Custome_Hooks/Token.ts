import React, { useEffect, useState } from 'react'

const useToken = () => {
    const [dataToken, set_DataToken] = useState();
    useEffect(() => {
        const data_Token = localStorage.getItem('account');
        if (data_Token) {
            const token_Account = JSON.parse(data_Token);
            set_DataToken(token_Account.token)
        }
    }, [dataToken]);
    return dataToken
}

export default useToken