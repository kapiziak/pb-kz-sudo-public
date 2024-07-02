import { useMutation, useQueryClient } from "react-query";
import AuthService from "@/src/api/services/auth-service";
import { paths } from "../../v1";
import { FetchResponse } from "openapi-fetch";
import queryKeys from "@/src/api/hooks/auth/query-keys";

const authService = new AuthService();

export function useAuthLogin() {
    const queryClient = useQueryClient();

    return useMutation<
        FetchResponse<paths["/api/auth/login"]["post"]>,
        unknown,
        {
            username: string;
            password: string;
        }
    >({
        mutationFn: (variables) =>
            authService.login(variables.username, variables.password),
        onSuccess: () => {
            queryClient.invalidateQueries(queryKeys.getMeKey());
        },
    });
}
