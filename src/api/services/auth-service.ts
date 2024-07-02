import BaseService from "@/src/api/services/base-service";

class AuthService extends BaseService {
    constructor() {
        super();
    }
    login(username: string, password: string) {
        const data = {
            login: username,
            password,
        };

        return this.client.POST("/api/auth/login", {
            body: data,
        });
    }
    register(username: string, password?: string) {
        const data = {
            login: username,
            password,
        };

        return this.client.POST("/api/auth/register", {
            body: data,
        });
    }

    me() {
        return this.client.GET("/api/auth/me", {});
    }

    logout() {
        return this.client.POST("/api/auth/logout", {});
    }

    changePassword(newPassword: string) {
        return this.client.POST("/api/auth/password/change", {
            body: {
                newPassword,
            },
        });
    }
}

export default AuthService;
