import { Construction } from "lucide-react";

const Reports = () => {
  return (
    <div className="bg-neutral-100 text-neutral-500 gap-8 h-full w-full flex flex-col justify-center items-center">
      <div className="bg-neutral-200 rounded-full p-8">
        <Construction className="w-24 h-24 " />
      </div>
      <div className="text-2xl">Under Development</div>
    </div>
  );
};

export default Reports;
