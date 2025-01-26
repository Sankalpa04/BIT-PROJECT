import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your API's base URL
//   timeout: 10000, // Set a timeout (optional)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add authorization token or other custom headers if needed
    const token = localStorage.getItem('authToken'); // Example for browser
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response?.status === 401) {
      console.error('Unauthorized - Redirect to login');
      // Optionally redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;