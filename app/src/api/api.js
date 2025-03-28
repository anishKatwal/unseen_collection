import axios from "axios";
import config from "../config/config";

const authToken = localStorage.getItem("authToken");

const api = axios.create({
  baseURL: config.baseApiUrl,
  headers: {
    Authorization: `Bearer ${authToken}`,
  },
});

export default api;
