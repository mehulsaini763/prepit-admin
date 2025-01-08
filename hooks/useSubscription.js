import { db } from "@/configs/firebase";
import {
  Timestamp,
  collection,
  count,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";

import { useToast } from "@/components/ui/use-toast";

const date = new Date();
date.setDate(date.getDate() - 7);
const sevenDaysAgoTimestamp = Timestamp.fromDate(date);

const useSubscription = () => {
  const { toast } = useToast();

  const getRecentSubscription = async () => {
    const q = query(
      collection(db, "payments"),
      where("createdAt", ">=", sevenDaysAgoTimestamp)
    );
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  };

  return {
    getRecentSubscription,
  };
};

export default useSubscription;
