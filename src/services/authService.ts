import axios from 'axios';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/auth`;


interface ErrorResponse {
  message: string;
}

export const signup = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { username, password });
    console.log(response.data);
    return response.data; // You can define the type of response if needed.
  } catch (error) {
    handleError(error);
  }
};

export const login = async (username: string, password: string, deviceId: string, deviceType: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password }, {
      headers: {
        'Device-Id': deviceId,
        'Device-Type': deviceType,
      },
    });
    localStorage.setItem('userId', username); // Store userId in localStorage
    const { access_token, registeredDeviceId } = response.data;
    // Store the JWT token in localStorage
    localStorage.setItem('token', access_token);
    localStorage.setItem('deviceId', registeredDeviceId);
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
