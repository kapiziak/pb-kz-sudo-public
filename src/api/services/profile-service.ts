import BaseService from "./base-service";

class ProfileService extends BaseService {
    constructor() {
        super();
    }

    get(userId?: number) {
        return userId
            ? this.client.GET("/api/profile/{userId}", {
                  params: {
                      path: {
                          userId: `${userId}`,
                      },
                  },
              })
            : this.client.GET("/api/profile/", {});
    }

    createProfile(data: {
        firstName: string;
        surname?: string;
        description?: string;
    }) {
        return this.client.POST("/api/profile/", {
            body: data,
        });
    }

    updateProfile(data: {
        firstName?: string;
        surname?: string;
        description?: string;
    }) {
        return this.client.PUT("/api/profile/", {
            body: data,
        });
    }

    /* Due to a bug in openapi-fetch, we can't use the client to upload files. */
    uploadAvatar(data: FormData) {
        return fetch(this.BASE_URL + "api/profile/avatar/", {
            method: "POST",
            body: data,
            credentials: "include",
        });
    }
}

export default ProfileService;
