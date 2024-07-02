export const authorizationsQueryKey = "Authorizations";

const authorizationsQueryKeys = {
    getAllKey: () => [authorizationsQueryKey, "GetAll"],
    getMyKey: () => [authorizationsQueryKey, "GetMy"],
};

export default authorizationsQueryKeys;
