"use client";

import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "make", desc: false },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedFilter, setSelectedFilter] = useState<string | null>("all");

  // Filter data based on the selected filter option
  const [inputFilter, setInputFilter] = useState<string>("");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFilter(event.target.value);
    // Clear the input filter when toggling radio buttons
    setInputFilter("");
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return (
        // "as any" is a hacky way, need to fix later
        (selectedFilter === "Y" && (item as any)?.ticket === "Y") ||
        (selectedFilter === "N" && (item as any)?.ticket === "N") ||
        selectedFilter === "all"
      );
    });
  }, [data, selectedFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <>
      <div className="flex flex-col w-[93vw] h-[88vh] mx-auto">
        <div className="flex items-center justify-between w-full py-5">
          <div className="flex w-2/3 space-x-10">
            <Input
              placeholder="Search by Make..."
              value={
                (table.getColumn("make")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("make")?.setFilterValue(event.target.value)
              }
              className="max-w-xl text-xl border-gray-600"
            />
            <div className="flex items-center justify-center space-x-10 text-xl tracking-tight whitespace-nowrap">
              <label id="all" className="flex items-center space-x-1">
                <input
                  type="radio"
                  value={"all"}
                  checked={selectedFilter === "all"}
                  onChange={handleRadioChange}
                  className="w-5 h-5"
                />
                <span>Show All</span>
              </label>
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  value={"Y"}
                  checked={selectedFilter === "Y"}
                  onChange={handleRadioChange}
                  className="w-5 h-5"
                />
                <span>Ticket</span>
              </label>
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  value={"N"}
                  checked={selectedFilter === "N"}
                  onChange={handleRadioChange}
                  className="w-5 h-5"
                />
                <span>No Ticket</span>
              </label>
            </div>
          </div>
          <div className="text-2xl">
            <div className="flex space-x-2">
              <div className="flex items-center space-x-4">Total Vehicles:</div>
              <div className="text-3xl">[{filteredData?.length}]</div>
            </div>
            <p>
              <span className="text-green-600">$$$</span> = ticket required
            </p>
          </div>
        </div>
        <Table className="relative w-full">
          <TableHeader className="sticky top-0 z-10 h-20 text-lg font-medium tracking-tight uppercase bg-gray-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="text-lg font-medium tracking-tight bg-zinc-300 whitespace-nowrap text-zinc-900"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 p-10 text-3xl"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
