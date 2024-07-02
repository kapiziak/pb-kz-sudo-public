"use client";

import LangDict from "@/dictionaries/dist/locale-dict-type";
import { TLocale } from "@/src/application/lang/locales";
import { RecursiveKeyOf } from "@/src/types/helpers";
import { useEffect, useState } from "react";

import dictEN from "@/dictionaries/en.json";
import dictPL from "@/dictionaries/pl.json";
import { useSelector } from "react-redux";
import { appSelectLanguage } from "../../store/reducers/appSlice";

interface HookProps {
    lang?: TLocale;
    name: RecursiveKeyOf<LangDict>;
    variables?: Array<String | Number>;
}

const dict = {
    pl: dictPL,
    en: dictEN,
};

export default function useTranslation<T = string>({
    lang,
    name,
    variables,
}: HookProps) {
    const [translation, setTranslation] = useState<T>("" as T);

    const fetchedLang = useSelector(appSelectLanguage);

    useEffect(() => {
        async function fetch() {
            const tree = name.split(".");
            let item: any = dict[lang ?? fetchedLang];

            for (const key in tree) {
                item = item[tree[key]];
            }

            if (typeof item === "string" && variables) {
                variables.forEach((variable, index) => {
                    item = item.replace(`{${index}}`, variable);
                });
            }

            setTranslation(item);
        }
        fetch();
    }, [lang, fetchedLang, name, variables]);

    return translation;
}
