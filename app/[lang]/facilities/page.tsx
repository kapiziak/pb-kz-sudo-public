import { locales } from "@/src/application/lang/locales";
import { TLangParam } from "@/src/application/types/langParam";
import { getLangDictionary } from "@/src/application/lang/dictonaries";
import ApplicationLayout from "@/src/application/layout/ApplicationLayout";
import { TypographyH2, TypographyP } from "@/src/components/ui/typography";
import FacilitiesTable from "@/src/features/facility/components/FacilitiesTable/FacilitiesTable";

export async function generateStaticParams() {
    return locales.map((x) => ({ lang: x }));
}

export default async function Facilities({ params: { lang } }: TLangParam) {
    const dict = await getLangDictionary(lang);

    return (
        <ApplicationLayout>
            <div>
                <TypographyH2 as={"h1"} className={"pb-0"}>
                    {dict.facilitiesPage.title}
                </TypographyH2>
                <TypographyP>{dict.facilitiesPage.subtitle}</TypographyP>
            </div>
            <div className={"mt-4"}>
                <FacilitiesTable />
            </div>
        </ApplicationLayout>
    );
}
