"use client";

import Loading from "@/app/(main)/loading";
import { auth } from "@/configs/firebase";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLoading(false);
      if (user) {
        setLoggedIn(true);
      }
    });
  }, []);

  if (loading) return <Loading />;

  if (loggedIn) {
    return children;
  } else redirect("/login");
};

export default AuthProvider;
