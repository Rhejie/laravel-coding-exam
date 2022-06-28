import axios from 'axios';
import store from '@/store/index'
import { accessToken } from './auth/auth_service'
export function http() {
    return axios.create({
        baseURL: store.state.apiURL,
        headers: {
            Authorization: 'Bearer '+accessToken()
        }
    });
}