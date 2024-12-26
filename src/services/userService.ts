import axios from 'axios';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/user`;


interface ErrorResponse {
    message: string;
}

export const getUsers = async () => {
    try {
        // Retrieve the logged-in user's information from localStorage
        const userId = localStorage.getItem('userId');
        const userToken = localStorage.getItem('token');

        if (!userId || !userToken) {
            throw new Error('User not logged in');
        }
        const response = await axios.get(`${API_URL}`, {
            params: { userId: userId },
             headers: { Authorization: `Bearer ${userToken}` },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};


// Centralized error handler function
const handleError = (error: any) => {
    if (axios.isAxiosError(error) && error.response) {
        const message = (error.response.data as ErrorResponse).message || 'An unexpected error occurred.';
        console.error('API error:', message);
        throw new Error(message);
    } else {
        console.error('Unexpected error:', error);
        throw new Error('An unexpected error occurred.');
    }
};