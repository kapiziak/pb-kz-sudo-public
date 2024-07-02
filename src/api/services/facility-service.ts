import BaseService from "@/src/api/services/base-service";

class FacilityService extends BaseService {
    constructor() {
        super();
    }

    getAll() {
        return this.client.GET("/api/facilities/", {});
    }

    add(name: string) {
        return this.client.POST("/api/facilities/", {
            body: {
                name,
            },
        });
    }

    edit(id: string, { name }: { name: string }) {
        return this.client.PUT(`/api/facilities/{facilityId}`, {
            body: {
                name,
            },
            params: {
                path: {
                    facilityId: id,
                },
            },
        });
    }

    remove(id: string) {
        return this.client.DELETE(`/api/facilities/{facilityId}`, {
            params: {
                path: {
                    facilityId: id,
                },
            },
        });
    }

    checkOccupancy(id: string) {
        return this.client.GET(`/api/facilities/{facilityId}/occupancies`, {
            params: {
                path: {
                    facilityId: id,
                },
            },
        });
    }
    releaseOccupancy(facilityId: string) {
        return this.client.POST(`/api/facilities/release/{id}`, {
            params: {
                path: {
                    id: facilityId,
                },
            },
        });
    }
}

export default FacilityService;
