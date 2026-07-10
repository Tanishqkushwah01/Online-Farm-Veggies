// import { Plus } from "lucide-react";
// import { useState } from "react";
// import ProductGrid from "./ProductGrid";
// import AddProduct from "./AddProduct";
// import ProductFilters from "./ProductFilter";

// const Products = () => {
//   const [open, setOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All Category");
//   const [stock, setStock] = useState("All Stock");

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
    <div id="product-section" className="min-h-full rounded-md bg-gray-300 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-black">Products</h1>

          <p className="mt-2 text-lg text-white">
            Manage all your farm products.
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-green-700 hover:bg-gray-100"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      <ProductFilters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        stock={stock}
        setStock={setStock}
      />

      <div className="mt-8">
        <ProductGrid />
      </div>

      <AddProduct open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Products;