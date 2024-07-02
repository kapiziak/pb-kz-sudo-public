import { useQuery } from "react-query";
import userQueryKeys from "@/src/api/hooks/users/query-keys";
import UserService from "@/src/api/services/user-service";

const userService = new UserService();

interface Props {
    enabled?: boolean;
}

export function useGetAllUsers(props?: Props) {
    return useQuery({
        enabled: props?.enabled,
        queryKey: userQueryKeys.getAllKey(),
        queryFn: () => userService.getAll(),
    });
}
