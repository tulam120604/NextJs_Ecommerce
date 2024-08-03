import { useEffect, useState } from 'react'

const useToken = () => {
    const [accessToken, set_AccessToken] = useState();
    const [refeshToken, set_RefeshToken] = useState();
    useEffect(() => {
        const data_Token = localStorage.getItem('account');
        if (data_Token) {
            const token_Account = JSON.parse(data_Token);
            set_AccessToken(token_Account.accessToken);
            set_RefeshToken(token_Account.refeshToken);
        }
    }, [accessToken, refeshToken]);
    return {
        accessToken,
        refeshToken
    }
}

export default useToken