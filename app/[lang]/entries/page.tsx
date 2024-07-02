import { getLangDictionary } from "@/src/application/lang/dictonaries";
import { locales } from "@/src/application/lang/locales";
import ApplicationLayout from "@/src/application/layout/ApplicationLayout";
import { TLangParam } from "@/src/application/types/langParam";
import { TypographyH2, TypographyP } from "@/src/components/ui/typography";
import EntriesTable from "@/src/features/entry/components/EntriesTable";

export async function generateStaticParams() {
    return locales.map((x) => ({ lang: x }));
}

export default async function Entries({ params: { lang } }: TLangParam) {
    const dict = await getLangDictionary(lang);

    return (
        <ApplicationLayout>
            <div>
                <TypographyH2 as={"h1"} className={"pb-0"}>
                    {dict.entriesPage.heading}
                </TypographyH2>
                <TypographyP>{dict.entriesPage.subheading}</TypographyP>
            </div>
            <div className={"mt-4"}>
                <EntriesTable />
            </div>
        </ApplicationLayout>
    );
}
