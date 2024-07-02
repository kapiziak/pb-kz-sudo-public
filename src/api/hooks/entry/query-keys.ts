export const entriesQueryKey = "Entries";

const entriesQueryKeys = {
    getAllKey: () => [entriesQueryKey, "GetAll"],
    getKey: (id: number) => [entriesQueryKey, id],
};

export default entriesQueryKeys;
