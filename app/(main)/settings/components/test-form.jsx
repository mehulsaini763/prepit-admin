import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const TestForm = ({ data, updateTestDetails }) => {
  const [updating, setUpdating] = useState(false);

  const form = useForm({
    defaultValues: data,
    values: data,
  });

  const onSubmit = async (data) => {
    if (form.formState.isDirty) {
      setUpdating(true);
      await updateTestDetails(data.testType, data);
      setUpdating(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Button variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button disabled={!form.formState.isDirty} type="submit">
            {updating ? (
              <Loader2 className="h-6 w-6 text-white animate-spin" />
            ) : (
              "Save"
            )}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Edit Settings for Test Creation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="totalTime"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel className="text-base font-semibold">
                      Total Time
                    </FormLabel>

                    <FormDescription>
                      Total time available for the test
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="totalTime.h"
                render={({ field }) => (
                  <FormItem>
                    <div>
                      <FormDescription>Hours (min: 0, max: 5)</FormDescription>
                    </div>
                    <FormControl>
                      <Input type="number" min={0} max={5} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="totalTime.m"
                render={({ field }) => (
                  <FormItem>
                    <div>
                      <FormDescription>
                        Minutes (min:{" "}
                        {form.getValues("totalTime.h") != 0 ? 0 : 15}, max: 59)
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Input
                        type="number"
                        min={form.getValues("totalTime.h") != 0 ? 0 : 15}
                        max={59}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {(data.testType == "topic" || data.testType == "section") && (
              <>
                {data.testType == "section" && (
                  <FormField
                    control={form.control}
                    name={`sections[0].totalCaselets`}
                    render={({ field }) => (
                      <FormItem>
                        <div>
                          <FormLabel className="text-base font-semibold">
                            Total Caselets
                          </FormLabel>

                          <FormDescription>
                            Total caselets available for the Test
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name={"sections[0].totalQuestions"}
                  render={({ field }) => (
                    <FormItem>
                      <div>
                        <FormLabel className="text-base font-semibold">
                          Total Questions
                        </FormLabel>

                        <FormDescription>
                          Total questions in the test (min: 10)
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Input type="number" min={10} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </CardContent>
        </Card>
        {(data.testType == "mockMini" || data.testType == "mockFull") &&
          data.sections.map((section, i) => (
            <Card>
              <CardHeader>
                <CardTitle>{section.sectionName} Section</CardTitle>
                <CardDescription>
                  Edit Settings for this Section
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name={`sections[${i}].totalCaselets`}
                  render={({ field }) => (
                    <FormItem>
                      <div>
                        <FormLabel className="text-base font-semibold">
                          Total Caselets
                        </FormLabel>

                        <FormDescription>
                          Total caselets available for this Section (min: 0)
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Input type="number" min={0} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`sections[${i}].totalQuestions`}
                  render={({ field }) => (
                    <FormItem>
                      <div>
                        <FormLabel className="text-base font-semibold">
                          Total Questions
                        </FormLabel>

                        <FormDescription>
                          Total questions in this Section (min: 10)
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Input type="number" min={10} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          ))}
      </form>
    </Form>
  );
};

export default TestForm;
