import { useQuery } from "react-query";
import EntryService from "../../services/entry-service";
import entriesQueryKeys from "./query-keys";

const entryService = new EntryService();

interface Props {
    enabled?: boolean;
}

export function useGetAllEntries(props?: Props) {
    return useQuery({
        enabled: props?.enabled,
        queryKey: entriesQueryKeys.getAllKey(),
        queryFn: () => entryService.getAll(),
    });
}
