import { v4 } from "uuid";
import {
  collection,
  deleteDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import Compressor from "compressorjs";

import { db, storage } from "@/configs/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const useMedia = () => {
  const [creating, setCreating] = useState(false);
  const [reading, setReading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [images, setImages] = useState([]);

  const { toast } = useToast();

  const createImages = async (files) => {
    setCreating(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const img = await compressImage(files[i]);
        const { url, imageId } = await uploadImageToStorage(img);
        const obj = await createImageObject(files[i], url, imageId);
        await uploadImageToDatabase(obj, imageId);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Error while uploading Images!",
        variant: "destructive",
      });
    }
    readImages();
    setCreating(false);
  };

  const compressImage = async (file) => {
    return new Promise((resolve) => {
      new Compressor(file, {
        quality: 0.8,
        mimeType: "image/webp",
        convertSize: Infinity,
        success(result) {
          resolve(result);
        },
        error(err) {
          console.log(err.message);
        },
      });
    });
  };

  const createImageObject = async (file, url, id) => {
    try {
      let img = new Image();
      img.src = window.URL.createObjectURL(file);

      const imgLoaded = new Promise((resolve, reject) => {
        img.onload = () => resolve(img);
        img.onerror = (error) => reject(error);
      });

      // Wait for the image to load
      await imgLoaded;

      // Now you can access the height and width
      const height = img.height;
      const width = img.width;

      const obj = {
        id: id,
        name: file.name,
        size: file.size,
        type: file.type,
        height: height,
        width: width,
        src: url,
        createdAt: serverTimestamp(),
      };

      return obj;
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Error while creating Image Object!",
        variant: "destructive",
      });
    }
  };

  const uploadImageToStorage = async (file) => {
    try {
      const imageId = v4().slice(0, 8);
      const storageRef = ref(storage, `images/${imageId}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      return { url, imageId };
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "Error while uploading Image to storage!",
        variant: "destructive",
      });
    }
  };

  const uploadImageToDatabase = async (obj, id) => {
    try {
      const docRef = doc(db, "images", id);
      await setDoc(docRef, obj);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Error while uploading Image to database!",
        variant: "destructive",
      });
    }
  };

  const readImages = async () => {
    setReading(true);
    const q = query(collection(db, "images"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const temp = [];
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    setImages(() => [...temp]);
    setReading(false);
  };

  const deleteImage = async (id) => {
    setDeleting(true);
    try {
      await deleteDoc(doc(db, "images", id));
      toast({
        description: "Image Deleted",
      });
    } catch (error) {
      console.log();
      toast({
        title: "Error",
        description: "Error while deleting Image!",
        variant: "destructive",
      });
    }
    readImages();
    setDeleting(false);
  };

  return {
    images,
    reading,
    creating,
    deleting,
    readImages,
    createImages,
    deleteImage,
  };
};

export default useMedia;
