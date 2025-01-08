import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

import useSubscription from "@/hooks/useSubscription";
import Link from "next/link";

const RecentSubscription = () => {
  const [subscriptions, setSubcriptions] = useState("");
  const { getRecentSubscription } = useSubscription();
  useEffect(() => {
    const subscriptions = getRecentSubscription();
    setSubcriptions(subscriptions);
  }, []);
  return (
    <Link href={"/users"}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{subscriptions}</div>
          <p className="text-xs text-muted-foreground">from last 7 days</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecentSubscription;
