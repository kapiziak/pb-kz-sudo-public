import { FetchResponse } from "openapi-fetch";
import { useMutation, useQueryClient } from "react-query";
import EntryService from "../../services/entry-service";
import { paths } from "../../v1";
import { entriesQueryKey } from "./query-keys";

const entryService = new EntryService();

export function useReleaseEntry() {
    const queryClient = useQueryClient();

    return useMutation<
        FetchResponse<paths["/api/entry/release/{id}"]["post"]>,
        unknown,
        {
            facilityId: number;
        }
    >({
        mutationFn: (variables) => entryService.release(variables.facilityId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: entriesQueryKey,
            });
        },
    });
}
