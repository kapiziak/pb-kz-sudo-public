import { useMutation, useQueryClient } from "react-query";
import AuthService from "@/src/api/services/auth-service";
import { components, paths } from "../../v1";
import { FetchResponse } from "openapi-fetch";
import FacilityService from "../../services/facility-service";
import { superIdQueryKey } from "./query-keys";
import SuperIdService from "../../services/superId-service";

const superIdService = new SuperIdService();

export function useRevokeSuperId() {
    const queryClient = useQueryClient();

    return useMutation<
        FetchResponse<paths["/api/super-id/revoke"]["post"]>,
        unknown,
        {}
    >({
        mutationFn: () => superIdService.revoke(),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: superIdQueryKey,
            });
        },
    });
}
