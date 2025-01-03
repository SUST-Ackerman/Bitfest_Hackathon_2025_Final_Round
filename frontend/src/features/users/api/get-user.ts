
import { apiClient } from "@/lib/clients/api-client";

export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;

}

export const getUserInfo = async ({username}:{username: string}): Promise<User> => {
    const res = await apiClient<User>(
        '/api/auth/v1/user/'+ username + '/',
    );
    if (!res) {
        throw new Error("Categories not found");
    }
    return res;
};
