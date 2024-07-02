import { TLocale } from "@/src/application/lang/locales";

const GeneralConfig = {
    DEFAULT_THEME: "light" as "light" | "dark",
    DEFAULT_LANGUAGE: "en" as TLocale,
    API: {
        BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:2222/",
    },
};

export default GeneralConfig;
