// import { ChevronDown, Search } from "lucide-react";
// import { useState } from "react";

// type CategoryFilter = "All Category" | "Grains" | "Vegetables" | "Fruits";
// type StockFilter = "All Stock" | "Available" | "Out of Stock";

// type Props = {
//   search: string;
//   setSearch: React.Dispatch<React.SetStateAction<string>>;
//   category: string;
//   setCategory: React.Dispatch<React.SetStateAction<string>>;
//   stock: string;
//   setStock: React.Dispatch<React.SetStateAction<string>>;
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

//   return (
//     <div className="mt-6 grid grid-cols-4 gap-5">
//       <div className="col-span-2 flex h-12 items-center gap-4 rounded-xl border border-gray-200 bg-white px-6 shadow-sm">
//         <Search size={24} className="text-gray-400" />

//         <input
//           type="text"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search by product name..."
//           className="h-full w-full bg-transparent text-lg outline-none placeholder:text-gray-400"
//         />
//       </div>

//       <div className="relative h-12">
//         <button
//           type="button"
//           onClick={() => {
//             setOpenCategory((prev) => !prev);
//             setOpenStock(false);
//           }}
//           className={`flex h-full w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-6 text-lg shadow-sm transition ${
//             openCategory ? "ring-4 ring-green-100" : ""
//           }`}
//         >
//           <span>{category}</span>
//           <ChevronDown
//             size={24}
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
//                 className={`block w-full px-6 py-3 text-left text-base transition ${
//                   index === 0
//                     ? "bg-green-600 font-semibold text-white hover:bg-green-600"
//                     : category === item
//                     ? "bg-gray-200 hover:bg-gray-200"
//                     : "bg-white hover:bg-gray-100"
//                 }`}
//               >
//                 {item}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="relative h-12">
//         <button
//           type="button"
//           onClick={() => {
//             setOpenStock((prev) => !prev);
//             setOpenCategory(false);
//           }}
//           className={`flex h-full w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-6 text-lg shadow-sm transition ${
//             openStock ? "ring-4 ring-green-100" : ""
//           }`}
//         >
//           <span>{stock}</span>
//           <ChevronDown
//             size={24}
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
//                 className={`block w-full px-6 py-3 text-left text-base transition ${
//                   index === 0
//                     ? "bg-green-600 font-semibold text-white hover:bg-green-600"
//                     : stock === item
//                     ? "bg-gray-200 hover:bg-gray-200"
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
    <div className="mt-6 grid grid-cols-4 gap-5">
      <div className="col-span-2 flex h-12 items-center gap-4 rounded-xl border border-gray-200 bg-white px-6 shadow-sm">
        <Search size={22} className="text-gray-400" />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by product name..."
          className="h-full w-full bg-transparent text-base outline-none placeholder:text-gray-400"
        />
      </div>

      <div ref={categoryRef} className="relative h-12">
        <button
          type="button"
          onClick={() => {
            setOpenCategory((prev) => !prev);
            setOpenStock(false);
          }}
          className={`flex h-full w-full cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-white px-6 text-base shadow-sm transition ${
            openCategory ? "ring-4 ring-green-100" : ""
          }`}
        >
          <span>{category}</span>

          <ChevronDown
            size={22}
            className={`transition ${openCategory ? "rotate-180" : ""}`}
          />
        </button>

        {openCategory && (
          <div className="absolute left-0 top-14 z-50 w-full overflow-hidden rounded-xl bg-white shadow-xl">
            {categoryOptions.map((item, index) => (
              <button
                type="button"
                key={item}
                onClick={() => {
                  setCategory(item);
                  setOpenCategory(false);
                }}
                className={`block w-full cursor-pointer px-6 py-3 text-left text-sm transition ${
                  index === 0
                    ? "bg-green-600 font-semibold text-white"
                    : category === item
                    ? "bg-gray-200"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>

      <div ref={stockRef} className="relative h-12">
        <button
          type="button"
          onClick={() => {
            setOpenStock((prev) => !prev);
            setOpenCategory(false);
          }}
          className={`flex h-full w-full cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-white px-6 text-base shadow-sm transition ${
            openStock ? "ring-4 ring-green-100" : ""
          }`}
        >
          <span>{stock}</span>

          <ChevronDown
            size={22}
            className={`transition ${openStock ? "rotate-180" : ""}`}
          />
        </button>

        {openStock && (
          <div className="absolute left-0 top-14 z-50 w-full overflow-hidden rounded-xl bg-white shadow-xl">
            {stockOptions.map((item, index) => (
              <button
                type="button"
                key={item}
                onClick={() => {
                  setStock(item);
                  setOpenStock(false);
                }}
                className={`block w-full cursor-pointer px-6 py-3 text-left text-sm transition ${
                  index === 0
                    ? "bg-green-600 font-semibold text-white"
                    : stock === item
                    ? "bg-gray-200"
                    : "bg-white hover:bg-gray-100"
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