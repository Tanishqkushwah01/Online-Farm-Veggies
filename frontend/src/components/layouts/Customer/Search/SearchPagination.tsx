type SearchPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const SearchPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: SearchPaginationProps) => {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);
  }

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded-xl border cursor-pointer border-gray-300 bg-white px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span
            key={index}
            className="px-2 text-gray-400"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`h-10 w-10 rounded-xl cursor-pointer font-semibold transition ${
              currentPage === page
                ? "bg-green-600 text-white"
                : "border border-gray-300 bg-white hover:bg-green-50"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded-xl border cursor-pointer border-gray-300 bg-white px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

export default SearchPagination;