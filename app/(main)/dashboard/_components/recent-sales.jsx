import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

import usePayments from "@/hooks/usePayments";
import Link from "next/link";

const RecentSales = () => {
  const [recentSales, setRecentSales] = useState("");
  const { getRecentSales } = usePayments();
  useEffect(() => {
    const recentSales = getRecentSales();
    setRecentSales(recentSales);
  }, []);
  return (
    <Link href={"/payments"}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sales</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{recentSales}</div>
          <p className="text-xs text-muted-foreground">from last 7 days</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecentSales;
