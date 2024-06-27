import axios, { AxiosInstance } from "axios";

// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000", // Replace with your API base URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage or wherever you store it
    const token = localStorage.getItem("token");

    // If a token exists, add it to the headers
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }

    // You can also modify other headers or config settings if needed
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Export the Axios instance
export default axiosInstance;
