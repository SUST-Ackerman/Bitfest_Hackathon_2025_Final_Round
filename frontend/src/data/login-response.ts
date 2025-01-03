interface UserResponseProps {
    name: string;
    username: string;
    email: string;
    role: string;
    is_verified: boolean;
}

interface LoginResponseProps {
    user: UserResponseProps;
    token: string;
}

const LoginResponse = (props: LoginResponseProps) => {
    return {
        user: props.user as UserResponseProps,
        token: props.token
    }
}