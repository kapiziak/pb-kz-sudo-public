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
import { useEffect, useState } from "react";
import TUser from "@/src/types/user";
import { components } from "@/src/api/v1";
import Translation from "@/src/application/lang/client/Translation";
import { appSelectLanguage } from "@/src/application/store/reducers/appSlice";
import { useSelector } from "react-redux";

type ComboboxItemBase = {
    id: string;
    label: string;
};

interface Props<T extends ComboboxItemBase> {
    data: T[];
    error?: string | boolean;
    multiple?: boolean;
    onOpenChange?: (value: boolean) => void;
    onValueChanged?: (value: string[]) => void;
    translations: {
        placeholder: string;
        inputPlaceholder: string;
    };
}

export default function Combobox<T extends ComboboxItemBase>({
    multiple,
    data,
    error,
    onOpenChange,
    onValueChanged,
    translations,
}: Props<T>) {
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string[]>([]);

    useEffect(() => {
        onOpenChange?.(open);
    }, [onOpenChange, open]);

    useEffect(() => {
        onValueChanged?.(value);
    }, [onValueChanged, value]);

    function handleSelectUser(id: string) {
        const userIsSelected = value.includes(id);

        if (multiple) {
            if (userIsSelected) {
                setValue(value.filter((x) => x !== id));
            } else {
                setValue([...value, id]);
            }
        } else {
            setValue([id]);
        }

        if (!multiple) setOpen(false);
    }

    const isUserSelected = (id: string) => value.includes(id);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value.length > 0
                        ? value
                              .map((x) => data.find((y) => y.id === x)?.label)
                              .join(", ")
                        : translations.placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <CommandInput placeholder={translations.inputPlaceholder} />
                    <CommandEmpty>
                        {error ? (
                            <Translation name="common.combobox.serverError" />
                        ) : (
                            <Translation name="common.combobox.entitiesNotFound" />
                        )}
                    </CommandEmpty>
                    <CommandGroup>
                        {data
                            ? data.map((item) => (
                                  <CommandItem
                                      key={item.id}
                                      onSelect={() => handleSelectUser(item.id)}
                                  >
                                      <Check
                                          className={cn(
                                              "mr-2 h-4 w-4",
                                              isUserSelected(item.id)
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                          )}
                                      />
                                      {item.label}
                                  </CommandItem>
                              ))
                            : null}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
