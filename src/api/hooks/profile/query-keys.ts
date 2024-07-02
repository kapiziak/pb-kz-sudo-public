export const profileQueryKey = "Profile";

const profileQueryKeys = {
    getKey: () => [profileQueryKey, "Get"],
    getSpecific: (userId: number) => [profileQueryKey, "GetByUserId", userId],
};

export default profileQueryKeys;
