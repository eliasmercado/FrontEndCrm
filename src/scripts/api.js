import axios from "axios"
import auth from "@/auth"
import router from "../router";

//Para peticiones api sin token de autenticacion
const API_BASE_URL = process.env.VUE_APP_API_URL;
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.response.use(function (response) {
    return response
}, function (error) {
    if (error.response.status === 401) {
        auth.logOut();
        console.clear();
        router.push({
            path: "/login",
        }).catch((err) => { });
    }
    return Promise.reject(error)
})
export default api