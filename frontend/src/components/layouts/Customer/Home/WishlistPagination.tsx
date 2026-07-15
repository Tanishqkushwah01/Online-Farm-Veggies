import { useWishlist } from "../../../hooks/useWishlist";

const WishlistPagination = () => {
  const {
    page,
    totalPages,
    setPage,
  } = useWishlist();

  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (page > 3) {
      pages.push("...");
    }

    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(totalPages - 1, page + 1);
      i++
    ) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);
  }

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      {/* Previous */}

      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>

      {/* Page Numbers */}

      {pages.map((item, index) =>
        item === "..." ? (
          <span
            key={index}
            className="px-2 text-gray-400"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            onClick={() => setPage(item)}
            className={`h-10 w-10 cursor-pointer rounded-xl font-semibold transition ${
              page === item
                ? "bg-green-600 text-white"
                : "border border-gray-300 bg-white hover:bg-green-50"
            }`}
          >
            {item}
          </button>
        )
      )}

      {/* Next */}

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

export default WishlistPagination;