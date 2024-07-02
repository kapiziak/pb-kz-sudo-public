import { useQuery } from "react-query";
import StatisticsService from "../../services/statistics-service";
import statisticsQueryKeys from "./query-key";

const statisticsService = new StatisticsService();

interface Props {
    enabled?: boolean;
}

export function useGetAllStatistics(props?: Props) {
    return useQuery({
        enabled: props?.enabled,
        queryKey: statisticsQueryKeys.getAllKey(),
        queryFn: () => statisticsService.getAll(),
    });
}
