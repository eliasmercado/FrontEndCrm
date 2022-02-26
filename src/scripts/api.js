import axios from "axios"

//Para peticiones api sin token de autenticacion
const API_BASE_URL = process.env.VUE_APP_API_URL;
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default api