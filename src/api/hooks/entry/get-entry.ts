import { useQuery } from "react-query";
import EntryService from "../../services/entry-service";
import entriesQueryKeys from "./query-keys";

const entryService = new EntryService();

interface Props {
    enabled?: boolean;
    entryId: number;
}

export function useGetEntry(props: Props) {
    return useQuery({
        enabled: props?.enabled,
        queryKey: entriesQueryKeys.getKey(props.entryId),
        queryFn: () => entryService.get(props.entryId),
    });
}
