import { db } from "@/configs/firebase";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const useQueries = () => {
  const [creating, setCreating] = useState(false);
  const [reading, setReading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [open, setOpen] = useState([]);
  const [closed, setClosed] = useState([]);
  const [resolved, setResolved] = useState([]);
  const [reopened, setReOpened] = useState([]);

  const { toast } = useToast();

  const readQueries = async () => {
    setReading(true);
    try {
      const q = query(collection(db, "queries"), orderBy("updatedAt", "desc"));
      const querySnapshot = await getDocs(q);
      const open = [];
      const closed = [];
      const resolved = [];
      const reopened = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().status == "open") {
          open.push({ ...doc.data(), id: doc.id });
          return;
        }
        if (doc.data().status == "resolved") {
          resolved.push({ ...doc.data(), id: doc.id });
          return;
        }
        if (doc.data().status == "reOpened") {
          reopened.push({ ...doc.data(), id: doc.id });
          return;
        }
        if (doc.data().status == "closed") {
          closed.push({ ...doc.data(), id: doc.id });
          return;
        }
      });
      setOpen(() => [...open]);
      setClosed(() => [...closed]);
      setResolved(() => [...resolved]);
      setReOpened(() => [...reopened]);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Unable to fetch data!",
        variant: "destructive",
      });
    }
    setReading(false);
  };

  const updateQuery = async (id, data, message) => {
    setUpdating(true);
    try {
      await updateDoc(doc(db, "queries", id), {
        ...data,
        updatedAt: serverTimestamp(),
      });
      toast({
        description: message,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Unable to update data!",
        variant: "destructive",
      });
    }
    setUpdating(false);
    readQueries();
  };

  return {
    open,
    closed,
    resolved,
    reopened,
    reading,
    readQueries,
    updating,
    updateQuery,
  };
};

export default useQueries;
