import "server-only";
import { TLocale } from "@/src/application/lang/locales";

const dictionaries = {
    en: () => import("@/dictionaries/en.json").then((module) => module.default),
    pl: () => import("@/dictionaries/pl.json").then((module) => module.default),
};

export const getLangDictionary = async (locale: TLocale) => {
    return dictionaries[locale]();
};
