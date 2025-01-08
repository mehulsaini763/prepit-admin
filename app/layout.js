import { Nunito } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/providers/ToastProvider";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Lets Nail This",
  description: "Admin Panel for Lets Nail This CAT Mock Tests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={[nunito.className]}>
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
