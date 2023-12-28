import { useState } from 'react';

export const useFetchGet = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const myFetchGet = async (url) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        const json = await response.json();
        console.log(json);
        console.log(response.status);
        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok) {
            setIsLoading(false);
            return json;
        }
    }

    return {myFetchGet, isLoading, error};
}