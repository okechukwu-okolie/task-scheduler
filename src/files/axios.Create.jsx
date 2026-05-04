import axios from "axios";

const instance = axios.create({ 
    baseURL: "http://localhost:5500/api",
    headers: {
        "Content-Type": "application/json"
    }
})

// interceptor to add token to the header of every request
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export default instance;