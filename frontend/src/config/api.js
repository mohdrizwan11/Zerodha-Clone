// API configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://zerodha-backend-g85e.onrender.com'
  : process.env.REACT_APP_API_URL || 'http://localhost:4000';

console.log('API Base URL:', API_BASE_URL);
console.log('Environment:', process.env.NODE_ENV);

export default API_BASE_URL;