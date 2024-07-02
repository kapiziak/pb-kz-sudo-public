import BaseService from "@/src/api/services/base-service";

class AuthorizationService extends BaseService {
    constructor() {
        super();
    }

    getAll() {
        return this.client.GET("/api/authorizations/", {});
    }

    getMy() {
        return this.client.GET("/api/authorizations/my-authorizations", {});
    }

    add(data: {
        assignedUsers: string[];
        expireAt: string;
        scopeFacility: string[];
    }) {
        return this.client.POST("/api/authorizations/", {
            body: {
                ...data,
            },
        });
    }

    edit(
        id: string,
        data: {
            assignedUsers: string[];
            expireAt: string;
            scopeFacility: string[];
        }
    ) {
        // @ts-expect-error
        return this.client.PUT(`/api/authorizations/${id}`, {
            body: {
                ...data,
            },
        });
    }

    remove(id: string) {
        // @ts-expect-error
        return this.client.DELETE(`/api/authorizations/${id}`, {});
    }
}

export default AuthorizationService;
