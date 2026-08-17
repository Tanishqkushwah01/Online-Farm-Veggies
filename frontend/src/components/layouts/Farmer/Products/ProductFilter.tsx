// import { ChevronDown, Search } from "lucide-react";
// import { useEffect, useRef, useState } from "react";

// export type CategoryFilter =
//   | "All Category"
//   | "Grains"
//   | "Vegetables"
//   | "Fruits";

// export type StockFilter =
//   | "All Stock"
//   | "Available"
//   | "Low Stock"
//   | "Out of Stock";

// type Props = {
//   search: string;
//   setSearch: React.Dispatch<React.SetStateAction<string>>;
//   category: CategoryFilter;
//   setCategory: React.Dispatch<React.SetStateAction<CategoryFilter>>;
//   stock: StockFilter;
//   setStock: React.Dispatch<React.SetStateAction<StockFilter>>;
// };

// const categoryOptions: CategoryFilter[] = [
//   "All Category",
//   "Grains",
//   "Vegetables",
//   "Fruits",
// ];

// const stockOptions: StockFilter[] = [
//   "All Stock",
//   "Available",
//   "Low Stock",
//   "Out of Stock",
// ];

// const ProductFilters = ({
//   search,
//   setSearch,
//   category,
//   setCategory,
//   stock,
//   setStock,
// }: Props) => {
//   const [openCategory, setOpenCategory] = useState(false);
//   const [openStock, setOpenStock] = useState(false);

//   const categoryRef = useRef<HTMLDivElement | null>(null);
//   const stockRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const target = event.target as Node;

//       if (
//         categoryRef.current &&
//         !categoryRef.current.contains(target) &&
//         stockRef.current &&
//         !stockRef.current.contains(target)
//       ) {
//         setOpenCategory(false);
//         setOpenStock(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="mt-6 grid grid-cols-4 gap-5">
//       <div className="col-span-2 flex h-12 items-center gap-4 rounded-xl border border-gray-200 bg-white px-6 shadow-sm">
//         <Search size={22} className="text-gray-400" />

//         <input
//           type="text"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search by product name..."
//           className="h-full w-full bg-transparent text-base outline-none placeholder:text-gray-400"
//         />
//       </div>

//       <div ref={categoryRef} className="relative h-12">
//         <button
//           type="button"
//           onClick={() => {
//             setOpenCategory((prev) => !prev);
//             setOpenStock(false);
//           }}
//           className={`flex h-full w-full cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-white px-6 text-base shadow-sm transition ${
//             openCategory ? "ring-4 ring-green-100" : ""
//           }`}
//         >
//           <span>{category}</span>

//           <ChevronDown
//             size={22}
//             className={`transition ${openCategory ? "rotate-180" : ""}`}
//           />
//         </button>

//         {openCategory && (
//           <div className="absolute left-0 top-14 z-50 w-full overflow-hidden rounded-xl bg-white shadow-xl">
//             {categoryOptions.map((item, index) => (
//               <button
//                 type="button"
//                 key={item}
//                 onClick={() => {
//                   setCategory(item);
//                   setOpenCategory(false);
//                 }}
//                 className={`block w-full cursor-pointer px-6 py-3 text-left text-sm transition ${
//                   index === 0
//                     ? "bg-green-600 font-semibold text-white"
//                     : category === item
//                     ? "bg-gray-200"
//                     : "bg-white hover:bg-gray-100"
//                 }`}
//               >
//                 {item}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       <div ref={stockRef} className="relative h-12">
//         <button
//           type="button"
//           onClick={() => {
//             setOpenStock((prev) => !prev);
//             setOpenCategory(false);
//           }}
//           className={`flex h-full w-full cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-white px-6 text-base shadow-sm transition ${
//             openStock ? "ring-4 ring-green-100" : ""
//           }`}
//         >
//           <span>{stock}</span>

//           <ChevronDown
//             size={22}
//             className={`transition ${openStock ? "rotate-180" : ""}`}
//           />
//         </button>

//         {openStock && (
//           <div className="absolute left-0 top-14 z-50 w-full overflow-hidden rounded-xl bg-white shadow-xl">
//             {stockOptions.map((item, index) => (
//               <button
//                 type="button"
//                 key={item}
//                 onClick={() => {
//                   setStock(item);
//                   setOpenStock(false);
//                 }}
//                 className={`block w-full cursor-pointer px-6 py-3 text-left text-sm transition ${
//                   index === 0
//                     ? "bg-green-600 font-semibold text-white"
//                     : stock === item
//                     ? "bg-gray-200"
//                     : "bg-white hover:bg-gray-100"
//                 }`}
//               >
//                 {item}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductFilters;

import { ChevronDown, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type CategoryFilter =
  | "All Category"
  | "Grains"
  | "Vegetables"
  | "Fruits";

export type StockFilter =
  | "All Stock"
  | "Available"
  | "Low Stock"
  | "Out of Stock";

type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  category: CategoryFilter;
  setCategory: React.Dispatch<React.SetStateAction<CategoryFilter>>;
  stock: StockFilter;
  setStock: React.Dispatch<React.SetStateAction<StockFilter>>;
};

const categoryOptions: CategoryFilter[] = [
  "All Category",
  "Grains",
  "Vegetables",
  "Fruits",
];

const stockOptions: StockFilter[] = [
  "All Stock",
  "Available",
  "Low Stock",
  "Out of Stock",
];

const ProductFilters = ({
  search,
  setSearch,
  category,
  setCategory,
  stock,
  setStock,
}: Props) => {
  const [openCategory, setOpenCategory] = useState(false);
  const [openStock, setOpenStock] = useState(false);

  const categoryRef = useRef<HTMLDivElement | null>(null);
  const stockRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        categoryRef.current &&
        !categoryRef.current.contains(target) &&
        stockRef.current &&
        !stockRef.current.contains(target)
      ) {
        setOpenCategory(false);
        setOpenStock(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {/* Search */}
      <div className="flex h-12 min-w-0 items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 shadow-sm transition-colors duration-200 sm:px-5 lg:col-span-2 lg:px-6 dark:border-[#29343c] dark:bg-[#141c23]">
        <Search
          size={22}
          className="shrink-0 text-gray-400 dark:text-[#71808a]"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by product name..."
          className="h-full w-full min-w-0 bg-transparent text-sm text-slate-900 outline-none placeholder:text-gray-400 sm:text-base dark:text-[#f5f7f8] dark:placeholder:text-[#71808a]"
        />
      </div>

      {/* Category */}
      <div
        ref={categoryRef}
        className="relative h-12 min-w-0"
      >
        <button
          type="button"
          onClick={() => {
            setOpenCategory((prev) => !prev);
            setOpenStock(false);
          }}
          className={`flex h-full w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 text-sm text-slate-700 shadow-sm transition sm:px-5 sm:text-base lg:px-6 dark:border-[#29343c] dark:bg-[#141c23] dark:text-[#f5f7f8] ${
            openCategory
              ? "ring-4 ring-green-100 dark:ring-green-900/30"
              : ""
          }`}
        >
          <span className="truncate">{category}</span>

          <ChevronDown
            size={22}
            className={`shrink-0 transition ${
              openCategory ? "rotate-180" : ""
            }`}
          />
        </button>

        {openCategory && (
          <div className="absolute left-0 top-14 z-50 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-[#29343c] dark:bg-[#141c23]">
            {categoryOptions.map((item, index) => (
              <button
                type="button"
                key={item}
                onClick={() => {
                  setCategory(item);
                  setOpenCategory(false);
                }}
                className={`block w-full cursor-pointer px-4 py-3 text-left text-sm transition sm:px-6 ${
                  index === 0
                    ? "bg-green-600 font-semibold text-white"
                    : category === item
                      ? "bg-gray-200 text-gray-900 dark:bg-[#29343c] dark:text-[#f5f7f8]"
                      : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-[#141c23] dark:text-[#c4cdd3] dark:hover:bg-[#192128]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Stock */}
      <div
        ref={stockRef}
        className="relative h-12 min-w-0"
      >
        <button
          type="button"
          onClick={() => {
            setOpenStock((prev) => !prev);
            setOpenCategory(false);
          }}
          className={`flex h-full w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 text-sm text-slate-700 shadow-sm transition sm:px-5 sm:text-base lg:px-6 dark:border-[#29343c] dark:bg-[#141c23] dark:text-[#f5f7f8] ${
            openStock
              ? "ring-4 ring-green-100 dark:ring-green-900/30"
              : ""
          }`}
        >
          <span className="truncate">{stock}</span>

          <ChevronDown
            size={22}
            className={`shrink-0 transition ${
              openStock ? "rotate-180" : ""
            }`}
          />
        </button>

        {openStock && (
          <div className="absolute left-0 top-14 z-50 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-[#29343c] dark:bg-[#141c23]">
            {stockOptions.map((item, index) => (
              <button
                type="button"
                key={item}
                onClick={() => {
                  setStock(item);
                  setOpenStock(false);
                }}
                className={`block w-full cursor-pointer px-4 py-3 text-left text-sm transition sm:px-6 ${
                  index === 0
                    ? "bg-green-600 font-semibold text-white"
                    : stock === item
                      ? "bg-gray-200 text-gray-900 dark:bg-[#29343c] dark:text-[#f5f7f8]"
                      : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-[#141c23] dark:text-[#c4cdd3] dark:hover:bg-[#192128]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFilters;