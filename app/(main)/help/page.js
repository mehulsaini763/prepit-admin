"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";

import useQueries from "@/hooks/useQueries";

import QueriesTable from "@/app/(main)/help/_components/queries-table";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const HelpDeskPage = () => {
  const {
    open,
    resolved,
    reopened,
    closed,
    reading,
    readQueries,
    updating,
    updateQuery,
  } = useQueries();

  useEffect(() => {
    readQueries();
  }, []);

  const tabs = [
    { data: open, value: "open" },
    { data: resolved, value: "resolved" },
    { data: reopened, value: "Re-Opened" },
    { data: closed, value: "closed" },
  ];

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Help Desk
      </h1>
      <Tabs defaultValue="open">
        <div className="flex items-center justify-between">
          <TabsList>
            {tabs.map((v, i) => (
              <TabsTrigger className="capitalize" key={i} value={v.value}>
                {v.value}
              </TabsTrigger>
            ))}
          </TabsList>
          <Button variant="outline" size="icon" onClick={readQueries}>
            <RefreshCw className={`w-4 h-4 ${reading && "animate-spin"}`} />
          </Button>
        </div>
        {tabs.map((v, i) => (
          <TabsContent key={i} value={v.value}>
            <QueriesTable
              data={v.data}
              updateQuery={updateQuery}
              reading={reading}
              updating={updating}
            />
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
};

export default HelpDeskPage;
