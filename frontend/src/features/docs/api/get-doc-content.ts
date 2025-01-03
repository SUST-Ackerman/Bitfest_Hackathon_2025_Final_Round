
import { apiClient } from "@/lib/clients/api-client";

export interface DocContent {
    id: number;
    title: string;
    content: string;
}

export const getDocContent = async ({
    docId,
}: {
    docId: string;
}): Promise<DocContent> => {
    const res = await apiClient<DocContent>(
        '/api/stories/docs/' + docId + '/',
    );
    if (!res) {
        throw new Error("Categories not found");
    }
    return res;
};
