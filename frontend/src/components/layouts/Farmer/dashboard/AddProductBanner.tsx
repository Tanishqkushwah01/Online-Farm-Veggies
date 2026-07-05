import { Plus, Sprout } from "lucide-react";

const AddProductBanner = () => {
  return (
    <div className="bg-green-50 rounded-xl p-6 flex items-center justify-between border border-green-100">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-xl bg-white flex items-center justify-center text-green-600">
          <Sprout size={34} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">Add New Product</h2>
          <p className="text-gray-500 mt-1">
            Add fresh vegetables and fruits to your store.
          </p>
        </div>
      </div>

      <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-green-700 transition">
        <Plus size={18} />
        Add Product
      </button>
    </div>
  );
};

export default AddProductBanner;