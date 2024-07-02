import { useQuery } from "react-query";
import ProfileService from "../../services/profile-service";
import profileQueryKeys from "./query-keys";

interface Props {
    userId: number;
    enabled?: boolean;
}

const profileService = new ProfileService();

export function useGetProfile(props: Props) {
    return useQuery({
        enabled: props?.enabled,
        queryKey: profileQueryKeys.getSpecific(props.userId),
        queryFn: () => profileService.get(props.userId),
        staleTime: 5 * 60 * 1000,
    });
}
