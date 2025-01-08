import { useEffect } from "react";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpRight } from "lucide-react";

import useQueries from "@/hooks/useQueries";

const RecentQueries = () => {
  const { open, readQueries } = useQueries();
  useEffect(() => {
    readQueries();
  }, []);
  return (
    <Card className="flex flex-col col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Recent Queries</CardTitle>
          <CardDescription>
            Recent open queries from your users.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/help">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className='h-full'>
        {open.length == 0 ? (
          <div className="border h-full w-full text-xl font-medium flex flex-col justify-center items-center rounded-md py-24">
            No Queries
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead className="text-right">Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {open.map((query, index) => {
                if (index < 5)
                  return (
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">{query.fullName}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {query.email}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="font-medium">{query.category}</div>
                      </TableCell>
                    </TableRow>
                  );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentQueries;
