import { getLangDictionary } from "@/src/application/lang/dictonaries";
import { locales } from "@/src/application/lang/locales";
import ApplicationLayout from "@/src/application/layout/ApplicationLayout";
import { TLangParam } from "@/src/application/types/langParam";
import ProfileSettingsCard from "@/src/features/profile/components/ProfileSettingsCard/ index";
import AdditionalSettings from "@/src/features/settings/components/AdditionalSettings";

export async function generateStaticParams() {
    return locales.map((x) => ({ lang: x }));
}

export default async function SettingsPage({ params: { lang } }: TLangParam) {
    const dict = await getLangDictionary(lang);

    return (
        <ApplicationLayout>
            <div className={"mt-4"}>
                <ProfileSettingsCard />
                <AdditionalSettings />
            </div>
        </ApplicationLayout>
    );
}
