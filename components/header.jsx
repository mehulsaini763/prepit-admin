"use client";

import Link from "next/link";

import { Menu, Package2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/configs/firebase";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <header className="sticky z-50 top-0 flex py-2 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden w-full flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Basic Funda</span>
        </Link>
        <Link
          href="/dashboard"
          className={`${
            pathname.includes("/dashboard")
              ? "text-foreground font-semibold"
              : "text-muted-foreground"
          }  transition-colors hover:text-foreground`}
        >
          Dashboard
        </Link>
        <Link
          href="/questions"
          className={`${
            pathname.includes("/questions")
              ? "text-foreground font-semibold"
              : "text-muted-foreground"
          }  transition-colors hover:text-foreground`}
        >
          Questions
        </Link>
        <Link
          href="/users"
          className={`${
            pathname.includes("/users")
              ? "text-foreground font-semibold"
              : "text-muted-foreground"
          }  transition-colors hover:text-foreground`}
        >
          Users
        </Link>
        <Link
          href="/payments"
          className={`${
            pathname.includes("/payments")
              ? "text-foreground font-semibold"
              : "text-muted-foreground"
          }  transition-colors hover:text-foreground`}
        >
          Payments
        </Link>
        {/* <Link
          href="/reports"
          className={`${
            pathname.includes("/reports")
              ? "text-foreground font-semibold"
              : "text-muted-foreground"
          }  transition-colors hover:text-foreground`}
        >
          Reports
        </Link> */}
        <Link
          href="/media"
          className={`${
            pathname.includes("/media")
              ? "text-foreground font-semibold"
              : "text-muted-foreground"
          }  transition-colors hover:text-foreground`}
        >
          Media
        </Link>
        <Link
          href="/coupons"
          className={`${
            pathname.includes("/coupons")
              ? "text-foreground font-semibold"
              : "text-muted-foreground"
          }  transition-colors hover:text-foreground`}
        >
          Coupons
        </Link>
        <Link
          href="/help"
          className={`${
            pathname.includes("/help")
              ? "text-foreground font-semibold"
              : "text-muted-foreground"
          }  transition-colors hover:text-foreground`}
        >
          Help Desk
        </Link>
        <Link
          href="/settings"
          className={`${
            pathname.includes("/settings")
              ? "text-foreground font-semibold"
              : "text-muted-foreground"
          }  transition-colors hover:text-foreground`}
        >
          Settings
        </Link>
        <Button
          className="ml-auto"
          onClick={() => {
            signOut(auth);
            router.push("/login");
          }}
        >
          Logout
        </Button>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              href="/dashboard"
              className={`${
                pathname.includes("/dashboard")
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground"
              }  transition-colors hover:text-foreground`}
            >
              Dashboard
            </Link>
            <Link
              href="/questions"
              className={`${
                pathname.includes("/questions")
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground"
              }  transition-colors hover:text-foreground`}
            >
              Questions
            </Link>
            <Link
              href="/users"
              className={`${
                pathname.includes("/users")
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground"
              }  transition-colors hover:text-foreground`}
            >
              Users
            </Link>
            <Link
              href="/payments"
              className={`${
                pathname.includes("/payments")
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground"
              }  transition-colors hover:text-foreground`}
            >
              Payments
            </Link>
            {/* <Link
              href="/reports"
              className={`${
                pathname.includes("/reports")
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground"
              }  transition-colors hover:text-foreground`}
            >
              Reports
            </Link> */}
            <Link
              href="/media"
              className={`${
                pathname.includes("/media")
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground"
              }  transition-colors hover:text-foreground`}
            >
              Media
            </Link>
            <Link
              href="/coupons"
              className={`${
                pathname.includes("/coupons")
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground"
              }  transition-colors hover:text-foreground`}
            >
              Coupons
            </Link>
            <Link
              href="/help"
              className={`${
                pathname.includes("/help")
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground"
              }  transition-colors hover:text-foreground`}
            >
              Help Desk
            </Link>
            <Link
              href="/settings"
              className={`${
                pathname.includes("/settings")
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground"
              }  transition-colors hover:text-foreground`}
            >
              Settings
            </Link>
            <div className="self-end">
              <Button
                onClick={() => {
                  signOut(auth);
                  router.push("/login");
                }}
              >
                Logout
              </Button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
