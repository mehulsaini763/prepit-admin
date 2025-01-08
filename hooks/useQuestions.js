import { db } from "@/configs/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  writeBatch,
  updateDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

import { v4 } from "uuid";

import { useState } from "react";

import { useToast } from "@/components/ui/use-toast";

const useQuestions = () => {
  const [creating, setCreating] = useState(false);
  const [reading, setReading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [qa, setQa] = useState([]);
  const [varc, setVarc] = useState([]);
  const [dilr, setDilr] = useState([]);
  const [question, setQuestion] = useState(null);

  const { toast } = useToast();

  const fetchQuestions = async (collectionName, category) => {
    try {
      const q = query(
        collection(db, collectionName),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const questions = [];
      querySnapshot.forEach((doc) => {
        questions.push({
          ...doc.data(),
          category: category,
          categoryId: collectionName,
        });
      });
      return questions;
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: `Unable to fetch ${collectionName.toUpperCase()} questions!`,
        variant: "destructive",
      });
      return [];
    } finally {
    }
  };

  const readQuestion = async (collectionName, docId) => {
    setReading(true);
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    setQuestion(docSnap.data());
    setReading(false);
  };

  const readQuestions = async () => {
    setReading(true);

    const qaData = await fetchQuestions("qa", "Quantitative Ability (QA)");
    setQa(qaData);

    const varcData = await fetchQuestions(
      "varc",
      "Verbal Ability & Reading Comprehension (VARC)"
    );
    setVarc(varcData);

    const dilrData = await fetchQuestions(
      "dilr",
      "Data Interpretation & Logical Reasoning (DILR)"
    );
    setDilr(dilrData);

    setReading(false);
  };

  const createQuestions = async (data, category) => {
    setCreating(true);

    const batch = writeBatch(db);

    try {
      for (let i = 0; i < data.length; i++) {
        const id = v4().slice(0, 8);
        const obj = {
          questionId: id,
          question: data[i][0],
          options: [data[i][1], data[i][2], data[i][3], data[i][4]],
          correctOption: data[i][5],
          explanation: data[i][6],
          topic: data[i][7],
          imageUrl: data[i][8] || "",
          isCaselet: data[i][9],
          caseletSituation: data[i][10] || "",
          caseletId: data[i][11] || "",
          caseletSequence: data[i][12] || "",
          updatedAt: serverTimestamp(),
          createdAt: serverTimestamp(),
          metrics: {
            correct: 0,
            incorrect: 0,
            attempts: 0,
            difficultyRatio: 0,
          },
        };
        const docRef = doc(db, category, id);
        batch.set(docRef, obj);
      }
      await batch.commit();
      toast({
        title: "Success",
        description: "All questions uploaded successfully!",
      });
    } catch (error) {
      console.log(error);

      toast({
        title: "Error",
        description: "Unable to upload questions",
        variant: "destructive",
      });
    }
    setCreating(false);
  };

  const updateQuestion = async (collectionName, docId, data) => {
    setUpdating(true);
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, data);
      toast({
        title: "Success",
        description: "Question updated successfully!",
      });
    } catch (error) {
      console.log(error);

      toast({
        title: "Error",
        description: "Unable to update question",
        variant: "destructive",
      });
    }
    setUpdating(false);
  };

  const deleteQuestion = async (collectionName, docId) => {
    setDeleting(true);
    try {
      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);
      toast({
        title: "Success",
        description: "Question Deleted successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to delete question",
        variant: "destructive",
      });
      console.log(error);
    }
    setDeleting(false);
  };

  return {
    qa,
    varc,
    dilr,
    reading,
    readQuestions,
    question,
    readQuestion,
    creating,
    createQuestions,
    updating,
    updateQuestion,
    deleting,
    deleteQuestion,
  };
};

export default useQuestions;
