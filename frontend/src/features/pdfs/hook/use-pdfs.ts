import { useQuery } from "@tanstack/react-query";
import { getPDFs, PDF } from "../api/get-pdfs";

export const usePDFs = ({username}: {username: string}) => {
    return useQuery<PDF[]>({
        queryKey: ["projects"],
        queryFn: async () => await getPDFs({ username: username }),
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
};
