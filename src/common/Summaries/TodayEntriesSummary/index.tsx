"use client";

import { useGetAllStatistics } from "@/src/api/hooks/statistics/get-all-statistics";
import Translation from "@/src/application/lang/client/Translation";
import { User2Icon } from "lucide-react";
import AlertApiError from "../../AlertApiError";
import SummaryCard from "../SummaryCard";

export default function TodayEntriesSummary() {
    const { data, isLoading } = useGetAllStatistics();

    if (!isLoading && (data?.error || data?.data.status !== "success"))
        return <AlertApiError error={data?.error} />;

    return (
        <SummaryCard
            title={<Translation name="common.summaries.entries.title" />}
            count={data?.data?.data.todayEntries ?? 0}
            caption={<Translation name="common.summaries.entries.caption" />}
            icon={<User2Icon width={"1em"} height={"1em"} />}
        />
    );
}
