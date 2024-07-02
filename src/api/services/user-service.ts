import BaseService from "@/src/api/services/base-service";

class UserService extends BaseService {
    constructor() {
        super();
    }

    getAll() {
        return this.client.GET("/api/users/", {});
    }
}

export default UserService;
