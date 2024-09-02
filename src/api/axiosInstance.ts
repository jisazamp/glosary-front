import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:1337/api/",
  timeout: 1000,
  headers: { Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}` },
});
