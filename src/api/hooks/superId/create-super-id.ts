import { useMutation, useQueryClient } from "react-query";
import AuthService from "@/src/api/services/auth-service";
import { components, paths } from "../../v1";
import { FetchResponse } from "openapi-fetch";
import FacilityService from "../../services/facility-service";
import { superIdQueryKey } from "./query-keys";
import SuperIdService from "../../services/superId-service";

const superIdService = new SuperIdService();

export function useCreateSuperId() {
    const queryClient = useQueryClient();

    return useMutation<
        FetchResponse<paths["/api/super-id/"]["post"]>,
        unknown,
        {
            identityCardId?: string;
            pin?: string;
            studentId?: string;
            validTo?: number;
        }
    >({
        mutationFn: (variables) => superIdService.create(variables),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: superIdQueryKey,
            });
        },
    });
}
