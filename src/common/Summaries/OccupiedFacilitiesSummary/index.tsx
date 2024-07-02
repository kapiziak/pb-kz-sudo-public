"use client";

import { useGetAllStatistics } from "@/src/api/hooks/statistics/get-all-statistics";
import Translation from "@/src/application/lang/client/Translation";
import { KeyIcon } from "lucide-react";
import AlertApiError from "../../AlertApiError";
import SummaryCard from "../SummaryCard";

export default function OccupiedFacilitiesSummary() {
    const { data, isLoading } = useGetAllStatistics();

    if (!isLoading && (data?.error || data?.data.status !== "success"))
        return <AlertApiError error={data?.error} />;

    return (
        <SummaryCard
            title={<Translation name="common.summaries.facilities.title" />}
            count={data?.data?.data.occupiedFacilities ?? 0}
            caption={<Translation name="common.summaries.facilities.caption" />}
            icon={<KeyIcon width={"1em"} height={"1em"} />}
            isLoading={isLoading}
        />
    );
}
