export const facilitiesQueryKey = "Facilities";

const facilitiesQueryKeys = {
    getAllKey: () => [facilitiesQueryKey, "GetAll"],
    facilityOccupancy: (facilityId: string | number) => [
        facilitiesQueryKey,
        `${facilityId}`,
        "Occupancy",
    ],
};

export default facilitiesQueryKeys;
