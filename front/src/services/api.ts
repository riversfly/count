import axios from 'axios';
import { UsersLoginRequest, UsersRegisterRequest } from '../types/users';

const API_URL = 'http://localhost:8080'; // 假设后端运行在8080端口

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const loginUser = async (loginData: UsersLoginRequest) => {
    try {
        const response = await api.post('/users/login', loginData);
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const registerUser = async (registerData: UsersRegisterRequest) => {
    try {
        const response = await api.post('/users/register', registerData);
        return response.data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};