import { Heart, ShoppingCart } from "lucide-react";

type ProductCardProps = {
  name: string;
  image: string;
  price: number;
  oldPrice: number;
};

const ProductCard = ({ name, image, price, oldPrice }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 relative hover:shadow-md transition">
      <span className="absolute top-4 left-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
        Fresh
      </span>

      <button className="absolute top-4 right-4 text-gray-500">
        <Heart size={24} />
      </button>

      <div className="h-40 mt-4 flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-contain"
        />
      </div>

      <h3 className="text-xl font-bold mt-5">{name}</h3>
      <p className="text-gray-500 mt-1">1 kg</p>

      <div className="flex items-center gap-2 mt-2">
        <span className="text-2xl font-bold">₹{price}</span>
        <span className="text-gray-400 line-through">₹{oldPrice}</span>
      </div>

      <button className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-700">
        <ShoppingCart size={18} />
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;