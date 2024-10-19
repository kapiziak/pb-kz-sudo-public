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

    public jsonBody(data: any) {
        return JSON.stringify(data);
    }
}

export default BaseService;
