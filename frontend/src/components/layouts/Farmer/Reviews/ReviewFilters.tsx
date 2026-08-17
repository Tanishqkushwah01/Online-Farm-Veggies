// import { Search } from "lucide-react";

// type ReviewFiltersProps = {
//   reviewType: "customer" | "product";
//   setReviewType: (value: "customer" | "product") => void;
//   search: string;
//   setSearch: React.Dispatch<React.SetStateAction<string>>;
// };

// const ReviewFilters = ({
//   reviewType,
//   setReviewType,
//   search,
//   setSearch,
// }: ReviewFiltersProps) => {
//   return (
//     <div className="mt-6 grid grid-cols-4 gap-4">
//       <div className="relative col-span-2 rounded-xl bg-white">
//         <Search
//           size={20}
//           className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//         />

//         <input
//           type="text"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder={
//             reviewType === "customer"
//               ? "Search reviews by customer..."
//               : "Search reviews by product or customer..."
//           }
//           className="h-12 w-full rounded-xl border border-gray-300 bg-white pl-12 pr-4 text-gray-700 outline-none focus:ring-1 focus:ring-green-500"
//         />
//       </div>

//       <div className="col-span-2 flex h-12 overflow-hidden rounded-xl border border-gray-300 bg-white">
//         <button
//           onClick={() => {
//             setReviewType("customer");
//             setSearch("");
//           }}
//           className={`flex-1 font-semibold transition ${
//             reviewType === "customer"
//               ? "bg-green-600 text-white"
//               : "cursor-pointer bg-white text-black hover:bg-gray-100"
//           }`}
//         >
//           Customer Reviews
//         </button>

//         <button
//           onClick={() => {
//             setReviewType("product");
//             setSearch("");
//           }}
//           className={`flex-1 font-semibold transition ${
//             reviewType === "product"
//               ? "bg-green-600 text-white"
//               : "cursor-pointer bg-white text-black hover:bg-gray-100"
//           }`}
//         >
//           Product Reviews
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ReviewFilters;



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
    <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-4">
      {/* Search */}
      <div className="relative min-w-0 lg:col-span-2">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#71808a]"
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
          className="
            h-12
            w-full
            rounded-xl
            border
            border-gray-300
            bg-white
            pl-12
            pr-4
            text-sm
            text-gray-700
            outline-none
            transition
            focus:border-green-500
            focus:ring-1
            focus:ring-green-500
            dark:border-[#29343c]
            dark:bg-[#141c23]
            dark:text-[#f5f7f8]
            dark:placeholder:text-[#71808a]
            dark:focus:border-[#00c767]
            dark:focus:ring-[#00c767]
          "
        />
      </div>

      {/* Review Type */}
      <div className="flex h-12 min-w-0 overflow-hidden rounded-xl border border-gray-300 bg-white lg:col-span-2 dark:border-[#29343c] dark:bg-[#141c23]">
        <button
          type="button"
          onClick={() => {
            setReviewType("customer");
            setSearch("");
          }}
          className={`flex min-w-0 flex-1 cursor-pointer items-center justify-center px-3 text-sm font-semibold transition sm:text-base ${
            reviewType === "customer"
              ? "bg-green-600 text-white"
              : "bg-white text-black hover:bg-gray-100 dark:bg-[#141c23] dark:text-[#f5f7f8] dark:hover:bg-[#192128]"
          }`}
        >
          <span className="truncate">Customer Reviews</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setReviewType("product");
            setSearch("");
          }}
          className={`flex min-w-0 flex-1 cursor-pointer items-center justify-center px-3 text-sm font-semibold transition sm:text-base ${
            reviewType === "product"
              ? "bg-green-600 text-white"
              : "bg-white text-black hover:bg-gray-100 dark:bg-[#141c23] dark:text-[#f5f7f8] dark:hover:bg-[#192128]"
          }`}
        >
          <span className="truncate">Product Reviews</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewFilters;