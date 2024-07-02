import AuthService from "@/src/api/services/auth-service";
import { useQuery } from "react-query";
import authQueryKeys from "@/src/api/hooks/auth/query-keys";

const authService = new AuthService();

export function useCurrentUserInfo() {
    return useQuery({
        cacheTime: 999999,
        queryKey: authQueryKeys.getMeKey(),
        queryFn: () => authService.me(),
    });
}
