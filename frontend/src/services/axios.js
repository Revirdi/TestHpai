import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:3080" });

export default axiosInstance;
