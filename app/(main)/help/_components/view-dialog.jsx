"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Eye } from "lucide-react";

const ViewDialog = ({ query }) => {
  return (
    query && (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Query Details</DialogTitle>
          </DialogHeader>
          <div className="max-h-96 overflow-hidden">
            <div className="space-y-2 h-full overflow-y-auto p-2">
              {query.openRequest != "" && (
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="openRequest">Open Query</Label>
                  <Textarea
                    disabled
                    value={query.openRequest}
                    id="openRequest"
                  />
                </div>
              )}
              {query.resolvedResponse != "" && (
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="resolvedResponse" className="text-right">
                    Resolved Response
                  </Label>
                  <Textarea
                    disabled
                    value={query.resolvedResponse}
                    id="resolvedResponse"
                  />
                </div>
              )}
              {query.reOpenRequest != "" && (
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="reOpenRequest">Re-Open Query</Label>
                  <Textarea
                    disabled
                    value={query.reOpenRequest}
                    id="reOpenRequest"
                  />
                </div>
              )}
              {query.closedResponse != "" && (
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="closedResponse" className="text-right">
                    Closed Response
                  </Label>
                  <Textarea
                    disabled
                    value={query.closedResponse}
                    id="closedResponse"
                  />
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  );
};

export default ViewDialog;
