import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = () => {
  return (
    <div className="bg-white rounded-b-xl p-5 flex items-center justify-between">
      <p className="text-gray-500">Showing 1 to 4 of 128 orders</p>

      <div className="flex items-center gap-2">
        <button className="h-10 w-10 rounded-lg border border-gray-300 flex items-center justify-center">
          <ChevronLeft size={18} />
        </button>

        <button className="h-10 w-10 rounded-lg bg-green-600 text-white">
          1
        </button>

        <button className="h-10 w-10 rounded-lg border border-gray-300">
          2
        </button>

        <button className="h-10 w-10 rounded-lg border border-gray-300">
          3
        </button>

        <button className="h-10 w-10 rounded-lg border border-gray-300 flex items-center justify-center">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;