import axios from "axios";

const App_DATA = {
  // Use the proxy URL here to avoid CORS
  core:
    process.env.NODE_ENV === "development"
      ? "/api"
      : process.env.REACT_APP_API_BASE_URL || "http://67.254.128.64:8123",
  timeout: 30000,
};

export const apiInstance = axios.create({
  baseURL: `${App_DATA.core}`,
  timeout: App_DATA.timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

apiInstance.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === "development") {
      console.log("Request:", config.method.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(
        "Server Error:",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      console.error("Network Error:", error.message);
    } else {
      console.error("Request Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiInstance;
