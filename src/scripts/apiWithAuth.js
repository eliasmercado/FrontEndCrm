import axios from 'axios'
import auth from '@/auth';

//Para peticiones api con token de autenticacion
const API_BASE_URL = process.env.VUE_APP_API_URL;
const AUTHORIZATION_TOKEN = auth.getAutorizationToken();

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTHORIZATION_TOKEN}`
    }
})

export default api