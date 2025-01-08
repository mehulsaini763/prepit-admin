import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import UserTable from "@/app/(main)/users/_components/user-table";

const UserPage = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        User Management
      </h1>
      <div className="flex flex-col gap-4">
        <UserTable />
      </div>
    </main>
  );
};

export default UserPage;
