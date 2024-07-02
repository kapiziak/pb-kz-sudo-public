import { FetchResponse } from "openapi-fetch";
import { useMutation, useQueryClient } from "react-query";
import ProfileService from "../../services/profile-service";
import { paths } from "../../v1";
import { profileQueryKey } from "./query-keys";

const profileService = new ProfileService();

export function useUploadProfileAvatar() {
    const queryClient = useQueryClient();

    return useMutation<
        FetchResponse<paths["/api/profile/avatar/"]["post"]>,
        unknown,
        {
            file: File;
        }
    >({
        /* Due to a bug in openapi-fetch, we can't use the client to upload files. */
        /* @ts-expect-error */
        mutationFn: (variables) => {
            const formData = new FormData();
            formData.append("file", variables.file);

            return profileService.uploadAvatar(formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: profileQueryKey,
            });
        },
    });
}
