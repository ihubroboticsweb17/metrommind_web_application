import axios from 'axios'

const is_development = import.meta.env.MODE === 'development'
const base_url = is_development ? import.meta.env.VITE_API_BASE_URL_PROD : import.meta.env.VITE_API_BASE_URL_LOCAL
const AxiosInstance = axios.create({
    baseURL: base_url,
    timeout: 5000,
    headers:{
        "content-type":"application/json",
        accept : "application/json"
    }
})

export default AxiosInstance