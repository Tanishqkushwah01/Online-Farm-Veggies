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
    <div className="mt-8 flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={onPrevious}
        disabled={page === 1}
        className="cursor-pointer transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"

        // className="cursor-pointer rounded-xl bg-white px-5 py-2 font-semibold text-gray-700 shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft size={24} />
        {/* Previous */}
      </button>

      <span className="font-semibold text-black">
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        onClick={onNext}
        disabled={page === totalPages}
        // className="cursor-pointer rounded-xl bg-white px-5 py-2 font-semibold text-gray-700 shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        className="cursor-pointer transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
<ChevronRight size={24} />

        {/* Next */}
      </button>
    </div>
  );
};

export default ProductPagination;