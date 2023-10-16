"use client";

import { useMemo, useState, useEffect } from "react";

import { Input } from "@/components/ui/input";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Button } from "./button";

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
    { id: "model", desc: false },
    { id: "price", desc: false },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedFilter, setSelectedFilter] = useState<string | null>("all");

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    category: false,
    generation: false,
  });

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

  // for Input/ Global state
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div className="flex flex-col w-[93vw] h-[91vh] mx-auto">
        <div className="flex items-center justify-between w-full py-4">
          <div className="flex items-center w-11/12 space-x-4 md:space-x-6">
            <Input
              placeholder="Search by Make, Model, etc..."
              value={filtering ?? ""}
              onChange={(e) => setFiltering(e.target.value)}
              className="max-w-sm text-xl border-gray-600"
            />
            <div className="flex items-center justify-center space-x-4 text-sm tracking-tight sm:text-xl whitespace-nowrap">
              <label
                id="all"
                className="flex items-center space-x-1 cursor-pointer"
              >
                <input
                  type="radio"
                  value={"all"}
                  checked={selectedFilter === "all"}
                  onChange={handleRadioChange}
                  className="w-5 h-5"
                />
                <span>
                  <span className="hidden md:inline-block">Show</span> All
                </span>
              </label>
              <label className="flex items-center space-x-1 cursor-pointer">
                <input
                  type="radio"
                  value={"Y"}
                  checked={selectedFilter === "Y"}
                  onChange={handleRadioChange}
                  className="w-5 h-5"
                />
                <span>Ticket</span>
              </label>
              <label className="flex items-center space-x-1 cursor-pointer">
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

            <div className="flex items-center space-x-1 text-lg md:text-xl whitespace-nowrap">
              <div className="flex">Total Vehicles:</div>
              <div className="flex text-xl md:text-2xl">
                [{filteredData?.length}]
              </div>
            </div>
          </div>
          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  variant="outline"
                  className="px-3 py-2 overflow-hidden text-sm tracking-tighter border-gray-700 cursor-pointer whitespace-nowrap hover:bg-gray-700 hover:text-slate-50"
                >
                  <p>View More</p>
                </Button>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="text-xl capitalize cursor-pointer"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value: boolean) => {
                            // !! turns the value into a boolean
                            column.toggleVisibility(!!value);
                          }}
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </div>
        </div>
        <Table className="relative w-full">
          <TableHeader className="sticky top-0 z-10 h-20 text-xl font-medium tracking-tight uppercase bg-gray-700">
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
