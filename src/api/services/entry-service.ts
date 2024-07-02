import BaseService from "./base-service";

class EntryService extends BaseService {
    constructor() {
        super();
    }

    getAll() {
        return this.client.GET("/api/entry/", {});
    }

    get(id: number) {
        return this.client.GET(`/api/entry/{id}`, {
            params: {
                path: {
                    id: `${id}`,
                },
            },
        });
    }

    add(facilitiesIds: number[], occupierId: number, authorizationId?: number) {
        return this.client.POST("/api/entry/", {
            body: {
                facilities: facilitiesIds,
                occupierId,
                authorizationId,
            },
        });
    }

    release(id: number) {
        return this.client.POST(`/api/entry/release/{id}`, {
            params: {
                path: {
                    id: `${id}`,
                },
            },
        });
    }
}

export default EntryService;
