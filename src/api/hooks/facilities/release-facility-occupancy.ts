import { FetchResponse } from "openapi-fetch";
import { useMutation, useQueryClient } from "react-query";
import FacilityService from "../../services/facility-service";
import { paths } from "../../v1";
import { facilitiesQueryKey } from "./query-keys";

const facilityService = new FacilityService();

export function useReleaseFacilityOccupancy() {
    const queryClient = useQueryClient();

    return useMutation<
        FetchResponse<paths["/api/facilities/release/{id}"]["post"]>,
        unknown,
        {
            facilityId: string | number;
        }
    >({
        mutationFn: (variables) =>
            facilityService.releaseOccupancy(`${variables.facilityId}`),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: facilitiesQueryKey,
            });
        },
    });
}
