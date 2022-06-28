import LoginInterface from '@/interfaces/LoginInterface';
import ProfileInterface from '@/interfaces/ProfileInterface'
import {http} from '../http_service'
import store from '../../store';
import UserProfile from '@/interfaces/UserProfile';

export const login = async (data: LoginInterface) : Promise<ProfileInterface> => {
    const res = await http().post('/auth/login', data).then((res) : Promise<ProfileInterface> => {
        if(res.status === 200) {
            setToken(res.data)
        }
         return res.data;
    });
    return res;
}

export const logout = async () : Promise<void> => {
    await http().get('/auth/logout');
    localStorage.removeItem('test');
}

export const getProfile = async () : Promise<UserProfile> => {
    const res = await http().get('/auth/profile');

    return res.data;
}

function setToken(data: ProfileInterface) {
    const token = JSON.stringify(data);
    localStorage.setItem('test', token);
    store.dispatch('authenticate', data.user);
}   

export const accessToken = () : string | null => {
    const t = localStorage.getItem('test');
    if(!t) {
        return null;
    }
    const token: ProfileInterface = JSON.parse(localStorage.getItem("test") || "") 
    if(!token) {
        return '';
    }

    return token.access_token
}

export const isLoggedIn = () => {
    const token = localStorage.getItem('test');
    return token != null;
}