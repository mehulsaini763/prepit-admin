"use client";

import { Loader2, RefreshCw, Upload } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Link from "next/link";

import { useEffect, useState } from "react";

import useQuestions from "@/hooks/useQuestions";

import QuestionsTable from "@/app/(main)/questions/_components/questions-table";

const QuestionsPage = () => {
  const { qa, varc, dilr, reading, readQuestions } = useQuestions();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    readQuestions();
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Questions
      </h1>
      <div className="flex flex-col gap-2">
        <Tabs defaultValue="QA">
          <div className="flex items-center gap-2">
            <TabsList>
              <TabsTrigger value="QA">QA</TabsTrigger>
              <TabsTrigger value="VARC">VARC</TabsTrigger>
              <TabsTrigger value="DILR">DILR</TabsTrigger>
            </TabsList>
            <div className="relative">
              {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /> */}
              <Input
                placeholder="Search Questions..."
                onChange={(event) => setSearchValue(event.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="ml-auto flex items-center gap-2">
              {/* <Button size="sm" variant="outline" className="gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button> */}

              <Button variant="outline" size="icon" onClick={readQuestions}>
                <RefreshCw className={`w-4 h-4 ${reading && "animate-spin"}`} />
              </Button>

              <Link href="/questions/upload">
                <Button size="sm" className="gap-1">
                  <Upload className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Upload
                  </span>
                </Button>
              </Link>
            </div>
          </div>
          <TabsContent value="QA">
            {reading ? (
              <div className="flex flex-col items-center justify-center rounded-md border h-24">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : (
              <QuestionsTable data={qa} searchValue={searchValue} />
            )}
          </TabsContent>
          <TabsContent value="VARC">
            {reading ? (
              <div className="flex flex-col items-center justify-center rounded-md border h-24">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : (
              <QuestionsTable data={varc} searchValue={searchValue} />
            )}
          </TabsContent>
          <TabsContent value="DILR">
            {reading ? (
              <div className="flex flex-col items-center justify-center rounded-md border h-24">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : (
              <QuestionsTable data={dilr} searchValue={searchValue} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default QuestionsPage;