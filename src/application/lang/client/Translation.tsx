import LangDict from "@/dictionaries/dist/locale-dict-type";
import { RecursiveKeyOf } from "@/src/types/helpers";
import { useSelector } from "react-redux";
import { appSelectLanguage } from "../../store/reducers/appSlice";
import useTranslation from "./useTranslation";

interface Props {
    name: RecursiveKeyOf<LangDict>;
    variables?: Array<string | number>;
}

export default function Translation({ name, variables }: Props) {
    const lang = useSelector(appSelectLanguage);

    const fetchedTranslation = useTranslation({
        lang,
        name,
        variables,
    });

    return <>{fetchedTranslation}</>;
}
