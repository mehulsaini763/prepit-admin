import { Loader2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const CouponsTable = ({ data, filter, reading, updating, updateCoupon }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Coupon Code</TableHead>
            <TableHead>Percentage Discount</TableHead>
            <TableHead>
              <span>Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reading ? (
            <TableRow className="h-24">
              <TableCell colSpan={3}>
                <div className="flex justify-center">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              </TableCell>
            </TableRow>
          ) : data.length == 0 ? (
            <TableRow className="h-24 text-center">
              <TableCell colSpan={3}>No Data Available</TableCell>
            </TableRow>
          ) : (
            data.map(
              (v, i) =>
                v.id.toLowerCase().includes(filter.toLowerCase()) && (
                  <TableRow key={i}>
                    <TableCell className="flex items-center gap-4">
                      {v.couponCode}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {v.percentageDiscount}
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      {v.isActive ? (
                        <Button
                          disabled={updating}
                          variant="destructive"
                          onClick={() =>
                            updateCoupon(
                              v.id,
                              { isActive: false },
                              "Coupon Deactivated"
                            )
                          }
                        >
                          Disable
                        </Button>
                      ) : (
                        <Button
                          disabled={updating}
                          variant="outline"
                          onClick={() =>
                            updateCoupon(
                              v.id,
                              { isActive: true },
                              "Coupon Activated"
                            )
                          }
                        >
                          Enable
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CouponsTable;
