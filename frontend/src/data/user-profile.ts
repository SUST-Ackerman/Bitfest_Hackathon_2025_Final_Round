interface UserProfileProps {
    id: number;
    uuid: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    picture: string;
    is_verified: boolean;
    date_joined: string;
    roles: string[];
}

const UserProfile = (props: UserProfileProps) => {
    return {
        id: props.id,
        uuid: props.uuid,
        username: props.username,
        name: props.name,
        first_name: props.first_name,
        last_name: props.last_name,
        email: props.email,
        picture: props.picture,
        is_verified: props.is_verified,
        date_joined: props.date_joined,
        roles: props.roles
    }
}