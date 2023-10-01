"use client";

import _ from "lodash";

import { ColumnDef } from "@tanstack/react-table";
import Check from "@/components/svg/Check";
import Xmark from "@/components/svg/Xmark";

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
    header: () => (
      <div className="flex items-center justify-start text-gray-50">Make</div>
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
    header: () => (
      <div className="flex items-center justify-center text-gray-50">Year</div>
    ),
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
    header: () => (
      <div className="flex items-center justify-center text-gray-50">Price</div>
    ),
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
    header: () => (
      <div className="flex items-center justify-center text-gray-50">Stock</div>
    ),
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
              : ""
          } flex items-center justify-center h-full w-full py-1 px-2`}
        >
          {transformStock(row.original.Stock)}
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
    header: () => (
      <div className="flex items-center justify-center text-gray-50">Seats</div>
    ),
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
    header: () => (
      <div className="flex items-center justify-center text-gray-50">Trunk</div>
    ),
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
    header: () => (
      <div className="flex items-center justify-center text-gray-50">Speed</div>
    ),
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
    header: () => (
      <div className="flex items-center justify-center text-gray-50">
        Handling
      </div>
    ),
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
    header: () => (
      <div className="flex items-center justify-center text-gray-50">
        Category
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center uppercase">
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
        <div className="flex items-center justify-center uppercase">
          {`Generation ${row.original.Generation}`}
        </div>
      );
    },
  },
];
