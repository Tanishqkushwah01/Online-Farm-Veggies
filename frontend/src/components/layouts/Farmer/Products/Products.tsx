import { Plus } from "lucide-react";
import ProductGrid from "./ProductGrid";
import AddProduct from "./AddProduct";
import { useState } from "react";

const Products = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-300 rounded-md p-8 min-h-full">

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-4xl font-bold text-black">
            Products
          </h1>

          <p className="text-white mt-2 text-lg">
            Manage all your farm products.
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-white text-green-700 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-gray-100">
          <Plus size={20} />
          Add Product
        </button>

      </div>

      <div className="mt-8">

        <ProductGrid />

      </div>
      <AddProduct
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default Products;