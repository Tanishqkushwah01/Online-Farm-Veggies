// import { ChevronDown, Search } from "lucide-react";
// import { useState } from "react";

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

//   return (
//     <div className="mt-6 grid grid-cols-4 gap-5">
//       <div className="col-span-2 flex h-12 items-center gap-4 rounded-xl border border-gray-200 bg-white px-6 shadow-sm">
//         <Search size={24} className="text-gray-400" />

//         <input
//           type="text"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search by order ID, customer or product..."
//           className="h-full w-full bg-transparent text-lg outline-none placeholder:text-gray-400"
//         />
//       </div>

//       <div className="relative h-12">
//         <button
//           type="button"
//           onClick={() => {
//             setOpenDate((prev) => !prev);
//             setOpenStatus(false);
//           }}
//           className={`flex h-full w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-6 text-lg shadow-sm transition ${
//             openDate ? "ring-4 ring-green-100" : ""
//           }`}
//         >
//           <span>{dateFilter}</span>
//           <ChevronDown
//             size={24}
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
//                 className={`block w-full px-6 py-3 text-left text-base transition ${
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

//       <div className="relative h-12">
//         <button
//           type="button"
//           onClick={() => {
//             setOpenStatus((prev) => !prev);
//             setOpenDate(false);
//           }}
//           className={`flex h-full w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-6 text-lg shadow-sm transition ${
//             openStatus ? "ring-4 ring-green-100" : ""
//           }`}
//         >
//           <span>{status}</span>
//           <ChevronDown
//             size={24}
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
//                 className={`block w-full px-6 py-3 text-left text-base transition ${
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

type DateFilter = "All Date" | "Today" | "This Week" | "This Month";

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mt-6 grid grid-cols-4 gap-5">
      <div className="col-span-2 flex h-12 items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 shadow-sm">
        <Search size={20} className="text-gray-400" />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by order ID, customer or product..."
          className="h-full w-full bg-transparent text-sm font-medium outline-none placeholder:text-sm placeholder:text-gray-400"
        />
      </div>

      <div ref={dateRef} className="relative h-12">
        <button
          type="button"
          onClick={() => {
            setOpenDate((prev) => !prev);
            setOpenStatus(false);
          }}
          className={`flex h-full w-full cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition ${
            openDate ? "ring-4 ring-green-100" : ""
          }`}
        >
          <span>{dateFilter}</span>
          <ChevronDown
            size={20}
            className={`transition ${openDate ? "rotate-180" : ""}`}
          />
        </button>

        {openDate && (
          <div className="absolute left-0 top-14 z-50 w-full overflow-hidden rounded-xl bg-white shadow-xl">
            {dateOptions.map((item, index) => (
              <button
                type="button"
                key={item}
                onClick={() => {
                  setDateFilter(item);
                  setOpenDate(false);
                }}
                className={`block w-full cursor-pointer px-5 py-2.5 text-left text-sm font-medium transition ${
                  index === 0
                    ? "bg-green-600 font-semibold text-white hover:bg-green-600"
                    : dateFilter === item
                    ? "bg-gray-200 hover:bg-gray-200"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>

      <div ref={statusRef} className="relative h-12">
        <button
          type="button"
          onClick={() => {
            setOpenStatus((prev) => !prev);
            setOpenDate(false);
          }}
          className={`flex h-full w-full cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition ${
            openStatus ? "ring-4 ring-green-100" : ""
          }`}
        >
          <span>{status}</span>
          <ChevronDown
            size={20}
            className={`transition ${openStatus ? "rotate-180" : ""}`}
          />
        </button>

        {openStatus && (
          <div className="absolute left-0 top-14 z-50 w-full overflow-hidden rounded-xl bg-white shadow-xl">
            {statusOptions.map((item, index) => (
              <button
                type="button"
                key={item}
                onClick={() => {
                  setStatus(item);
                  setOpenStatus(false);
                }}
                className={`block w-full cursor-pointer px-5 py-2.5 text-left text-sm font-medium transition ${
                  index === 0
                    ? "bg-green-600 font-semibold text-white hover:bg-green-600"
                    : status === item
                    ? "bg-gray-200 hover:bg-gray-200"
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

export default OrderFilters;