import { FetchResponse } from "openapi-fetch";
import { useMutation, useQueryClient } from "react-query";
import EntryService from "../../services/entry-service";
import { paths } from "../../v1";
import entriesQueryKeys, { entriesQueryKey } from "./query-keys";

const entryService = new EntryService();

export function useAddEntry() {
    const queryClient = useQueryClient();

    return useMutation<
        FetchResponse<paths["/api/entry/"]["post"]>,
        unknown,
        {
            facilitiesIds: number[];
            occupierId: number;
            authorizationId?: number;
        }
    >({
        mutationFn: (variables) =>
            entryService.add(
                variables.facilitiesIds,
                variables.occupierId,
                variables.authorizationId
            ),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: entriesQueryKey,
            });
        },
    });
}
