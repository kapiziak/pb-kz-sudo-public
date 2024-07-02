import { useQuery } from "react-query";
import AuthorizationService from "../../services/authorization-service";
import authorizationsQueryKeys from "./query-keys";

const authorizationService = new AuthorizationService();

interface Props {
    enabled?: boolean;
}

export function useGetAllAuthorizations(props?: Props) {
    return useQuery({
        enabled: props?.enabled,
        queryKey: authorizationsQueryKeys.getAllKey(),
        queryFn: () => authorizationService.getAll(),
    });
}
