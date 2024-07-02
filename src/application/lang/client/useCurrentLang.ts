import { useSelector } from "react-redux";
import { appSelectLanguage } from "../../store/reducers/appSlice";

export default function useCurrentLang() {
    const lang = useSelector(appSelectLanguage);

    return lang;
}
