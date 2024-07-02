import { useMutation, useQueryClient } from "react-query";
import AuthService from "@/src/api/services/auth-service";
import { components, paths } from "../../v1";
import { FetchResponse } from "openapi-fetch";
import FacilityService from "../../services/facility-service";
import { facilitiesQueryKey } from "./query-keys";

const facilityService = new FacilityService();

export function useEditFacility() {
    const queryClient = useQueryClient();

    return useMutation<
        FetchResponse<paths["/api/facilities/{facilityId}"]["put"]>,
        unknown,
        {
            id: string;
            name: string;
        }
    >({
        mutationFn: (variables) =>
            facilityService.edit(variables.id, {
                name: variables.name,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: facilitiesQueryKey,
            });
        },
    });
}
