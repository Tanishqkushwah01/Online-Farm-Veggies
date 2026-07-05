import { Grid2X2 } from "lucide-react";

const categories = [
  {
    name: "Leafy Greens",
    image: "https://png.pngtree.com/png-vector/20240130/ourmid/pngtree-spinach-leaves-isolated-png-image_11560406.png",
  },
  {
    name: "Vegetables",
    image: "https://png.pngtree.com/png-vector/20240130/ourmid/pngtree-fresh-vegetables-basket-png-image_11560709.png",
  },
  {
    name: "Fruits",
    image: "https://png.pngtree.com/png-vector/20240130/ourmid/pngtree-fruits-basket-png-image_11560722.png",
  },
  {
    name: "Herbs",
    image: "https://png.pngtree.com/png-vector/20240130/ourmid/pngtree-mint-leaves-png-image_11560404.png",
  },
  {
    name: "Root Vegetables",
    image: "https://png.pngtree.com/png-vector/20240130/ourmid/pngtree-potato-isolated-png-image_11560411.png",
  },
];

const CategorySection = () => {
  return (
    <section className="bg-white rounded-2xl border border-gray-200 shadow-sm mt-7 p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-900">Shop by Category</h2>

        <button className="border border-green-600 text-green-600 px-7 py-3 rounded-xl font-semibold hover:bg-green-50">
          View All
        </button>
      </div>

      <div className="grid grid-cols-6 gap-10 mt-8">
        {categories.map((item) => (
          <div key={item.name} className="flex flex-col items-center">
            <div className="h-28 w-28 rounded-full border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center">
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-24 object-contain"
              />
            </div>

            <p className="font-semibold mt-4 text-lg">{item.name}</p>
          </div>
        ))}

        <div className="flex flex-col items-center">
          <div className="h-28 w-28 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center">
            <Grid2X2 size={38} />
          </div>

          <p className="font-semibold mt-4 text-lg">All Categories</p>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;