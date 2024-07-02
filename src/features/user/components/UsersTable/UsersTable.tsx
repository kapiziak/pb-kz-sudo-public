"use client";

import { useGetAllUsers } from "@/src/api/hooks/users/get-all-users";
import Translation from "@/src/application/lang/client/Translation";
import DataTable from "@/src/common/DataTable";
import { DataTableColumnHeader } from "@/src/common/DataTable/DataTableColumnHeader/DataTableColumnHeader";

import TUser from "@/src/types/user";
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
import { useState } from "react";

type TableData = TUser;

const columnHelper = createColumnHelper<TableData>();

interface TableProps {
    data: TableData[];
}
function Table({ data }: TableProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const columns = [
        columnHelper.accessor("id", {
            header: ({ column }) => (
                <DataTableColumnHeader title="ID" column={column} />
            ),
            cell: (info) => `#${info.getValue()}`,
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor("email", {
            header: ({ column }) => (
                <DataTableColumnHeader
                    titleNode={
                        <Translation name="features.user.usersTable.table.columns.email" />
                    }
                    column={column}
                />
            ),
            cell: (info) => info.getValue(),
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor("role", {
            header: ({ column }) => (
                <DataTableColumnHeader
                    titleNode={
                        <Translation name="features.user.usersTable.table.columns.role" />
                    }
                    column={column}
                />
            ),
            cell: (info) => <>{info.getValue()}</>,
            footer: (info) => info.column.id,
        }),
        columnHelper.display({
            id: "actions",
            cell: (props) => <></>,
        }),
    ];

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

export default function UsersTable() {
    const { data, isLoading } = useGetAllUsers();

    const users = data?.data?.data.users;

    if (isLoading || !users) {
        return <div>Loading...</div>;
    }

    return <Table data={users} />;
}
