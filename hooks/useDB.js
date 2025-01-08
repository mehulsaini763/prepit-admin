import { db } from "@/configs/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  orderBy,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { useToast } from "@/components/ui/use-toast";

const useDB = () => {
  const {toast}=useToast() 
  const setDocument = async (collectionName, docId, data) => {
    try {
      await setDoc(doc(db, collectionName, docId), data);
      return true;
    } catch (error) {
      toast.error("Error Creating Document");
      return false;
    }
  };

  const getDocument = async (collectionName, docId) => {
    const docSnap = await getDoc(doc(db, collectionName, docId));
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      toast.error("Error Fetching Document");
      return null;
    }
  };

  const getCollection = async (collectionName) => {
    const docs = [];
    try {
      const collectionSnapshot = await getDocs(collection(db, collectionName));
      collectionSnapshot.forEach((doc) => docs.push(doc.data()));
      return docs;
    } catch (error) {
      toast.error("Error Fetching Collection");
      return null;
    }
  };

  const getCollectionByOrder = async (collectionName) => {
    const docs = [];
    try {
      const querySnapshot = await getDocs(
        query(collection(db, collectionName), orderBy("date", "desc"))
      );
      querySnapshot.forEach((doc) => docs.push(doc.data()));
      return docs;
    } catch (error) {
      toast.error("Error Fetching Collection By Order");
      return null;
    }
  };

  const updateDocument = async (collectionName, docId, data) => {
    try {
      await updateDoc(doc(db, collectionName, docId), data);
      return true;
    } catch (error) {
      toast.error("Error Updating Document");
      return false;
    }
  };

  const deleteDocument = async (collectionName, docId) => {
    try {
      await deleteDoc(doc(db, collectionName, docId));
      return true;
    } catch (error) {
      toast.error("Error Deleting Document");
      return false;
    }
  };

  return {
    getDocument,
    getCollection,
    getCollectionByOrder,
    setDocument,
    updateDocument,
    deleteDocument,
  };
};

export default useDB;
