import { useQuery } from "@tanstack/react-query";
import { TrainingData } from "../api/train-new-data";
import { getTrainingData } from "../api/get-training-data";

export const useTrainingData = () => {
    return useQuery<TrainingData[]>({
        queryKey: ["projects"],
        queryFn: async () => await getTrainingData({}),
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
};
