import CreateRoleInterface from '@/interfaces/CreateRoleInterface';
import Role from '@/interfaces/Role';
import {http} from '../http_service'

export const storeRole = async (data : CreateRoleInterface): Promise<Role> => {
    const res = await http().post('/user/roles', data)
    return res.data;
}

export const getRoles = async (): Promise<Role[]> => {
    const res = await http().get('/user/roles');
    return res.data
}

export const getRole = async (id: string | number): Promise<Role> => {
    
    const res = await http().get<Role>(`/user/roles/${id}/edit`);

    return res.data
}

export const deleteRole = async (id : string | number): Promise<string> => {
    const res = await http().delete(`/user/roles/${id}`);
    return res.data.message;
}

export const updateRole = async (id : string | number, data: CreateRoleInterface): Promise<Role> => {
    
    const res = await http().patch(`/user/roles/${id}`, data);

    return res.data;
}
