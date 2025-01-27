import axios from "axios";

export const baseURL = "http://localhost:3030";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export default axiosInstance;