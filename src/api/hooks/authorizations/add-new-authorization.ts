import { useMutation, useQueryClient } from "react-query";
import { components, paths } from "../../v1";
import { FetchResponse } from "openapi-fetch";
import AuthorizationService from "../../services/authorization-service";
import authorizationsQueryKeys, { authorizationsQueryKey } from "./query-keys";

const authorizationService = new AuthorizationService();

export function useAddAuthorization() {
    const queryClient = useQueryClient();

    return useMutation<
        FetchResponse<paths["/api/authorizations/"]["post"]>,
        unknown,
        {
            assignedUsers: string[];
            expireAt: string;
            scopeFacility: string[];
        }
    >({
        mutationFn: (variables) =>
            authorizationService.add({
                ...variables,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: authorizationsQueryKey,
            });
        },
    });
}
