import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { CircleCheck, Loader2 } from 'lucide-react';
import { useState } from 'react';

const ResolveDialog = ({ loading, id, email, updateQuery }) => {
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState('');
  const subject = `${id}: Issue Resolved`;

  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      // const response = await fetch("/api/mail/send", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     email: email,
      //     message: message,
      //     subject: subject,
      //   }),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      // const result = await response.json();

      // if (response.ok) {
      updateQuery(id, {
        status: 'resolved',
        resolvedResponse: message,
      });

      toast({
        title: 'Resolved',
        description: 'Query is resolved and mail is sent to the user',
      });

      setSent(true);
      // } else {
      //   throw new Error(result.error);
      // }
    } catch (error) {
      console.log('Client error:', error);
      toast({
        title: 'Error',
        description: `Unable to resolve query: ${error.message}`,
        variant: 'destructive',
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Resolve</Button>
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
          <Button className="flex items-center gap-2" disabled={loading || sent || !message} onClick={handleSubmit}>
            {sent ? (
              <>
                <CircleCheck className="h-4 w-4" /> Sent
              </>
            ) : loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Submit'
            )}
          </Button>{' '}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResolveDialog;
