import Role from "./Role";

interface ProfileInterface {
    id: string | number;
    user: {
        id: string | number,
        name: string,
        email: string,
        role_id: string | number,
        role: Role
    };
    access_token: string;
    toke_type: string;
    token_scope: string;
    expires_at : string;
    status_code: number;
}

export default ProfileInterface;