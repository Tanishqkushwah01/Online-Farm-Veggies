// import { ChevronDown, Search } from "lucide-react";
// import { useEffect, useRef, useState } from "react";

// type OrderStatus =
//   | "All Status"
//   | "Accepted"
//   | "Rejected"
//   | "Pending"
//   | "Delivered";

// type DateFilter = "All Date" | "Today" | "This Week" | "This Month";

// type Props = {
//   search: string;
//   setSearch: React.Dispatch<React.SetStateAction<string>>;
//   status: string;
//   setStatus: React.Dispatch<React.SetStateAction<string>>;
//   dateFilter: string;
//   setDateFilter: React.Dispatch<React.SetStateAction<string>>;
// };

// const statusOptions: OrderStatus[] = [
//   "All Status",
//   "Accepted",
//   "Rejected",
//   "Pending",
//   "Delivered",
// ];

// const dateOptions: DateFilter[] = [
//   "All Date",
//   "Today",
//   "This Week",
//   "This Month",
// ];

// const OrderFilters = ({
//   search,
//   setSearch,
//   status,
//   setStatus,
//   dateFilter,
//   setDateFilter,
// }: Props) => {
//   const [openStatus, setOpenStatus] = useState(false);
//   const [openDate, setOpenDate] = useState(false);

//   const statusRef = useRef<HTMLDivElement>(null);
//   const dateRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       const target = e.target as Node;

//       if (
//         statusRef.current &&
//         !statusRef.current.contains(target) &&
//         dateRef.current &&
//         !dateRef.current.contains(target)
//       ) {
//         setOpenStatus(false);
//         setOpenDate(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="mt-6 grid grid-cols-4 gap-5">
//       <div className="col-span-2 flex h-12 items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 shadow-sm">
//         <Search size={20} className="text-gray-400" />

//         <input
//           type="text"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search by order ID, customer or product..."
//           className="h-full w-full bg-transparent text-sm font-medium outline-none placeholder:text-sm placeholder:text-gray-400"
//         />
//       </div>

//       <div ref={dateRef} className="relative h-12">
//         <button
//           type="button"
//           onClick={() => {
//             setOpenDate((prev) => !prev);
//             setOpenStatus(false);
//           }}
//           className={`flex h-full w-full cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition ${
//             openDate ? "ring-4 ring-green-100" : ""
//           }`}
//         >
//           <span>{dateFilter}</span>
//           <ChevronDown
//             size={20}
//             className={`transition ${openDate ? "rotate-180" : ""}`}
//           />
//         </button>

//         {openDate && (
//           <div className="absolute left-0 top-14 z-50 w-full overflow-hidden rounded-xl bg-white shadow-xl">
//             {dateOptions.map((item, index) => (
//               <button
//                 type="button"
//                 key={item}
//                 onClick={() => {
//                   setDateFilter(item);
//                   setOpenDate(false);
//                 }}
//                 className={`block w-full cursor-pointer px-5 py-2.5 text-left text-sm font-medium transition ${
//                   index === 0
//                     ? "bg-green-600 font-semibold text-white hover:bg-green-600"
//                     : dateFilter === item
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

//       <div ref={statusRef} className="relative h-12">
//         <button
//           type="button"
//           onClick={() => {
//             setOpenStatus((prev) => !prev);
//             setOpenDate(false);
//           }}
//           className={`flex h-full w-full cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition ${
//             openStatus ? "ring-4 ring-green-100" : ""
//           }`}
//         >
//           <span>{status}</span>
//           <ChevronDown
//             size={20}
//             className={`transition ${openStatus ? "rotate-180" : ""}`}
//           />
//         </button>

//         {openStatus && (
//           <div className="absolute left-0 top-14 z-50 w-full overflow-hidden rounded-xl bg-white shadow-xl">
//             {statusOptions.map((item, index) => (
//               <button
//                 type="button"
//                 key={item}
//                 onClick={() => {
//                   setStatus(item);
//                   setOpenStatus(false);
//                 }}
//                 className={`block w-full cursor-pointer px-5 py-2.5 text-left text-sm font-medium transition ${
//                   index === 0
//                     ? "bg-green-600 font-semibold text-white hover:bg-green-600"
//                     : status === item
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

// export default OrderFilters;



import { ChevronDown, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type OrderStatus =
  | "All Status"
  | "Accepted"
  | "Rejected"
  | "Pending"
  | "Delivered";

type DateFilter =
  | "All Date"
  | "Today"
  | "This Week"
  | "This Month";

type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  dateFilter: string;
  setDateFilter: React.Dispatch<React.SetStateAction<string>>;
};

const statusOptions: OrderStatus[] = [
  "All Status",
  "Accepted",
  "Rejected",
  "Pending",
  "Delivered",
];

const dateOptions: DateFilter[] = [
  "All Date",
  "Today",
  "This Week",
  "This Month",
];

const OrderFilters = ({
  search,
  setSearch,
  status,
  setStatus,
  dateFilter,
  setDateFilter,
}: Props) => {
  const [openStatus, setOpenStatus] = useState(false);
  const [openDate, setOpenDate] = useState(false);

  const statusRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        statusRef.current &&
        !statusRef.current.contains(target) &&
        dateRef.current &&
        !dateRef.current.contains(target)
      ) {
        setOpenStatus(false);
        setOpenDate(false);
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
      <div className="flex h-12 min-w-0 items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 shadow-sm transition-colors duration-200 sm:col-span-2 sm:px-5 lg:col-span-2 dark:border-[#29343c] dark:bg-[#141c23]">
        <Search
          size={20}
          className="shrink-0 text-gray-400 dark:text-[#71808a]"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by order ID, customer or product..."
          className="h-full min-w-0 w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-sm placeholder:text-gray-400 dark:text-[#f5f7f8] dark:placeholder:text-[#71808a]"
        />
      </div>

      {/* Date Filter */}
      <div ref={dateRef} className="relative h-12 min-w-0">
        <button
          type="button"
          onClick={() => {
            setOpenDate((prev) => !prev);
            setOpenStatus(false);
          }}
          className={`flex h-full w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition sm:px-5 dark:border-[#29343c] dark:bg-[#141c23] dark:text-[#f5f7f8] ${
            openDate
              ? "ring-4 ring-green-100 dark:ring-green-900/30"
              : ""
          }`}
        >
          <span className="truncate">{dateFilter}</span>

          <ChevronDown
            size={20}
            className={`shrink-0 transition ${
              openDate ? "rotate-180" : ""
            }`}
          />
        </button>

        {openDate && (
          <div className="absolute left-0 top-14 z-50 w-full min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-[#29343c] dark:bg-[#141c23]">
            {dateOptions.map((item, index) => (
              <button
                type="button"
                key={item}
                onClick={() => {
                  setDateFilter(item);
                  setOpenDate(false);
                }}
                className={`block w-full cursor-pointer px-4 py-2.5 text-left text-sm font-medium transition sm:px-5 ${
                  index === 0
                    ? "bg-green-600 font-semibold text-white hover:bg-green-600"
                    : dateFilter === item
                      ? "bg-gray-200 text-gray-900 hover:bg-gray-200 dark:bg-[#29343c] dark:text-[#f5f7f8] dark:hover:bg-[#29343c]"
                      : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-[#141c23] dark:text-[#c4cdd3] dark:hover:bg-[#192128]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Status Filter */}
      <div ref={statusRef} className="relative h-12 min-w-0">
        <button
          type="button"
          onClick={() => {
            setOpenStatus((prev) => !prev);
            setOpenDate(false);
          }}
          className={`flex h-full w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition sm:px-5 dark:border-[#29343c] dark:bg-[#141c23] dark:text-[#f5f7f8] ${
            openStatus
              ? "ring-4 ring-green-100 dark:ring-green-900/30"
              : ""
          }`}
        >
          <span className="truncate">{status}</span>

          <ChevronDown
            size={20}
            className={`shrink-0 transition ${
              openStatus ? "rotate-180" : ""
            }`}
          />
        </button>

        {openStatus && (
          <div className="absolute left-0 top-14 z-50 w-full min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-[#29343c] dark:bg-[#141c23]">
            {statusOptions.map((item, index) => (
              <button
                type="button"
                key={item}
                onClick={() => {
                  setStatus(item);
                  setOpenStatus(false);
                }}
                className={`block w-full cursor-pointer px-4 py-2.5 text-left text-sm font-medium transition sm:px-5 ${
                  index === 0
                    ? "bg-green-600 font-semibold text-white hover:bg-green-600"
                    : status === item
                      ? "bg-gray-200 text-gray-900 hover:bg-gray-200 dark:bg-[#29343c] dark:text-[#f5f7f8] dark:hover:bg-[#29343c]"
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

export default OrderFilters;