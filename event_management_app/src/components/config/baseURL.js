import axios from "axios";

// export const baseURL = "http://localhost:3030";
export const baseURL = "https://api.totfd.fun";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export default axiosInstance;