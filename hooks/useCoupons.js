import { db } from "@/configs/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const useCoupons = () => {
  const [creating, setCreating] = useState(false);
  const [reading, setReading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [active, setActive] = useState([]);
  const [inactive, setInactive] = useState([]);

  const { toast } = useToast();

  const createCoupon = async (data) => {
    setCreating(true);
    try {
      const docRef = doc(db, "coupons", data.couponCode);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        toast({
          description: "Coupon Code already exists!",
          variant: "destructive",
        });
        return;
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Error while checking existing Coupons!",
        variant: "destructive",
      });
      setCreating(false);
      return;
    }

    data = {
      ...data,
      id: data.couponCode,
      isActive: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    try {
      await setDoc(doc(db, "coupons", data.couponCode), data);
      toast({
        description: "Coupon Created Successfully",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Error while creating Coupon!",
        variant: "destructive",
      });
    }
    setCreating(false);
    readCoupons();
  };

  const readCoupons = async () => {
    setReading(true);
    try {
      const q = query(collection(db, "coupons"), orderBy("updatedAt", "desc"));
      const querySnapshot = await getDocs(q);
      const active = [];
      const inactive = [];
      querySnapshot.forEach((doc) => {
        doc.data().isActive
          ? active.push(doc.data())
          : inactive.push(doc.data());
      });
      // console.log(active, inactive);
      setActive(() => [...active]);
      setInactive(() => [...inactive]);
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

  const updateCoupon = async (id, data, message) => {
    setUpdating(true);
    try {
      await updateDoc(doc(db, "coupons", id), data);
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
    readCoupons();
  };

  return {
    active,
    inactive,
    creating,
    createCoupon,
    reading,
    readCoupons,
    updating,
    updateCoupon,
  };
};

export default useCoupons;
