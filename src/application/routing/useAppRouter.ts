import useCurrentLang from "../lang/client/useCurrentLang";
import AppRouter from "./app-router";

export default function useAppRouter() {
    const lang = useCurrentLang();

    return new AppRouter(lang);
}
