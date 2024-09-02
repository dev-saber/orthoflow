import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response; // 200 status code responses are returned
  },
  (error) => {
    if (error.response) {
      if (error.response.status == 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        console.error("An error occurred:", error.response.data);
      }
    } else {
      console.error("An error occurred:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
