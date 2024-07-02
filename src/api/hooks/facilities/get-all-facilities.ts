import { useQuery } from "react-query";
import facilitiesQueryKeys from "@/src/api/hooks/facilities/query-keys";
import FacilityService from "@/src/api/services/facility-service";

const facilityService = new FacilityService();

interface Props {
    enabled?: boolean;
}

export function useGetAllFacilities(props?: Props) {
    return useQuery({
        enabled: props?.enabled,
        queryKey: facilitiesQueryKeys.getAllKey(),
        queryFn: () => facilityService.getAll(),
    });
}
