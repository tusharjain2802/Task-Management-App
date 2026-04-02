import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    throw 'Error logging in';
  }
};

export const registerUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/register`, { email, password });
    return response.data;
  } catch (error) {
    throw 'Error registering user';
  }
};
