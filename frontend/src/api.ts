import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;
    const url = error.config?.url;

    if (url?.includes('/auth/login')) {
      return Promise.reject(error);
    }

    if ((status === 401 || status === 403) && localStorage.getItem('token')) {
      localStorage.removeItem('token');
      window.location.replace('/login');
    }

    return Promise.reject(error);
  }
);


export default api;
