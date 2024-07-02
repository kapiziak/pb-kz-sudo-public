import AuthService from "@/src/api/services/auth-service";
import { FetchResponse } from "openapi-fetch";
import { useMutation, useQueryClient } from "react-query";
import { paths } from "../../v1";

const authService = new AuthService();

export function useAuthChangePassword() {
    const queryClient = useQueryClient();

    return useMutation<
        FetchResponse<paths["/api/auth/password/change"]["post"]>,
        unknown,
        {
            newPassword: string;
        }
    >({
        mutationFn: (variables) =>
            authService.changePassword(variables.newPassword),
    });
}
