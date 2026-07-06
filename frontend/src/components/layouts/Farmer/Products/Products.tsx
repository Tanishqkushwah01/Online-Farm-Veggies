import { Plus } from "lucide-react";
import { useState } from "react";
import ProductGrid from "./ProductGrid";
import AddProduct from "./AddProduct";

const Products = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-full rounded-md bg-gray-300 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-black">
            Products
          </h1>

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