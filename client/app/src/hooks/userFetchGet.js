import { useState } from 'react';

export const useFetch = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const myFetch = async (url, data) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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
        }
    }

    return {myFetch, isLoading, error};
}