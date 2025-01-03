
import { PaginatedResponse } from "@/hooks/types";
import { apiClient } from "@/lib/clients/api-client";
import { TrainingData } from "./train-new-data";


export const getTrainingData = async ({url}: {url?: string}): Promise<TrainingData[]> => {
        let data: TrainingData[];
        const trainingDataPage = await apiClient<PaginatedResponse<TrainingData>>(url || '/api/chatbot/training-data/');
        data = trainingDataPage?.results || [];
        if (trainingDataPage?.next) {
            data = [...trainingDataPage.results, ...(await getTrainingData({ url: trainingDataPage.next}))];
        }
        return data;
    };
    