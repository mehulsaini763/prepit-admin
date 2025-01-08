import Header from "@/components/header";
import AuthProvider from "@/providers/AuthProvider";
import { Suspense } from "react";
import Loading from "./loading";

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <main className="h-full flex flex-col">
        <Header />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
    </AuthProvider>
  );
};

export default MainLayout;
