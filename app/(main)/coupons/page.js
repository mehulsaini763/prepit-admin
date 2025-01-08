"use client";

import { Search } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Input } from "@/components/ui/input";

import CouponsTable from "@/app/(main)/coupons/_components/coupons-table";
import CouponDetails from "@/app/(main)/coupons/_components/coupons-details";

import { useEffect, useState } from "react";

import useCoupons from '@/hooks/useCoupons'

const CouponsPage = () => {
  const {
    active,
    inactive,
    createCoupon,
    readCoupons,
    reading,
    updating,
    updateCoupon,
  } = useCoupons();

  useEffect(() => {
    readCoupons();
  }, []);

  const [filter, setFilter] = useState("");

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Coupons
      </h1>
      <div className="flex gap-8">
        <div className="w-3/5">
          <Tabs defaultValue="active">
            <div className="flex items-center justify-between gap-2">
              <TabsList>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                  onChange={(e) => setFilter(e.target.value)}
                />
              </div>
            </div>
            <TabsContent value="active">
              <CouponsTable
                data={active}
                filter={filter}
                reading={reading}
                updating={updating}
                updateCoupon={updateCoupon}
              />
            </TabsContent>
            <TabsContent value="inactive">
              <CouponsTable
                data={inactive}
                filter={filter}
                reading={reading}
                updating={updating}
                updateCoupon={updateCoupon}
              />
            </TabsContent>
          </Tabs>
        </div>
        <div className="w-2/5">
          <CouponDetails createCoupon={createCoupon} />
        </div>
      </div>
    </main>
  );
};

export default CouponsPage;
