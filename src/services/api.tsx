import axios from "axios";

const API_BASE_URL ="https://metromind-web-backend-euh0gkdwg9deaudd.uaenorth-01.azurewebsites.net/"
//  "http://192.168.123.73:8000/"


// "http://192.168.1.48:8001/"
// "http://192.168.1.48:8001/"


// "http://192.168.1.63:8001/"; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})
export default api;
