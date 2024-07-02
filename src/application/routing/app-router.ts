import GeneralConfig from "@/src/application/config/general";
import { TLocale } from "@/src/application/lang/locales";

class AppRouter {
    private readonly lang: TLocale;
    constructor(lang: TLocale = GeneralConfig.DEFAULT_LANGUAGE) {
        this.lang = lang;
    }

    home() {
        return this.prepareUrl("/");
    }

    loginIn() {
        return this.prepareUrl("/login");
    }

    logout() {
        return this.prepareUrl("/logout");
    }

    users() {
        return this.prepareUrl("/users");
    }

    facilities(variant: "list" | "add" = "list") {
        const base = this.prepareUrl("/facilities");

        switch (variant) {
            case "list":
                return base;
            case "add":
                return `${base}/add`;
        }
    }

    authorizations(variant: "list" | "add" | "my" = "list") {
        const base = this.prepareUrl("/authorizations");

        switch (variant) {
            case "list":
                return base;
            case "add":
                return `${base}/add`;
            case "my":
                return `${base}/my`;
        }
    }

    superId(variant: "list" | "create" | "scan" = "list") {
        const base = this.prepareUrl("/super-id");

        switch (variant) {
            case "list":
                return base;
            case "create":
                return `${base}/create`;
            case "scan":
                return `${base}/scan`;
        }
    }

    entries() {
        return this.prepareUrl("/entries");
    }

    settings(variant?: "profile") {
        const base = this.prepareUrl("/settings");

        switch (variant) {
            case "profile":
                return `${base}/#profile`;
            default:
                return base;
        }
    }

    protected prepareUrl(path: string) {
        return `/${this.lang}${path}`;
    }
}

export default AppRouter;
