// API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://zerodha-backend-g85e.onrender.com';

console.log('API Base URL:', API_BASE_URL);
console.log('Environment:', process.env.NODE_ENV);

export default API_BASE_URL;