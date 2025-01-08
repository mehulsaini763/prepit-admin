import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IndianRupee } from "lucide-react";

import usePayments from "@/hooks/usePayments";
import Link from "next/link";

const TotalRevenue = () => {
  const [totalRevenue, setTotalRevenue] = useState("");
  const { getTotalRevenue } = usePayments();
  useEffect(() => {
    const totalRevenue = getTotalRevenue();
    setTotalRevenue(totalRevenue);
  }, []);
  return (
    <Link href={"/payments"}>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <IndianRupee className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{totalRevenue}</div>
          <p className="text-xs text-muted-foreground">since 2024</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TotalRevenue;
