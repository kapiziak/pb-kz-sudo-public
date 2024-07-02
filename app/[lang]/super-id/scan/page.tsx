import { getLangDictionary } from "@/src/application/lang/dictonaries";
import { locales } from "@/src/application/lang/locales";
import ApplicationLayout from "@/src/application/layout/ApplicationLayout";
import { TLangParam } from "@/src/application/types/langParam";
import { TypographyH2 } from "@/src/components/ui/typography";
import DecodeSuperIdForm from "@/src/features/superId/components/DecodeSuperIdForm";

export async function generateStaticParams() {
    return locales.map((x) => ({ lang: x }));
}

export default async function ScanSuperId({ params: { lang } }: TLangParam) {
    const dict = await getLangDictionary(lang);

    return (
        <ApplicationLayout>
            <div>
                <TypographyH2 as={"h1"} className={"pb-0"}>
                    {dict.scanSuperIdPage.heading}
                </TypographyH2>
            </div>
            <div className={"my-4"}>
                <div className="">
                    <DecodeSuperIdForm />
                </div>
            </div>
        </ApplicationLayout>
    );
}
