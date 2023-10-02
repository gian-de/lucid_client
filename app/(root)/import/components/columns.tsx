"use client";

import _ from "lodash";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Check from "@/components/svg/Check";
import Xmark from "@/components/svg/Xmark";
import { Button } from "@/components/ui/button";

export type ImageAttributes = {
  url: string;
};

export type ImageType = {
  data: [
    {
      attributes: ImageAttributes;
    }
  ];
};

export type ImportResponse = {
  id: number;
  attributes: ImportVehicle;
};

export type ImportVehicle = {
  Make: string;
  Model: string;
  Year: number;
  Price: string;
  Ticket: "Y" | "N" | "NA";
  Stock: "i" | "r" | "u" | number;
  Restoration: "Y" | "N" | "NA";
  Seats: number;
  Trunk: number;
  Speed: number;
  Handling: number;
  Category: string;
  Generation: string;
  Unmarketable: boolean;
  Image: ImageType;
};

export const columns: ColumnDef<ImportVehicle>[] = [
  {
    accessorKey: "Make",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center justify-start text-lg tracking-tight uppercase text-gray-50"
        >
          Make
          <ArrowUpDown className="w-5 h-5 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div
          className={`${
            row.original.Unmarketable
              ? "text-red-500"
              : row.original.Ticket === "Y"
              ? "text-green-600"
              : " text-black"
          } pl-4`}
        >
          {row.original.Make}
        </div>
      );
    },
  },
  {
    accessorKey: "Model",
    header: () => (
      <div className="flex items-center justify-start text-gray-50">Model</div>
    ),
    cell: ({ row }) => {
      return (
        <div
          className={`${
            row.original.Unmarketable
              ? "text-red-500"
              : row.original.Ticket === "Y"
              ? "text-green-600"
              : " text-black"
          }`}
        >
          {row.original.Model}
        </div>
      );
    },
  },
  {
    accessorKey: "Year",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center justify-start text-lg tracking-tight uppercase text-gray-50"
        >
          Year
          <ArrowUpDown className="w-5 h-5 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.Year > 0 ? (
        <span className="flex items-center justify-center">
          {row.original.Year}
        </span>
      ) : (
        <span className="flex items-center justify-center text-red-500">
          {"-"}
        </span>
      );
    },
  },
  {
    accessorKey: "Price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center justify-start text-lg tracking-tight uppercase text-gray-50"
        >
          Price
          <ArrowUpDown className="w-5 h-5 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      function formatNumberWithCommas(Price: string) {
        return _.replace(Price, /\B(?=(\d{3})+(?!\d))/g, ",");
      }
      return (
        <div
          className={`${
            row.original.Unmarketable
              ? "text-red-500"
              : row.original.Ticket === "Y"
              ? "text-green-600"
              : " text-black"
          } flex items-center justify-center`}
        >
          {(row.original as any).Price > 0 ? (
            `$${formatNumberWithCommas(row.original.Price)}`
          ) : (
            <span className="flex items-center justify-center text-red-500">
              {"-"}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "Stock",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center justify-start text-lg tracking-tight uppercase text-gray-50"
        >
          Stock
          <ArrowUpDown className="w-5 h-5 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      function transformStock(Stock: any) {
        switch (Stock) {
          case "r":
            return "RESTRICTED";
          case "u":
            return "UNMARKETABLE";
          case "i":
            return "INF";
          default:
            return Stock;
        }
      }
      function extractNumberFromString(string: string) {
        const numberRegex = /\d+/;
        const match = string.match(numberRegex);
        return match ? Number(match[0]) : string;
      }
      return (
        <div
          className={`${
            row.original.Stock === "u"
              ? "bg-red-500 text-slate-50"
              : row.original.Stock === "r"
              ? "bg-black text-red-600"
              : row.original.Stock === "i"
              ? "bg-blue-400 text-slate-50"
              : (row.original.Stock as any) == "0"
              ? "bg-red-700 text-white"
              : row.original.Stock > 0 && row.original.Stock <= 5
              ? "bg-orange-500 text-slate-50"
              : "bg-blue-700 text-white"
          } flex items-center justify-center h-full w-full py-1 px-2`}
        >
          {transformStock(extractNumberFromString(row.original.Stock as any))}
        </div>
      );
    },
  },
  {
    accessorKey: "Restoration",
    header: () => (
      <div className="flex items-center justify-center text-gray-50">
        Restoration
      </div>
    ),
    cell: ({ row }) => {
      return (
        <p className="flex items-center justify-center">
          {row.original.Restoration === "Y" ? (
            <span className="flex items-center justify-center text-green-600">
              <Check />
            </span>
          ) : row.original.Restoration === "N" ? (
            <span className="flex items-center justify-center text-red-700">
              <Xmark />
            </span>
          ) : (
            <span className="flex items-center justify-center text-red-500">
              {"N/A"}
            </span>
          )}
        </p>
      );
    },
  },
  {
    accessorKey: "Seats",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center justify-start text-lg tracking-tight uppercase text-gray-50"
        >
          Seats
          <ArrowUpDown className="w-5 h-5 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          {row.original.Seats}
        </div>
      );
    },
  },
  {
    accessorKey: "Trunk",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center justify-start text-lg tracking-tight uppercase text-gray-50"
        >
          Trunk
          <ArrowUpDown className="w-5 h-5 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          {row.original.Trunk}
        </div>
      );
    },
  },
  {
    accessorKey: "Speed",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center justify-start text-lg tracking-tight uppercase text-gray-50"
        >
          Speed
          <ArrowUpDown className="w-5 h-5 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          {row.original.Speed === 999 ? (
            <span className="flex items-center justify-center text-red-500">
              {"-"}
            </span>
          ) : (
            <span className="flex items-center justify-center">{`${row.original.Speed} mph`}</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "Handling",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center justify-start text-lg tracking-tight uppercase text-gray-50"
        >
          Handling
          <ArrowUpDown className="w-5 h-5 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          {`${row.original.Handling}/5`}
        </div>
      );
    },
  },
  {
    accessorKey: "Category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center justify-start text-lg tracking-tight uppercase text-gray-50"
        >
          Category
          <ArrowUpDown className="w-5 h-5 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center text-base uppercase">
          {row.original.Category}
        </div>
      );
    },
  },
  {
    accessorKey: "Generation",
    header: () => (
      <div className="flex items-center justify-center text-gray-50">
        Generation
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center text-base uppercase">
          {`Generation ${row.original.Generation}`}
        </div>
      );
    },
  },
];
