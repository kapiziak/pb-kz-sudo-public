import { FetchResponse } from "openapi-fetch";
import { useMutation, useQueryClient } from "react-query";
import ProfileService from "../../services/profile-service";
import { paths } from "../../v1";
import { profileQueryKey } from "./query-keys";

const profileService = new ProfileService();

export function useCreateProfile() {
    const queryClient = useQueryClient();

    return useMutation<
        FetchResponse<paths["/api/profile/"]["post"]>,
        unknown,
        {
            firstName: string;
            surname?: string;
            description?: string;
        }
    >({
        mutationFn: (variables) => profileService.createProfile(variables),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: profileQueryKey,
            });
        },
    });
}
