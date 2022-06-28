import Role from "./Role";

interface User {
    name: string;
    email: string;
    password: string;
    role: Role;
    role_id?: number | string;
    password_confirmation?: string;
    id: string | number;
}

export default User;