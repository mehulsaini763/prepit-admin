import { Loader2, PlusCircle, RotateCcw } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.z.object({
  couponCode: z
    .string()
    .min(6, { message: "Code should be of 6 characters" })
    .max(6, { message: "Code should be of 6 characters" })
    .toUpperCase(),
  percentageDiscount: z.string().regex(/^(100|\d{1,2})$/, {
    message: "Discout shoud be between 1% - 100%",
  }),
});

const CouponDetails = ({createCoupon}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      couponCode: "",
      percentageDiscount: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(createCoupon)}>
        <Card>
          <CardHeader>
            <CardTitle>Coupon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="couponCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coupon Code</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="percentageDiscount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Percentage Discount</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between gap-2">
            <Button
              size="sm"
              className="gap-1"
              variant="outline"
              onClick={() => form.reset()}
            >
              <RotateCcw className="h-4 w-4" />
              <span className="not-sr-only sm:whitespace-nowrap">Reset</span>
            </Button>
            <Button size="sm" className="gap-1" type="submit">
              {false ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span className="not-sr-only sm:whitespace-nowrap">
                    Please Wait...
                  </span>
                </>
              ) : (
                <>
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="not-sr-only sm:whitespace-nowrap">
                    Create
                  </span>
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default CouponDetails;
