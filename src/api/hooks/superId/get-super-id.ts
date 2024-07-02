import { useQuery } from "react-query";
import userQueryKeys from "@/src/api/hooks/users/query-keys";
import UserService from "@/src/api/services/user-service";
import SuperIdService from "../../services/superId-service";
import superIdQueryKeys from "./query-keys";

const userService = new SuperIdService();

export function useGetSuperId() {
    return useQuery({
        queryKey: superIdQueryKeys.getKey(),
        queryFn: () => userService.get(),
    });
}
