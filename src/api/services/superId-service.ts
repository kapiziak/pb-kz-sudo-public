import BaseService from "@/src/api/services/base-service";

class SuperIdService extends BaseService {
    constructor() {
        super();
    }

    get() {
        return this.client.GET("/api/super-id/", {});
    }

    create(data: {
        identityCardId?: string;
        pin?: string;
        studentId?: string;
        validTo?: number;
    }) {
        return this.client.POST("/api/super-id/", {
            body: data,
        });
    }

    update(data: {
        identityCardId?: string;
        pin?: string;
        studentId?: string;
        validTo?: number;
    }) {
        return this.client.PUT("/api/super-id/", {
            body: data,
        });
    }

    revoke() {
        return this.client.POST("/api/super-id/revoke", {});
    }

    useSecret(secret: string) {
        return this.client.POST("/api/super-id/useSecret", {
            body: {
                secret,
            },
        });
    }

    sendChallenge(challengeId: string, pin: string) {
        return this.client.POST("/api/super-id/challenge/", {
            body: {
                challengeId,
                pin,
            },
        });
    }
}

export default SuperIdService;
