import { useQuery } from "react-query";
import ProfileService from "../../services/profile-service";
import profileQueryKeys from "./query-keys";

interface Props {
    enabled?: boolean;
}

const profileService = new ProfileService();

export function useGetMyProfile(props?: Props) {
    return useQuery({
        enabled: props?.enabled,
        queryKey: profileQueryKeys.getKey(),
        queryFn: () => profileService.get(),
        staleTime: 5 * 60 * 1000,
    });
}
