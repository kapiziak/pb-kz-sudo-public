import BaseService from "./base-service";

class StatisticsService extends BaseService {
    constructor() {
        super();
    }

    getAll() {
        return this.client.GET("/api/statistics/all", {});
    }
}

export default StatisticsService;
