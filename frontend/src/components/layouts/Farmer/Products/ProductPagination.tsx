// import { ChevronLeft, ChevronRight } from "lucide-react";

// type ProductPaginationProps = {
//   page: number;
//   totalPages: number;
//   onPrevious: () => void;
//   onNext: () => void;
// };

// const ProductPagination = ({
//   page,
//   totalPages,
//   onPrevious,
//   onNext,
// }: ProductPaginationProps) => {
//   if (totalPages <= 1) return null;

//   return (
//     <div className="mt-8 flex items-center justify-center gap-4">
//       <button
//         type="button"
//         onClick={onPrevious}
//         disabled={page === 1}
//         className="cursor-pointer transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"

//         // className="cursor-pointer rounded-xl bg-white px-5 py-2 font-semibold text-gray-700 shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
//       >
//         <ChevronLeft size={24} />
//         {/* Previous */}
//       </button>

//       <span className="font-semibold text-black">
//         Page {page} of {totalPages}
//       </span>

//       <button
//         type="button"
//         onClick={onNext}
//         disabled={page === totalPages}
//         // className="cursor-pointer rounded-xl bg-white px-5 py-2 font-semibold text-gray-700 shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
//         className="cursor-pointer transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
//       >
// <ChevronRight size={24} />

//         {/* Next */}
//       </button>
//     </div>
//   );
// };

// export default ProductPagination;



import { ChevronLeft, ChevronRight } from "lucide-react";

type ProductPaginationProps = {
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
};

const ProductPagination = ({
  page,
  totalPages,
  onPrevious,
  onNext,
}: ProductPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex w-full items-center justify-center gap-3 px-2 sm:gap-4 sm:px-0">
      <button
        type="button"
        onClick={onPrevious}
        disabled={page === 1}
        aria-label="Previous page"
        className="
          flex
          h-10
          w-10
          shrink-0
          cursor-pointer
          items-center
          justify-center
          rounded-lg
          text-gray-700
          transition
          hover:bg-gray-300
          disabled:cursor-not-allowed
          disabled:opacity-50
          dark:text-[#f5f7f8]
          dark:hover:bg-[#29343c]
        "
      >
        <ChevronLeft size={24} />
      </button>

      <span className="whitespace-nowrap text-sm font-semibold text-black dark:text-[#f5f7f8] sm:text-base">
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        onClick={onNext}
        disabled={page === totalPages}
        aria-label="Next page"
        className="
          flex
          h-10
          w-10
          shrink-0
          cursor-pointer
          items-center
          justify-center
          rounded-lg
          text-gray-700
          transition
          hover:bg-gray-300
          disabled:cursor-not-allowed
          disabled:opacity-50
          dark:text-[#f5f7f8]
          dark:hover:bg-[#29343c]
        "
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default ProductPagination;