// import { ChevronLeft, ChevronRight } from "lucide-react";

// const Pagination = () => {
//   return (
//     <div className="bg-white rounded-b-xl p-5 flex items-center justify-between">
//       <p className="text-gray-500">Showing 1 to 4 of 128 orders</p>

//       <div className="flex items-center gap-2">
//         <button className="h-10 w-10 rounded-lg border border-gray-300 flex items-center justify-center">
//           <ChevronLeft size={18} />
//         </button>

//         <button className="h-10 w-10 rounded-lg bg-green-600 text-white">
//           1
//         </button>

//         <button className="h-10 w-10 rounded-lg border border-gray-300">
//           2
//         </button>

//         <button className="h-10 w-10 rounded-lg border border-gray-300">
//           3
//         </button>

//         <button className="h-10 w-10 rounded-lg border border-gray-300 flex items-center justify-center">
//           <ChevronRight size={18} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Pagination;



import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = () => {
  return (
    <div className="flex flex-col gap-4 rounded-b-xl border-t border-gray-200 bg-white p-4 transition-colors duration-200 sm:p-5 md:flex-row md:items-center md:justify-between dark:border-[#29343c] dark:bg-[#141c23]">
      <p className="text-center text-sm text-gray-500 sm:text-left dark:text-[#9aa7b1]">
        Showing 1 to 4 of 128 orders
      </p>

      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-gray-300 text-gray-700 transition hover:bg-gray-100 dark:border-[#29343c] dark:bg-[#192128] dark:text-[#f5f7f8] dark:hover:bg-[#29343c]"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          className="h-10 w-10 cursor-pointer rounded-lg bg-green-600 text-white transition hover:bg-green-700"
        >
          1
        </button>

        <button
          type="button"
          className="h-10 w-10 cursor-pointer rounded-lg border border-gray-300 bg-white text-gray-700 transition hover:bg-gray-100 dark:border-[#29343c] dark:bg-[#192128] dark:text-[#f5f7f8] dark:hover:bg-[#29343c]"
        >
          2
        </button>

        <button
          type="button"
          className="h-10 w-10 cursor-pointer rounded-lg border border-gray-300 bg-white text-gray-700 transition hover:bg-gray-100 dark:border-[#29343c] dark:bg-[#192128] dark:text-[#f5f7f8] dark:hover:bg-[#29343c]"
        >
          3
        </button>

        <button
          type="button"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-gray-300 text-gray-700 transition hover:bg-gray-100 dark:border-[#29343c] dark:bg-[#192128] dark:text-[#f5f7f8] dark:hover:bg-[#29343c]"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;