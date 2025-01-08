import { Loader2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

import ResolveDialog from "./resolve-dialog";
import CloseDialog from "./close-dialog";
import ViewDialog from "./view-dialog";

const QueriesTable = ({ data, reading, updating, updateQuery }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="flex items-center gap-4">
              <Checkbox className="translate-y-[-2px]" />
              Name
            </TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">
              <span>Action</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reading ? (
            <TableRow className="h-24">
              <TableCell colSpan={5}>
                <div className="flex justify-center">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              </TableCell>
            </TableRow>
          ) : data.length == 0 ? (
            <TableRow className="h-24 text-center">
              <TableCell colSpan={5}>No Data Available</TableCell>
            </TableRow>
          ) : (
            data.map((v, i) => (
              <TableRow key={i}>
                <TableCell className="flex items-center gap-4">
                  <Checkbox className="translate-y-[-2px]" />
                  {v.fullName}
                </TableCell>
                <TableCell className="table-cell">{v.email} </TableCell>
                <TableCell>{v.category}</TableCell>
                <TableCell className="table-cell">
                  {v.openRequest || v.reOpenRequest}
                </TableCell>
                {v.status == "open" ? (
                  <TableCell className="flex items-center gap-2 justify-end">
                    <ResolveDialog
                      loading={updating}
                      id={v.id}
                      updateQuery={updateQuery}
                      email={v.email}
                    />
                    <ViewDialog query={v} />
                  </TableCell>
                ) : v.status == "resolved" ? (
                  <TableCell className="flex items-center gap-2 justify-end">
                    <CloseDialog
                      loading={updating}
                      id={v.id}
                      updateQuery={updateQuery}
                      email={v.email}
                    />
                    <ViewDialog query={v} />
                  </TableCell>
                ) : v.status == "reOpened" ? (
                  <TableCell className="flex items-center gap-2 justify-end">
                    <CloseDialog
                      loading={updating}
                      id={v.id}
                      updateQuery={updateQuery}
                      email={v.email}
                    />

                    <ViewDialog query={v} />
                  </TableCell>
                ) : (
                  <TableCell className="flex items-center gap-2 justify-end">
                    <ViewDialog query={v} />
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default QueriesTable;
