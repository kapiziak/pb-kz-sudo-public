import { locales } from "@/src/application/lang/locales";
import ApplicationLayout from "@/src/application/layout/ApplicationLayout";
import { TLangParam } from "@/src/application/types/langParam";
import { TypographyH2, TypographyP } from "@/src/components/ui/typography";
import CreateSuperIdForm from "@/src/features/superId/components/CreateSuperIdForm";

export async function generateStaticParams() {
    return locales.map((x) => ({ lang: x }));
}

export default async function CreateSuperId({ params: { lang } }: TLangParam) {
    return (
        <ApplicationLayout>
            <div>
                <TypographyH2 as={"h1"} className={"pb-0"}>
                    Stwórz swoje superID
                </TypographyH2>
            </div>
            <div className={"mt-4"}>
                <div className="max-w-[400px]">
                    <CreateSuperIdForm />
                </div>
            </div>
        </ApplicationLayout>
    );
}
