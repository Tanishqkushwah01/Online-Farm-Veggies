// import { Grid2X2 } from "lucide-react";

// const categories = [
//   {
//     name: "Leafy Greens",
//     image: "https://png.pngtree.com/png-vector/20240130/ourmid/pngtree-spinach-leaves-isolated-png-image_11560406.png",
//   },
//   {
//     name: "Vegetables",
//     image: "https://png.pngtree.com/png-vector/20240130/ourmid/pngtree-fresh-vegetables-basket-png-image_11560709.png",
//   },
//   {
//     name: "Fruits",
//     image: "https://png.pngtree.com/png-vector/20240130/ourmid/pngtree-fruits-basket-png-image_11560722.png",
//   },
//   {
//     name: "Herbs",
//     image: "https://png.pngtree.com/png-vector/20240130/ourmid/pngtree-mint-leaves-png-image_11560404.png",
//   },
//   {
//     name: "Root Vegetables",
//     image: "https://png.pngtree.com/png-vector/20240130/ourmid/pngtree-potato-isolated-png-image_11560411.png",
//   },
// ];

// const CategorySection = () => {
//   return (
//     <section className="bg-white rounded-2xl border border-gray-200 shadow-sm mt-7 p-8">
//       <div className="flex justify-between items-center">
//         <h2 className="text-3xl font-bold text-slate-900">Shop by Category</h2>

//         <button className="border border-green-600 text-green-600 px-7 py-3 rounded-xl font-semibold hover:bg-green-50">
//           View All
//         </button>
//       </div>

//       <div className="grid grid-cols-6 gap-10 mt-8">
//         {categories.map((item) => (
//           <div key={item.name} className="flex flex-col items-center">
//             <div className="h-28 w-28 rounded-full border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center">
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="h-24 w-24 object-contain"
//               />
//             </div>

//             <p className="font-semibold mt-4 text-lg">{item.name}</p>
//           </div>
//         ))}

//         <div className="flex flex-col items-center">
//           <div className="h-28 w-28 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center">
//             <Grid2X2 size={38} />
//           </div>

//           <p className="font-semibold mt-4 text-lg">All Categories</p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CategorySection;


import { Grid2X2 } from "lucide-react";

const categories = [
  {
    name: "Leafy Greens",
    image:
      "https://png.pngtree.com/png-vector/20240130/ourmid/pngtree-spinach-leaves-isolated-png-image_11560406.png",
  },
  {
    name: "Vegetables",
    image:
      "https://png.pngtree.com/png-vector/20240130/ourmid/pngtree-fresh-vegetables-basket-png-image_11560709.png",
  },
  {
    name: "Fruits",
    image:
      "https://png.pngtree.com/png-vector/20240130/ourmid/pngtree-fruits-basket-png-image_11560722.png",
  },
  {
    name: "Herbs",
    image:
      "https://png.pngtree.com/png-vector/20240130/ourmid/pngtree-mint-leaves-png-image_11560404.png",
  },
  {
    name: "Root Vegetables",
    image:
      "https://png.pngtree.com/png-vector/20240130/ourmid/pngtree-potato-isolated-png-image_11560411.png",
  },
];

const CategorySection = () => {
  return (
    <section className="mt-7 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-200 sm:p-6 md:p-8 dark:border-[#29343c] dark:bg-[#141c23]">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-[#f5f7f8]">
          Shop by Category
        </h2>

        <button className="w-full rounded-xl border border-green-600 px-7 py-3 font-semibold text-green-600 transition hover:bg-green-50 dark:border-[#00c767] dark:text-[#00c767] dark:hover:bg-[#123126] sm:w-auto">
          View All
        </button>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-10">
        {categories.map((item) => (
          <div
            key={item.name}
            className="flex min-w-0 flex-col items-center"
          >
            <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-50 transition-colors duration-200 dark:border-[#29343c] dark:bg-[#192128]">
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-24 object-contain"
              />
            </div>

            <p className="mt-4 break-words text-center text-lg font-semibold text-slate-900 dark:text-[#f5f7f8]">
              {item.name}
            </p>
          </div>
        ))}

        <div className="flex min-w-0 flex-col items-center">
          <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-gray-50 transition-colors duration-200 dark:border-[#29343c] dark:bg-[#192128]">
            <Grid2X2
              size={38}
              className="text-slate-700 dark:text-[#f5f7f8]"
            />
          </div>

          <p className="mt-4 break-words text-center text-lg font-semibold text-slate-900 dark:text-[#f5f7f8]">
            All Categories
          </p>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;