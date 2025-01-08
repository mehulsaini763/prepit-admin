"use client";

import { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
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

import ViewDialog from "./view-dialog";

export const columns = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    id: "question",
    accessorKey: "question",
    header: "Question",
    // header: ({ column }) => (
    //   <Button
    //     variant="ghost"
    //     onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //   >
    //     Question
    //     <ArrowUpDown className="ml-2 h-4 w-4" />
    //   </Button>
    // ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("question")}</div>
    ),
  },
  {
    id: "category",
    accessorKey: "category",
    header: "Category",
    // cell: ({ row }) => (
    //   <div className="lowercase px-4">{row.getValue("email")}</div>
    // ),
  },
  {
    id: "topic",
    accessorKey: "topic",
    header: "Topic",
    // header: ({ column }) => (
    //   <Button
    //     variant="ghost"
    //     onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //   >
    //     Topic
    //     <ArrowUpDown className="ml-2 h-4 w-4" />
    //   </Button>
    // ),
    // cell: ({ row }) => (
    //   <div className="px-4 font-medium">
    //     {row.getValue("topic") ? "true" : "false"}
    //   </div>
    // ),
  },
  {
    id: "isCaselet",
    accessorKey: "isCaselet",
    header: () => <div className="text-right">Caselet</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {row.getValue("isCaselet") ? "true" : "false"}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <div className="text-right">
        <ViewDialog question={row.original}/>
      </div>
    ),
  },
];

const QuestionsTable = ({ data, searchValue }) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  useEffect(() => {
    searchValue != "" ?
      table.getColumn("question")?.setFilterValue(searchValue):table.resetColumnFilters()
  }, [searchValue]);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
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
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    // <div className="flex items-center justify-end space-x-2 py-4">
    //   <div className="flex-1 text-sm text-muted-foreground">
    //     {table.getFilteredSelectedRowModel().rows.length} of{" "}
    //     {table.getFilteredRowModel().rows.length} row(s) selected.
    //   </div>
    //   <div className="space-x-2">
    //     <Button
    //       variant="outline"
    //       size="sm"
    //       onClick={() => table.previousPage()}
    //       disabled={!table.getCanPreviousPage()}
    //     >
    //       Previous
    //     </Button>
    //     <Button
    //       variant="outline"
    //       size="sm"
    //       onClick={() => table.nextPage()}
    //       disabled={!table.getCanNextPage()}
    //     >
    //       Next
    //     </Button>
    //   </div>
    // </div>
  );
};

export default QuestionsTable;