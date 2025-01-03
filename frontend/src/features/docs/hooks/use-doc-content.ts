
import { useQuery } from "@tanstack/react-query";

import { DocContent, getDocContent } from "../api/get-doc-content";

export const useDocContent = ({
    docId,
    enabled = true,
}: {
    docId: string;
    enabled?: boolean;
}) => {

    const queryKey = ['docs', docId];

    return useQuery<DocContent>({
        queryKey: queryKey,
        queryFn: async () => {
            return await getDocContent({
                docId: docId,
            });
        },
        enabled: enabled,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
};
