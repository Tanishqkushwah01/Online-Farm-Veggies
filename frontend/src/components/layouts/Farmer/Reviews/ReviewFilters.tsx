import { Search } from "lucide-react";

type ReviewFiltersProps = {
  reviewType: "customer" | "product";
  setReviewType: (value: "customer" | "product") => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const ReviewFilters = ({
  reviewType,
  setReviewType,
  search,
  setSearch,
}: ReviewFiltersProps) => {
  return (
    <div className="mt-6 grid grid-cols-4 gap-4">
      <div className="relative col-span-2 rounded-xl bg-white">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={
            reviewType === "customer"
              ? "Search reviews by customer..."
              : "Search reviews by product or customer..."
          }
          className="h-12 w-full rounded-xl border border-gray-300 bg-white pl-12 pr-4 text-gray-700 outline-none focus:ring-1 focus:ring-green-500"
        />
      </div>

      <div className="col-span-2 flex h-12 overflow-hidden rounded-xl border border-gray-300 bg-white">
        <button
          onClick={() => {
            setReviewType("customer");
            setSearch("");
          }}
          className={`flex-1 font-semibold transition ${
            reviewType === "customer"
              ? "bg-green-600 text-white"
              : "cursor-pointer bg-white text-black hover:bg-gray-100"
          }`}
        >
          Customer Reviews
        </button>

        <button
          onClick={() => {
            setReviewType("product");
            setSearch("");
          }}
          className={`flex-1 font-semibold transition ${
            reviewType === "product"
              ? "bg-green-600 text-white"
              : "cursor-pointer bg-white text-black hover:bg-gray-100"
          }`}
        >
          Product Reviews
        </button>
      </div>
    </div>
  );
};

export default ReviewFilters;