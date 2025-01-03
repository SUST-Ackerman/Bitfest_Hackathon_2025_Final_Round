
import { apiClient } from "@/lib/clients/api-client";

export interface TrainingData {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;

}

export const uploadNewTrainingData = async ({
    banglish,
    bangla,
}:{
    banglish: string;
    bangla: string;
}): Promise<TrainingData> => {
    const res = await apiClient<TrainingData>(
        '/api/chatbot/train-data/', {
            method: 'POST',
            body: JSON.stringify({
                banglish,
                bangla,
            })
        }
    );
    if (!res) {
        throw new Error("Categories not found");
    }
    return res;
};
