import { db } from '@/configs/firebase';
import { collection, getAggregateFromServer, getDocs, limit, orderBy, query, sum, Timestamp, where } from 'firebase/firestore';

import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';

const date = new Date();
date.setDate(date.getDate() - 7);
const sevenDaysAgoTimestamp = Timestamp.fromDate(date);

const usePayments = () => {
  const [creating, setCreating] = useState(false);
  const [reading, setReading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [payments, setPayments] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);

  const { toast } = useToast();

  const readPayments = async () => {
    setReading(true);
    try {
      const q = query(collection(db, 'payments'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const payments = [];
      querySnapshot.forEach((doc) => payments.push(doc.data()));
      setPayments(payments);
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: 'Unable to fetch data!',
        variant: 'destructive',
      });
    }
    setReading(false);
  };

  const getTotalRevenue = async () => {
    const q = query(collection(db, 'payments'));
    const snapshot = await getAggregateFromServer(q, {
      totalRevenue: sum('amount'),
    });

    return snapshot.data().totalRevenue;
  };

  const getRecentSales = async () => {
    const q = query(collection(db, 'payments'), where('createdAt', '>=', sevenDaysAgoTimestamp));
    const snapshot = await getAggregateFromServer(q, {
      recentSales: sum('amount'),
    });
    return snapshot.data().recentSales;
  };

  const getRecentPayments = async () => {
    setReading(true);
    const q = query(collection(db, 'payments'), orderBy('createdAt', 'desc'), limit(5));
    const snapshot = await getDocs(q);
    const recentPayments = [];
    snapshot.forEach((doc) => recentPayments.push(doc.data()));
    setRecentPayments(recentPayments);
    setReading(false);
  };

  return {
    payments,
    recentPayments,
    reading,
    readPayments,
    getTotalRevenue,
    getRecentSales,
    getRecentPayments,
  };
};

export default usePayments;
