"use client";

import _ from "lodash";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
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
  make: string;
  model: string;
  year: number;
  price: string;
  ticket: "Y" | "N" | "N/A";
  stock: "i" | "r" | "u" | number;
  restoration: "Y" | "N" | "N/A";
  seats: number;
  trunk: number;
  speed: number;
  handling: number;
  category: string;
  generation: string;
  unmarketable: boolean;
  image: ImageType;
};

export const columns: ColumnDef<ImportVehicle>[] = [
  {
    accessorKey: "make",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center justify-center mx-auto text-lg tracking-tight text-center uppercase text-gray-50"
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
            row.original.unmarketable
              ? "text-red-500"
              : row.original.ticket === "Y"
              ? "bg-green-600 text-slate-50"
              : " text-black"
          } text-center h-full w-full py-1 px-3`}
        >
          {row.original.make}
        </div>
      );
    },
  },
  {
    accessorKey: "model",
    header: () => (
      <div className="flex items-center justify-center text-gray-50">Model</div>
    ),
    cell: ({ row }) => {
      return (
        <div
          className={`${
            row.original.unmarketable
              ? "text-red-500"
              : row.original.ticket === "Y"
              ? "bg-green-600 text-slate-50"
              : " text-black"
          } h-full w-full py-1 px-3 text-center`}
        >
          {row.original.model}
        </div>
      );
    },
  },
  {
    accessorKey: "year",
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
      return row.original.year > 0 ? (
        <span className="flex items-center justify-center">
          {row.original.year}
        </span>
      ) : (
        <span className="flex items-center justify-center text-red-500">
          {"-"}
        </span>
      );
    },
  },
  {
    accessorKey: "price",
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
      function formatNumberWithCommas(price: string) {
        return _.replace(price, /\B(?=(\d{3})+(?!\d))/g, ",");
      }
      return (
        <div
          className={`${
            row.original.unmarketable
              ? "text-red-500"
              : row.original.ticket === "Y"
              ? "text-green-600"
              : " text-black"
          } flex items-center justify-center`}
        >
          {(row.original as any).price > 0 ? (
            `$${formatNumberWithCommas(row.original.price)}`
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
    accessorKey: "stock",
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
      function transformStock(stock: any) {
        switch (stock) {
          case "r":
            return "RESTRICTED";
          case "u":
            return "UNMARKETABLE";
          case "i":
            return "INF";
          default:
            return stock;
        }
      }

      return (
        <div
          className={`${
            row.original.stock === "u"
              ? "bg-red-500 text-slate-50"
              : row.original.stock === "r"
              ? "bg-black text-red-600"
              : row.original.stock === "i"
              ? "bg-blue-400 text-slate-50"
              : (row.original.stock as any) == "0"
              ? "bg-red-700 text-white"
              : row.original.stock > 0 && row.original.stock <= 4
              ? "bg-orange-500 text-slate-50"
              : "bg-blue-700 text-white"
          } flex items-center justify-center h-full w-full py-1 px-2`}
        >
          {transformStock(row.original.stock as any)}
        </div>
      );
    },
  },
  {
    accessorKey: "restoration",
    header: () => (
      <div className="flex items-center justify-center text-gray-50">
        Restock
      </div>
    ),
    cell: ({ row }) => {
      return (
        <p className="flex items-center justify-center">
          {row.original.restoration === "Y" ? (
            <span className="flex items-center justify-center text-green-600">
              <Check />
            </span>
          ) : row.original.restoration === "N" ? (
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
    accessorKey: "speed",
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
          {row.original.speed === 999 ? (
            <span className="flex items-center justify-center text-red-500">
              {"-"}
            </span>
          ) : (
            <span className="flex items-center justify-center">{`${row.original.speed} mph`}</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "seats",
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
          {row.original.seats}
        </div>
      );
    },
  },
  {
    accessorKey: "trunk",
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
          {row.original.trunk}
        </div>
      );
    },
  },

  {
    accessorKey: "handling",
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
          {`${row.original.handling}/5`}
        </div>
      );
    },
  },
  {
    accessorKey: "category",
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
          {row.original.category}
        </div>
      );
    },
  },
  {
    accessorKey: "generation",
    header: () => (
      <div className="flex items-center justify-center text-gray-50">
        Generation
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center pr-4 text-base uppercase">
          {`Generation ${row.original.generation}`}
        </div>
      );
    },
  },
];
