"use client";

import { Activity } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import TotalRevenue from "@/app/(main)/dashboard/_components/total-revenue";
import RecentSales from "@/app/(main)/dashboard/_components/recent-sales";
import RecentSubscription from "@/app/(main)/dashboard/_components/recent-subscription";
import RecentPayments from "@/app/(main)/dashboard/_components/recent-payments";
import RecentQueries from "@/app/(main)/dashboard/_components/recent-queries";

const DashboardPage = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Dashboard
      </h1>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <TotalRevenue />
        <RecentSubscription />
        <RecentSales />
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">from last 7 days</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-3 h-full">
        <RecentQueries />
        <RecentPayments />
      </div>
    </main>
  );
};

export default DashboardPage;
