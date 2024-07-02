import { useQuery } from "react-query";
import facilitiesQueryKeys from "@/src/api/hooks/facilities/query-keys";
import FacilityService from "@/src/api/services/facility-service";

const facilityService = new FacilityService();

interface Props {
    facilityId: number | string;
    enabled?: boolean;
}

export function useCheckFacilityOccupancy(props: Props) {
    return useQuery({
        enabled: props?.enabled,
        queryKey: facilitiesQueryKeys.facilityOccupancy(props.facilityId),
        queryFn: () => facilityService.checkOccupancy(`${props.facilityId}`),
    });
}
