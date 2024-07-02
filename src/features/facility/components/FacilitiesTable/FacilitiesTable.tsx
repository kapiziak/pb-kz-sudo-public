"use client";

import { useGetAllFacilities } from "@/src/api/hooks/facilities/get-all-facilities";
import { components } from "@/src/api/v1";
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
import { useState } from "react";
import FacilityOccupancyBadge from "../FacilityOccupancyBadge";
import FacilitiesTableRowActions from "./TableRow/RowActions";

type TableData = components["schemas"]["Facility"];

const columnHelper = createColumnHelper<TableData>();

const columns = [
    columnHelper.accessor("id", {
        header: ({ column }) => (
            <DataTableColumnHeader title="ID" column={column} />
        ),
        cell: (info) => `#${info.getValue()}`,
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor("name", {
        header: ({ column }) => (
            <DataTableColumnHeader title="Nazwa" column={column} />
        ),
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor("occupancy", {
        header: ({ column }) => (
            <DataTableColumnHeader title="Stan" column={column} />
        ),
        cell: (info) => (
            <FacilityOccupancyBadge
                facilityId={info.row.getValue("id")}
                isOccupied={info.getValue().length !== 0}
            />
        ),
        footer: (info) => info.column.id,
    }),
    columnHelper.display({
        id: "actions",
        cell: (props) => (
            <FacilitiesTableRowActions
                facilityId={props.row.renderValue("id")}
                facilityName={props.row.renderValue("name")}
            />
        ),
    }),
];

interface TableProps {
    data: TableData[];
}
function Table({ data }: TableProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

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

export default function FacilitiesTable() {
    const { data, isLoading } = useGetAllFacilities();

    const facilities = data?.data?.data.facilities;

    if (isLoading || !facilities) {
        return <div>Loading...</div>;
    }

    return <Table data={facilities} />;
}
