import AuthService from "@/src/api/services/auth-service";
import { FetchResponse } from "openapi-fetch";
import { useMutation, useQueryClient } from "react-query";
import { paths } from "../../v1";
import userQueryKeys from "../users/query-keys";

const authService = new AuthService();

export function useAuthRegister() {
    const queryClient = useQueryClient();

    return useMutation<
        FetchResponse<paths["/api/auth/register"]["post"]>,
        unknown,
        {
            username: string;
            password?: string;
        }
    >({
        mutationFn: (variables) =>
            authService.register(variables.username, variables.password),
        onSuccess: () => {
            queryClient.invalidateQueries(userQueryKeys.getAllKey());
        },
    });
}
