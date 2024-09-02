import axios from "axios";

console.log(import.meta.env.VITE_BASE_URL);
export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "api",
  timeout: 1000,
});
