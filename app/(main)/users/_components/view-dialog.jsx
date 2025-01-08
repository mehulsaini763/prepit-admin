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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/configs/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Eye, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import moment from "moment";

const ViewDialog = ({ user }) => {
  const [tests, setTests] = useState(null);

  const getTests = async () => {
    const collectionSnapshot = await getDocs(
      collection(db, "tests", "userTests", user.id)
    );
    const temp = [];
    collectionSnapshot.forEach((doc) => temp.push(doc.data()));
    setTests([...temp]);
  };

  useEffect(() => {
    user && getTests();
  }, []);

  return (
    user && (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          <div className="max-h-96 overflow-hidden">
            <div className="space-y-2 h-full overflow-y-scroll">
              <div>
                <Label htmlFor="name" className="text-sm">
                  Full Name
                </Label>
                <Input disabled value={user.fullName} />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm">
                  Email
                </Label>
                <Input disabled value={user.email} />
              </div>
              <div>
                <Label htmlFor="phoneNo" className="text-sm">
                  Phone Number
                </Label>
                <Input disabled value={user.phoneNumber} />
              </div>
              <div>
                <Label htmlFor="subscription" className="text-sm">
                  Subscription
                </Label>
                <Input disabled value={user.isSubscribed} />
              </div>
              <div>
                <Label htmlFor="test" className="text-sm">
                  Tests
                </Label>
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Section</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {!tests ? (
                        <TableRow className="h-24">
                          <TableCell colSpan={3}>
                            <div className="flex justify-center">
                              <Loader2 className="h-6 w-6 animate-spin" />
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : tests.length == 0 ? (
                        <TableRow className="h-24 text-center">
                          <TableCell colSpan={3}>No tests Available</TableCell>
                        </TableRow>
                      ) : (
                        tests.map((t, i) => (
                          <TableRow key={i}>
                            <TableCell>{t.type}</TableCell>
                            <TableCell>
                              {t?.sections?.length != 0
                                ? "Various"
                                : t.sections[0].sectionName}
                            </TableCell>
                            <TableCell className="text-right hidden md:table-cell">
                              {moment
                                .unix(t.createdAt.seconds)
                                .format("DD/MM/YY hh:mm A")}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
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
