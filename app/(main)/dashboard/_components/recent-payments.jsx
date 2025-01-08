import { useEffect } from "react";

import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import usePayments from "@/hooks/usePayments";

const RecentPayments = () => {
  const { getRecentPayments, recentPayments } = usePayments();
  useEffect(() => {
    getRecentPayments();
  }, []);
  return (
    <Card className='flex flex-col h-full col-span-2 md:col-span-1'>
      <CardHeader className="flex flex-row items-center">
        <CardTitle>Recent Sales</CardTitle>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/payments">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="grid gap-8 h-full">
        {recentPayments.length == 0 ? (
          <div className="border h-full w-full text-xl font-medium flex flex-col justify-center items-center rounded-md py-24">
            No Sales
          </div>
        ) : (
          recentPayments.map((payment) => (
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarFallback>
                  {payment.fullName
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {payment.fullName}
                </p>
                <p className="text-sm text-muted-foreground">{payment.email}</p>
              </div>
              <div className="ml-auto font-medium">
                +₹{payment.amount / 100}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default RecentPayments;
