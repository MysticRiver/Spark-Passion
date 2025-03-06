import axios from 'axios';
//const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5003/api" : "/api";

export const axiosInstance = axios.create({
	baseURL: "http://localhost:5003/api",
	withCredentials: true,
});