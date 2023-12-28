import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (username, email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('http://localhost:8000/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        const json = await response.json();
        console.log(json);
        console.log(response.status);
        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok) {
            localStorage.setItem('user', JSON.stringify(json));
            dispatch({type: 'LOGIN', payload: json});
            setIsLoading(false);
        }
    }

    return {signup, isLoading, error};
}