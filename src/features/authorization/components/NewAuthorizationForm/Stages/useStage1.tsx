"use client";

import Translation from "@/src/application/lang/client/Translation";
import { DatePickerWithRange } from "@/src/common/DateRangePicker/DateRangePicker";
import IconButton from "@/src/components/ui/icon-button";
import { TypographyP } from "@/src/components/ui/typography";
import SelectFacilities from "@/src/features/facility/components/SelectFacilities/SelectFacilities";
import NewUserModal from "@/src/features/user/components/NewUserModal";
import SelectUsers from "@/src/features/user/components/SelectUsers/SelectUsers";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

interface StageData {
    selectedUsers: string[];
    selectedFacilities: string[];
    dates: DateRange | undefined;
}

export default function useStage1() {
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [dates, setDates] = useState<DateRange | undefined>(undefined);

    function handleUsersChanged(value: string[]) {
        setSelectedUsers(value);
    }

    function handleFacilitiesChanged(value: string[]) {
        setSelectedFacilities(value);
    }

    function handleDatesChanged(value: DateRange | undefined) {
        setDates(value);
    }

    return [
        <>
            <div className="flex flex-col gap-2">
                <TypographyP>
                    <Translation name="features.authorizations.newAuthorizationForm.inputs.selectUsers" />
                </TypographyP>
                <div className="flex gap-2">
                    <div className="w-[340px]">
                        <SelectUsers
                            multiple
                            onUsersChanged={handleUsersChanged}
                        />
                    </div>
                    <div className="w-[32px]">
                        <NewUserModal>
                            <IconButton icon={<PlusIcon />} />
                        </NewUserModal>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <TypographyP>
                    <Translation name="features.authorizations.newAuthorizationForm.inputs.selectFacilities" />
                </TypographyP>
                <SelectFacilities
                    multiple
                    onFacilitiesChanged={handleFacilitiesChanged}
                />
            </div>
            <div className="flex flex-col gap-2">
                <TypographyP>
                    <Translation name="features.authorizations.newAuthorizationForm.inputs.selectDates" />
                </TypographyP>
                <DatePickerWithRange onRangeChanged={handleDatesChanged} />
            </div>
        </>,
        {
            selectedUsers,
            selectedFacilities,
            dates,
        },
    ] as [JSX.Element, StageData];
}
