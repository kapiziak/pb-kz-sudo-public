"use client";

import { cn } from "@/lib/utils";
import { useGetAllUsers } from "@/src/api/hooks/users/get-all-users";
import { Button } from "@/src/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/src/components/ui/command";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/src/components/ui/popover";
import { ChevronsUpDown, Check } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import TUser from "@/src/types/user";
import Combobox from "@/src/common/Combobox/Combobox";
import TFacility from "@/src/types/facility";
import { useGetAllFacilities } from "@/src/api/hooks/facilities/get-all-facilities";
import { useSelector } from "react-redux";
import { appSelectLanguage } from "@/src/application/store/reducers/appSlice";
import useTranslation from "@/src/application/lang/client/useTranslation";

interface Props {
    multiple?: boolean;
    onFacilitiesChanged?: (value: string[]) => void;
}

export default function SelectFacilities({
    multiple,
    onFacilitiesChanged,
}: Props) {
    const [queryEnabled, setQueryEnabled] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
    const [facilitiesData, setFacilitiesData] = useState<TFacility[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const { data, error } = useGetAllFacilities({
        enabled: queryEnabled,
    });

    const lang = useSelector(appSelectLanguage);

    const selectFacilitiesPlaceholder = useTranslation({
        lang,
        name: "features.facilities.selectFacilities.choosePlaceholder",
    });

    const selectFacilitiesInputPlaceholder = useTranslation({
        lang,
        name: "features.facilities.selectFacilities.inputPlaceholder",
    });

    useEffect(() => {
        function processData() {
            if (error || data?.data?.status !== "success") {
                setHasError(true);
                return;
            }

            if (data?.data?.data.facilities) {
                setFacilitiesData(data.data.data.facilities);
            }
        }
        processData();
    }, [data, error]);

    useEffect(() => {
        onFacilitiesChanged?.(selectedIds);
    }, [onFacilitiesChanged, selectedIds]);

    const handleOpenChanged = useCallback(
        (value: boolean) => {
            if (queryEnabled) return;

            setQueryEnabled(value);
        },
        [queryEnabled]
    );

    const handleValueChanged = useCallback(
        (value: string[]) => {
            console.log("[SelectUsers] handleValueChanged", value);
            setSelectedIds(value);
        },
        [setSelectedIds]
    );

    return (
        <Combobox
            data={facilitiesData.map((x) => ({
                id: x.id,
                label: x.name,
            }))}
            error={hasError}
            onOpenChange={handleOpenChanged}
            onValueChanged={handleValueChanged}
            multiple={multiple}
            translations={{
                placeholder: selectFacilitiesPlaceholder,
                inputPlaceholder: selectFacilitiesInputPlaceholder,
            }}
        />
    );
}
