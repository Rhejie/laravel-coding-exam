import CreateUserInterface from '@/interfaces/CreateUserInterface';
import User from '@/interfaces/User';
import {http} from '../http_service';

export const storeUser = async (data: CreateUserInterface) : Promise<CreateUserInterface> => {
    const res = await http().post('/user/users', data);
    return res.data;
}

export const getUsers = async () : Promise<User[]> => {
    const res = await http().get('/user/users');
    return res.data;
}

export const getUser = async (id : string | number) : Promise<CreateUserInterface> => {
    const res = await http().get(`/user/users/${id}/edit`);
    console.log(res, '--> data');
    
    return res.data;
}

export const deleteUser = async ( id: string | number): Promise<string> => {
    const res = await http().delete(`/user/users/${id}`);
    return res.data.message;
}

export const updateUser = async ( id: string | number, data: CreateUserInterface): Promise<User> => {
    const res = await http().patch(`/user/users/${id}`, data);

    return res.data
}