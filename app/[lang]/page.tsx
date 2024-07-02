import { getLangDictionary } from "@/src/application/lang/dictonaries";
import { locales } from "@/src/application/lang/locales";
import ApplicationLayout from "@/src/application/layout/ApplicationLayout";
import { TLangParam } from "@/src/application/types/langParam";
import EntriesShortcut from "@/src/common/Shortcuts/EntriesShortcut";
import FacilitiesShortcut from "@/src/common/Shortcuts/FacilitiesShortcut";
import NewAuthorizationShortcut from "@/src/common/Shortcuts/NewAuthorizationShortcut";
import ActiveAuthorizationsSummary from "@/src/common/Summaries/ActiveAuthorizationsSummary";
import OccupiedFacilitiesSummary from "@/src/common/Summaries/OccupiedFacilitiesSummary";
import TodayEntriesSummary from "@/src/common/Summaries/TodayEntriesSummary";

export async function generateStaticParams() {
    return locales.map((x) => ({ lang: x }));
}

export default async function Home({ params: { lang } }: TLangParam) {
    const dict = await getLangDictionary(lang);

    return (
        <ApplicationLayout>
            <div className="flex flex-col gap-4">
                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
                    {/* <SuperIdShortcut /> */}

                    <NewAuthorizationShortcut />

                    <EntriesShortcut />

                    <FacilitiesShortcut />

                    <ActiveAuthorizationsSummary />
                    <TodayEntriesSummary />
                    <OccupiedFacilitiesSummary />
                </div>
            </div>
        </ApplicationLayout>
    );
}
