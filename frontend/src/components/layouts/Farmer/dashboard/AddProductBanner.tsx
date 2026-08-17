// import { Plus, Sprout } from "lucide-react";
// import { useState } from "react";
// import AddProduct from "../Products/AddProduct";

// const AddProductBanner = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <div className="bg-green-50 rounded-xl p-6 flex items-center justify-between border border-green-100">
//         <div className="flex items-center gap-4">
//           <div className="h-16 w-16 rounded-xl bg-white flex items-center justify-center text-green-600">
//             <Sprout size={34} />
//           </div>

//           <div>
//             <h2 className="text-xl font-bold text-slate-900">
//               Add New Product
//             </h2>
//             <p className="text-gray-500 mt-1">
//               Add fresh vegetables and fruits to your store.
//             </p>
//           </div>
//         </div>

//         <button
//           onClick={() => setOpen(true)}
//           className="bg-green-600 cursor-pointer text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-green-700 transition"
//         >
//           <Plus size={18} />
//           Add Product
//         </button>
//       </div>

//       <AddProduct open={open} onClose={() => setOpen(false)} />
//     </>
//   );
// };

// export default AddProductBanner;



import { Plus, Sprout } from "lucide-react";
import { useState } from "react";
import AddProduct from "../Products/AddProduct";

const AddProductBanner = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="
          flex
          flex-col
          gap-5
          rounded-xl
          border
          border-green-100
          bg-green-50
          p-5
          transition-colors
          duration-200
          sm:p-6
          md:flex-row
          md:items-center
          md:justify-between
          dark:border-[#24533d]
          dark:bg-[#123126]
        "
      >
        <div className="flex min-w-0 items-center gap-4">
          <div
            className="
              flex
              h-16
              w-16
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-white
              text-green-600
              transition-colors
              duration-200
              dark:bg-[#192128]
              dark:text-[#00c767]
            "
          >
            <Sprout size={34} />
          </div>

          <div className="min-w-0">
            <h2 className="break-words text-xl font-bold text-slate-900 dark:text-[#f5f7f8]">
              Add New Product
            </h2>

            <p className="mt-1 break-words text-gray-500 dark:text-[#9aa7b1]">
              Add fresh vegetables and fruits to your store.
            </p>
          </div>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="
            flex
            w-full
            cursor-pointer
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-green-600
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-green-700
            md:w-auto
          "
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      <AddProduct
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default AddProductBanner;