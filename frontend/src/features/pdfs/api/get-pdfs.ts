
import { PaginatedResponse } from "@/hooks/types";
import { apiClient } from "@/lib/clients/api-client";

export interface PDF {
    id: number;
    title: string;
    content: string;
    user: string;
    is_public: boolean;
    created_at: string;
    updated_at: string;
}

export const getPDFs = async ({username, url}:{username: string; url?: string}): Promise<PDF[]> => {
    console.log("username", username);
        let data: PDF[];
        const projectPage = await apiClient<PaginatedResponse<PDF>>(url || `/api/stories/?user=${username}`);
        data = projectPage?.results || [];
        if (projectPage?.next) {
            data = [...projectPage.results, ...(await getPDFs({ url: projectPage.next, username: username }))];
        }
        return data;
    };
    