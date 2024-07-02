import { useMutation, useQueryClient } from "react-query";
import AuthService from "@/src/api/services/auth-service";
import { paths } from "../../v1";
import { FetchResponse } from "openapi-fetch";
import { authQueryKey } from "@/src/api/hooks/auth/query-keys";

const authService = new AuthService();

export function useAuthLogout() {
    const queryClient = useQueryClient();

    return useMutation<
        FetchResponse<paths["/api/auth/logout"]["post"]>,
        unknown,
        unknown
    >({
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: authQueryKey,
            });
        },
    });
}
