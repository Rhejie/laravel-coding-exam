import Role from "./Role";

interface UserProfile {
    id: number | string,
    name: string,
    email: string,
    role_id: string | number,
    role: Role
}

export default UserProfile;