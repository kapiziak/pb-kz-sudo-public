"use client";

import { useGetAllAuthorizations } from "@/src/api/hooks/authorizations/get-all-authorizations";
import { useGetMyAuthorizations } from "@/src/api/hooks/authorizations/get-my-authorizations";
import { components } from "@/src/api/v1";
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

type TableData = components["schemas"]["Authorization"];

const columnHelper = createColumnHelper<TableData>();

interface TableProps {
    data: TableData[];
}

function Table({ data }: TableProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const columns = useMemo(
        () => [
            columnHelper.accessor("id", {
                header: ({ column }) => (
                    <DataTableColumnHeader title="ID" column={column} />
                ),
                cell: (info) => `#${info.getValue()}`,
                footer: (info) => info.column.id,
            }),
            columnHelper.accessor("assignedUsers", {
                header: ({ column }) => (
                    <DataTableColumnHeader
                        title={"Upowaznieni"}
                        column={column}
                    />
                ),
                cell: (info) =>
                    info
                        .getValue()
                        .map((x) => x.email)
                        .join(", "),
                footer: (info) => info.column.id,
            }),
            columnHelper.accessor("createdBy", {
                header: ({ column }) => (
                    <DataTableColumnHeader
                        title={"Utworzone przez"}
                        column={column}
                    />
                ),
                cell: (info) => info.getValue().email,
                footer: (info) => info.column.id,
            }),
            columnHelper.accessor("scopeFacility", {
                header: ({ column }) => (
                    <DataTableColumnHeader title={"Obiekty"} column={column} />
                ),
                cell: (info) =>
                    info
                        .getValue()
                        .map((x) => x.name)
                        .join(", "),
                footer: (info) => info.column.id,
            }),
            columnHelper.accessor("createdAt", {
                header: ({ column }) => (
                    <DataTableColumnHeader
                        title={"Utworzone"}
                        column={column}
                    />
                ),
                cell: (info) => info.getValue().toLocaleString(),
                footer: (info) => info.column.id,
            }),
            columnHelper.accessor("expireAt", {
                header: ({ column }) => (
                    <DataTableColumnHeader title={"Wygasa"} column={column} />
                ),
                cell: (info) => info.getValue().toLocaleString(),
                footer: (info) => info.column.id,
            }),
        ],
        []
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

export function AuthorizationsTable() {
    const { data, isLoading } = useGetAllAuthorizations();

    if (isLoading) return <div>Loading...</div>;

    if (data?.error || !data?.data?.data.authorizations)
        return <AlertApiError error={data?.error} />;

    return <Table data={data?.data?.data.authorizations ?? []} />;
}

export function MyAuthorizationsTable() {
    const { data, isLoading } = useGetMyAuthorizations();

    if (isLoading) return <div>Loading...</div>;

    if (data?.error || !data?.data?.data.authorizations)
        return <AlertApiError error={data?.error} />;

    return <Table data={data?.data?.data.authorizations ?? []} />;
}
