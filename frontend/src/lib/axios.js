import axios from 'axios';

//TODO: change the baseURL to the deployed backend URL
export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});