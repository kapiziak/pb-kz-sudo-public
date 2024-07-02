import { getLangDictionary } from "@/src/application/lang/dictonaries";
import { locales } from "@/src/application/lang/locales";
import ApplicationLayout from "@/src/application/layout/ApplicationLayout";
import { TLangParam } from "@/src/application/types/langParam";
import { TypographyH2, TypographyP } from "@/src/components/ui/typography";
import { MyAuthorizationsTable } from "@/src/features/authorization/components/AuthorizationsTable";

export async function generateStaticParams() {
    return locales.map((x) => ({ lang: x }));
}

export default async function MyAuthorizations({
    params: { lang },
}: TLangParam) {
    const dict = await getLangDictionary(lang);

    return (
        <ApplicationLayout>
            <div className="mb-4">
                <TypographyH2 as={"h1"} className={"pb-0"}>
                    {dict.authorizationsPage.myAuthorizations.title}
                </TypographyH2>
                <TypographyP>
                    {dict.authorizationsPage.myAuthorizations.subtitle}
                </TypographyP>
            </div>
            <MyAuthorizationsTable />
        </ApplicationLayout>
    );
}
