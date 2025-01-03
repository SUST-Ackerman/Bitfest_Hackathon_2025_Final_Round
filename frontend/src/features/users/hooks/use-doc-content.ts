import { useQuery } from "@tanstack/react-query";
import { getUserInfo, User } from "../api/get-user";


export const useUserInfo = ({
    username,
    enabled = true,
}: {
    username: string;
    enabled?: boolean;
}) => {

    const queryKey = ['users', username];

    return useQuery<User>({
        queryKey: queryKey,
        queryFn: async () => {
            return await getUserInfo({
                username
            });
        },
        enabled: enabled,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
};
