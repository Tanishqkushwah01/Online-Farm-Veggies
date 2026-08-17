// import { Plus } from "lucide-react";
// import { useState } from "react";
// import ProductGrid from "./ProductGrid";
// import AddProduct from "./AddProduct";
// import ProductFilters from "./ProductFilter";
// import { useFarmerProducts } from "../../../hooks/useFarmerProducts";

// const Products = () => {
//   const [open, setOpen] = useState(false);

//   const {
//     search,
//     setSearch,
//     category,
//     setCategory,
//     stock,
//     setStock,
//   } = useFarmerProducts();

//   return (
//     <div id="product-section" className="min-h-full rounded-md bg-gray-300 p-8">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-4xl font-bold text-black">Products</h1>

//           <p className="mt-2 text-lg text-white">
//             Manage all your farm products.
//           </p>
//         </div>

//         <button
//           onClick={() => setOpen(true)}
//           className="flex cursor-pointer items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-green-700 hover:bg-gray-100"
//         >
//           <Plus size={20} />
//           Add Product
//         </button>
//       </div>

//       <ProductFilters
//         search={search}
//         setSearch={setSearch}
//         category={category}
//         setCategory={setCategory}
//         stock={stock}
//         setStock={setStock}
//       />

//       <div className="mt-8">
//         <ProductGrid />
//       </div>

//       <AddProduct open={open} onClose={() => setOpen(false)} />
//     </div>
//   );
// };

// export default Products;



import { Plus } from "lucide-react";
import { useState } from "react";
import ProductGrid from "./ProductGrid";
import AddProduct from "./AddProduct";
import ProductFilters from "./ProductFilter";
import { useFarmerProducts } from "../../../hooks/useFarmerProducts";

const Products = () => {
  const [open, setOpen] = useState(false);

  const {
    search,
    setSearch,
    category,
    setCategory,
    stock,
    setStock,
  } = useFarmerProducts();

  return (
    <div
      id="product-section"
      className="
        min-h-full
        rounded-md
        bg-gray-300
        p-4
        transition-colors
        duration-200
        sm:p-5
        md:p-6
        lg:p-8
        dark:bg-[#0f171f]
      "
    >
      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-3xl font-bold text-black sm:text-4xl dark:text-[#f5f7f8]">
            Products
          </h1>

          <p className="mt-2 text-base text-gray-700 sm:text-lg dark:text-[#9aa7b1]">
            Manage all your farm products.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="
            flex
            w-full
            cursor-pointer
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-white
            px-6
            py-3
            font-semibold
            text-green-700
            transition
            hover:bg-gray-100
            dark:bg-[#141c23]
            dark:text-[#00c767]
            dark:hover:bg-[#192128]
            sm:w-auto
          "
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <ProductFilters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        stock={stock}
        setStock={setStock}
      />

      {/* Product Grid */}
      <div className="mt-6 min-w-0 sm:mt-8">
        <ProductGrid />
      </div>

      {/* Add Product Modal */}
      <AddProduct
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default Products;