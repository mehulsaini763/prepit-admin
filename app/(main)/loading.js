import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="flex">
        <Loader2 className="animate-spin w-6 h-6" />
        Loading
      </div>
    </div>
  );
};

export default Loading;
