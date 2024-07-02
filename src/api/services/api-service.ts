import BaseService from "@/src/api/services/base-service";

class ApiService extends BaseService {
    constructor() {
        super();
    }

    ping() {
        return this.client.GET("/api/", {});
    }
}

export default ApiService;
