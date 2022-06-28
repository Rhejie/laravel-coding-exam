interface CreateUserInterface {
    name: string;
    email: string;
    password: string;
    role_id: number | string;
    password_confirmation: string;
    id?: string | number;
}

export default CreateUserInterface;