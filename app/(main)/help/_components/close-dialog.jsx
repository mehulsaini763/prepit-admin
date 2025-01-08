import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { CircleCheck, Loader2 } from "lucide-react";
import { useState } from "react";

const CloseDialog = ({ loading, id, email, updateQuery }) => {
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");
  const subject = `${id}: Issue Closed`;

  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      await fetch("/api/mail/send", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          message: message,
          subject: subject,
        }),
      });
      updateQuery(id, {
        status: "closed",
        closedResponse: message,
      });
      toast({
        title: "Closed",
        description: "Query is closed and mail is sent to the user",
      });
      setSent(true);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Unable close query",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Close</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Write Message</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-start gap-2">
          <Label htmlFor="name" className="text-right">
            Subject
          </Label>
          <Input id="subject" className="max-h-60" disabled value={subject} />
        </div>
        <div className="flex flex-col items-start gap-2">
          <Label htmlFor="name" className="text-right">
            Message
          </Label>
          <Textarea
            id="message"
            placeholder="Write your response..."
            className="max-h-60"
            disabled={sent}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button
            className="flex items-center gap-2"
            disabled={loading || sent || !message}
            onClick={handleSubmit}
          >
            {sent ? (
              <>
                <CircleCheck className="h-4 w-4" /> Sent
              </>
            ) : loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>{" "}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CloseDialog;
