export const UserModel = (props: LoginResponseProps) => {
    return {
        name: props.user.name,
        username: props.user.username,
        email: props.user.email,
        role: props.user.role,
        is_verified: props.user.is_verified,
        token: props.token
    }
}