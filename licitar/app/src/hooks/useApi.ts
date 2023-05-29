import axios, { AxiosRequestConfig } from 'axios';
import { User } from '../types/User';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

export const useApi = () => ({
  validateToken: async (token: string) => {
    try {
      const response = await api.post('/users/validateToken', { token });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Ocorreu um erro inesperado");
      }
    }
  },

  register: async (name: string, username: string, email: string, password: string) => {
    try {
      const response = await api.post('/users/register', { name, username, email, password });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Ocorreu um erro inesperado");
      }
    }
  },

  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/users/login', { email, password });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Ocorreu um erro inesperado");
      }
    }
  },

  getAuctions: async (token: any) => {
    try {

      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await api.get('/auctions', config);
      return response.data;

    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Ocorreu um erro inesperado");
      }
    }
  }
});
