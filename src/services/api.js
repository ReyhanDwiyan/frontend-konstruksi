import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    timeout: 10000 // Increase timeout
});

// Add detailed logging
API.interceptors.request.use(
    config => {
        console.log("API Request:", {
            method: config.method,
            url: config.url,
            data: config.data,
            headers: config.headers
        });
        return config;
    },
    error => {
        console.error("Request Error:", error);
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    response => {
        console.log("API Response:", {
            status: response.status,
            data: response.data
        });
        return response;
    },
    error => {
        console.error("Response Error:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        return Promise.reject(error);
    }
);

export default API;