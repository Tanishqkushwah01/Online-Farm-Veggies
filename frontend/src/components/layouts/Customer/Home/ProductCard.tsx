import { Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { addToWishlist } from "../../../Api/customerApi";

type ProductCardProps = {
  product: {
    _id: string;
    productName: string;
    image: string;
    price: number;
    review?: number;
    isWishlisted?: boolean;
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(
    product.isWishlisted ?? false
  );

  const handleWishlist = async () => {
    try {
      const response = await addToWishlist(product._id);

      if (response.data.success) {
        setIsWishlisted(response.data.isWishlisted);
        toast.success(response.data.message);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="group bg-gray-50 rounded-3xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-36 md:h-44 bg-white">
        <img
          src={product.image}
          alt={product.productName}
          className="h-full w-full object-cover transform-gpu group-hover:scale-105 transition-transform duration-500 ease-out will-change-transform"
        />

        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white shadow flex items-center justify-center cursor-pointer transition hover:scale-110"
        >
          <Heart
            size={18}
            className={`transition-all duration-300 ${isWishlisted
              ? "fill-red-500 text-red-500"
              : "text-gray-700 hover:text-red-500"
              }`}
          />
        </button>

        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
          Best
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-900 truncate">
          {product.productName}
        </h3>

        <div className="flex items-center gap-1 mt-2 text-yellow-500">
          <Star size={16} fill="currentColor" />
          <span className="text-sm font-semibold text-gray-700">
            {product.review ?? 5}
          </span>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <span className="text-lg font-bold text-green-700">
            ₹{product.price}
          </span>
        </div>

        <button className="mt-4 w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2.5 rounded-xl hover:bg-green-700 transition cursor-pointer">
          <ShoppingCart size={17} />
          View More
        </button>
      </div>
    </div>
  );
}