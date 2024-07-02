"use client";

import Translation from "@/src/application/lang/client/Translation";
import { DatePickerWithRange } from "@/src/common/DateRangePicker/DateRangePicker";
import { Button } from "@/src/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { TypographyH3, TypographyP } from "@/src/components/ui/typography";
import SelectFacilities from "@/src/features/facility/components/SelectFacilities/SelectFacilities";
import SelectUsers from "@/src/features/user/components/SelectUsers/SelectUsers";
import { X } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { render } from "react-dom";

interface StageProps {
    selectedUsers: string[];
    selectedFacilities: string[];
    dates: DateRange | undefined;
}

export default function useStage2({
    dates,
    selectedFacilities,
    selectedUsers,
}: StageProps) {
    function renderSelectedItemsData(
        items: string[],
        variant: "user" | "facility"
    ) {
        return items.map((x, key) => (
            <div key={key} className="flex flex-row gap-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <X className="cursor-pointer" width="0.75em" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>
                                {variant === "user" ? (
                                    <Translation name="features.authorizations.newAuthorizationForm.step2Labels.deselectUserCaption" />
                                ) : (
                                    <Translation name="features.authorizations.newAuthorizationForm.step2Labels.deselectFacilityCaption" />
                                )}
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <span>{x}</span>
            </div>
        ));
    }

    return [
        <>
            <div className="flex flex-col gap-2">
                <TypographyP className="font-bold">
                    <Translation name="features.authorizations.newAuthorizationForm.step2Labels.users" />
                </TypographyP>
                {renderSelectedItemsData(selectedUsers, "user")}
            </div>
            <div className="flex flex-col gap-2">
                <TypographyP className="font-bold">
                    <Translation name="features.authorizations.newAuthorizationForm.step2Labels.selectedFacilities" />
                </TypographyP>
                {renderSelectedItemsData(selectedFacilities, "facility")}
            </div>
            <div className="flex flex-col gap-2">
                <TypographyP className="font-bold">
                    <Translation name="features.authorizations.newAuthorizationForm.step2Labels.dates" />
                </TypographyP>
                <TypographyP>
                    <>
                        {dates?.from?.toLocaleDateString()} -{" "}
                        {dates?.to?.toLocaleDateString()}
                    </>
                </TypographyP>
            </div>
        </>,
    ] as [JSX.Element];
}
