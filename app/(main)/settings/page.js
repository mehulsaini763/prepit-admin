"use client";

import { Loader2 } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useEffect, useState } from "react";

import {
  collection,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "@/configs/firebase";
import { useToast } from "@/components/ui/use-toast";
import TestForm from "./components/test-form";

const QuestionsPage = () => {
  const { toast } = useToast();

  const [sampleTests, setSampleTests] = useState(null);

  const getSampleTests = async () => {
    const collectionRef = collection(db, "sampleTests");
    const docSnapshot = await getDocs(collectionRef);
    const tests = [];
    docSnapshot.forEach((doc) => tests.push(doc.data()));
    setSampleTests(tests);
  };

  const updateSampleTests = async (type, data) => {
    const docRef = doc(db, "sampleTests", type);
    await setDoc(docRef, data);
    toast({
      description: "Test Details Updated!",
    });
    getSampleTests();
  };

  useEffect(() => {
    getSampleTests();
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Test Settings
      </h1>
      <Tabs
        className="flex flex-col md:flex-row items-start gap-4"
        defaultValue="topic"
      >
        <div className="flex gap-2 w-full md:w-1/3 border p-4 rounded-md">
          <TabsList
            className={
              "md:sticky flex flex-col h-fit w-full p-0 bg-background gap-2"
            }
          >
            <TabsTrigger className="w-full " value="topic">
              Topic
            </TabsTrigger>
            <TabsTrigger className="w-full " value="section">
              Sectional
            </TabsTrigger>
            <TabsTrigger className="w-full " value="mockMini">
              MockMini
            </TabsTrigger>
            <TabsTrigger className="w-full " value="mockFull">
              MockFull
            </TabsTrigger>
          </TabsList>
        </div>
        {!sampleTests ? (
          <div className="h-full w-2/3 rounded-md flex flex-col justify-center items-center border p-4">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          sampleTests.map((test, i) => (
            <TabsContent className="mt-0 w-full md:w-2/3" value={test.testType}>
              <TestForm data={test} updateTestDetails={updateSampleTests} />
            </TabsContent>
          ))
        )}
      </Tabs>
    </main>
  );
};

export default QuestionsPage;
