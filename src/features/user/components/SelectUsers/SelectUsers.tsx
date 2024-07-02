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
import useTranslation from "@/src/application/lang/client/useTranslation";
import { useSelector } from "react-redux";
import { appSelectLanguage } from "@/src/application/store/reducers/appSlice";

interface Props {
    multiple?: boolean;
    onUsersChanged?: (value: string[]) => void;
}

export default function SelectUsers({ multiple, onUsersChanged }: Props) {
    const [queryEnabled, setQueryEnabled] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
    const [usersData, setUsersData] = useState<TUser[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const { data, error } = useGetAllUsers({
        enabled: queryEnabled,
    });

    const lang = useSelector(appSelectLanguage);

    const selectUsersPlaceholder = useTranslation({
        lang,
        name: "features.user.selectUsers.chooseUserPlaceholder",
    });

    const selectUsersInputPlaceholder = useTranslation({
        lang,
        name: "features.user.selectUsers.inputPlaceholder",
    });

    useEffect(() => {
        function processData() {
            if (error || data?.data?.status !== "success") {
                setHasError(true);
                return;
            }

            if (data?.data?.data.users) {
                setUsersData(data.data.data.users);
            }
        }
        processData();
    }, [data, error]);

    useEffect(() => {
        onUsersChanged?.(selectedIds);
    }, [onUsersChanged, selectedIds]);

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
            data={usersData.map((x) => ({
                id: x.id,
                label: x.email,
            }))}
            error={hasError}
            onOpenChange={handleOpenChanged}
            onValueChanged={handleValueChanged}
            multiple={multiple}
            translations={{
                placeholder: selectUsersPlaceholder,
                inputPlaceholder: selectUsersInputPlaceholder,
            }}
        />
    );
}
