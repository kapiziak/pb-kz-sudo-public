import GeneralConfig from "@/src/application/config/general";
import createClient from "openapi-fetch";
import { paths } from "../v1";

class BaseService {
    readonly BASE_URL = GeneralConfig.API.BASE_URL;

    protected headers?: any;
    protected client = createClient<paths>({
        baseUrl: this.BASE_URL,
        credentials: "include",
    });

    constructor() {
        this.headers = {
            "Content-Type": "application/json",
        };
    }

    // async get(endpoint: PathsWithMethod<paths, "get">) {
    //     return GET(endpoint, {});
    //     // return fetch(this.buildUrl(), {
    //     //     headers: this.buildHeaders(),
    //     // });
    // }
    // async post(endpoint: PathsWithMethod<paths, "post">, body: string) {
    //     return POST();
    //     // return fetch(this.buildUrl(), {
    //     //     method: "POST",
    //     //     body,
    //     //     headers: this.buildHeaders(),
    //     // });
    // }
    // async put() {
    //     return fetch(this.buildUrl(), {
    //         method: "PUT",
    //         headers: this.buildHeaders(),
    //     });
    // }
    // async delete() {
    //     return fetch(this.buildUrl(), {
    //         method: "DELETE",
    //         headers: this.buildHeaders(),
    //     });
    // }
    // protected setEntry(entry: string) {
    //     this.entry = entry;
    //     return this;
    // }
    // private buildUrl() {
    //     return `${this.BASE_URL}${this.endpoint}${this.entry ?? ""}`;
    // }
    // private buildHeaders() {
    //     return {
    //         ...this.headers,
    //     };

    public jsonBody(data: any) {
        return JSON.stringify(data);
    }
}

export default BaseService;
