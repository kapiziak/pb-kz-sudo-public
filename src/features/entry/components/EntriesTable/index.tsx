"use client";

import { useGetAllEntries } from "@/src/api/hooks/entry/get-all-entries";
import { components } from "@/src/api/v1";
import useTranslation from "@/src/application/lang/client/useTranslation";
import AlertApiError from "@/src/common/AlertApiError";
import DataTable from "@/src/common/DataTable";
import { DataTableColumnHeader } from "@/src/common/DataTable/DataTableColumnHeader/DataTableColumnHeader";
import {
    ColumnFiltersState,
    createColumnHelper,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

type EntryData = components["schemas"]["Entry"];

const columnHelper = createColumnHelper<EntryData>();

interface TableProps {
    data: EntryData[];
}

function Table({ data }: TableProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const labelTranslationsRooms = useTranslation({
        name: "features.entry.entriesTable.table.columns.rooms",
    });
    const labelTranslationsEntryAt = useTranslation({
        name: "features.entry.entriesTable.table.columns.entry",
    });
    const labelTranslationsReleaseAt = useTranslation({
        name: "features.entry.entriesTable.table.columns.exit",
    });
    const labelTranslationsOccupier = useTranslation({
        name: "features.entry.entriesTable.table.columns.occupier",
    });
    const labelTranslationsAuthorizedBy = useTranslation({
        name: "features.entry.entriesTable.table.columns.authorizedBy",
    });

    const columns = useMemo(
        () => [
            columnHelper.accessor("id", {
                header: ({ column }) => (
                    <DataTableColumnHeader title="ID" column={column} />
                ),
                cell: (info) => `#${info.getValue()}`,
                footer: (info) => info.column.id,
            }),
            columnHelper.accessor("relatedOccupancy", {
                header: labelTranslationsRooms,
                cell: (info) =>
                    info
                        .getValue()
                        .map((x) => x.facility.name)
                        .join(", "),
                footer: (info) => info.column.id,
            }),
            columnHelper.accessor("entryAt", {
                header: ({ column }) => (
                    <DataTableColumnHeader
                        title={labelTranslationsEntryAt}
                        column={column}
                    />
                ),
                cell: (info) => info.getValue().toLocaleString(),
                footer: (info) => info.column.id,
            }),
            columnHelper.accessor("releaseAt", {
                header: ({ column }) => (
                    <DataTableColumnHeader
                        title={labelTranslationsReleaseAt}
                        column={column}
                    />
                ),
                cell: (info) => info.getValue()?.toLocaleString(),
                footer: (info) => info.column.id,
            }),
            columnHelper.accessor("authorizedBy.email", {
                header: labelTranslationsOccupier,
                cell: (info) => info.getValue(),
                footer: (info) => info.column.id,
            }),

            columnHelper.accessor("occupier.email", {
                header: labelTranslationsAuthorizedBy,
                cell: (info) => info.getValue(),
                footer: (info) => info.column.id,
            }),
        ],
        [
            labelTranslationsAuthorizedBy,
            labelTranslationsEntryAt,
            labelTranslationsOccupier,
            labelTranslationsReleaseAt,
            labelTranslationsRooms,
        ]
    );

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    });

    return (
        <div>
            <DataTable table={table} />
        </div>
    );
}

export default function EntriesTable() {
    const { data, isLoading } = useGetAllEntries();

    if (isLoading) return <div>Loading...</div>;

    if (data?.error || !data?.data?.data.entries)
        return <AlertApiError error={data?.error} />;

    return <Table data={data?.data?.data.entries ?? []} />;
}
