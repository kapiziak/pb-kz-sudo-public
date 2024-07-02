import { locales } from "@/src/application/lang/locales";
import { TLangParam } from "@/src/application/types/langParam";
import { getLangDictionary } from "@/src/application/lang/dictonaries";
import ApplicationLayout from "@/src/application/layout/ApplicationLayout";
import { TypographyH2, TypographyP } from "@/src/components/ui/typography";
import FacilitiesTable from "@/src/features/facility/components/FacilitiesTable/FacilitiesTable";
import InfoCardWithAction from "@/src/features/superId/components/InfoCardWithAction";
import { Download } from "lucide-react";
import CardWithAdditionalAuthForms from "@/src/features/superId/components/CardWithAdditionalAuthForms";
import Image from "next/image";
import SuperIdMainPanel from "@/src/features/superId/components/SuperIdMainPanel";

export async function generateStaticParams() {
    return locales.map((x) => ({ lang: x }));
}

export default async function SuperId({ params: { lang } }: TLangParam) {
    const dict = await getLangDictionary(lang);

    return (
        <ApplicationLayout>
            <div>
                <TypographyH2 as={"h1"} className={"pb-0"}>
                    {dict.superIdPage.heading}
                </TypographyH2>
                <TypographyP>{dict.superIdPage.subheading}</TypographyP>
            </div>
            <div className={"mt-4"}>
                <SuperIdMainPanel />
            </div>
        </ApplicationLayout>
    );
}
