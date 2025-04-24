import axios from 'axios';
import { getToken } from '../utils/auth';

const API = axios.create({
  baseURL: 'https://9b5a39581a29.ngrok.app/api', 
});

API.interceptors.request.use(async config => {
  const token = await getToken();
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
