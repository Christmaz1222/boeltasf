import axios from 'axios';

const api = axios.create({
  // Apunta al puerto donde corre tu NestJS (por defecto suele ser el 3000)
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

export default api;
