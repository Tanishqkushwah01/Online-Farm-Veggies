// ProductCard.tsx

import { Heart, ShoppingCart, Star } from "lucide-react";

type ProductCardProps = {
  product: {
    _id: string;
    productName: string;
    image: string;
    price: number;
    review?: number;
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-gray-50 rounded-3xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-36 md:h-44 bg-white">
        <img
          src={product.image}
          alt={product.productName}
          className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
        />

        <button className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white shadow flex items-center justify-center hover:text-red-500 cursor-pointer">
          <Heart size={18} />
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



// const bestProducts = [
//   {
//     name: "Fresh Tomato",
//     price: 40,
//     oldPrice: 55,
//     image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500",
//     rating: 4.8,
//   },
//   {
//     name: "Green Capsicum",
//     price: 60,
//     oldPrice: 75,
//     image: "https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?w=500",
//     rating: 4.7,
//   },
//   {
//     name: "Fresh Carrot",
//     price: 45,
//     oldPrice: 65,
//     image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=500",
//     rating: 4.9,
//   },
//   {
//     name: "Red Apple",
//     price: 120,
//     oldPrice: 150,
//     image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500",
//     rating: 4.8,
//   },
//   {
//     name: "Fresh Potato",
//     price: 35,
//     oldPrice: 50,
//     image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500",
//     rating: 4.6,
//   },
//   {
//     name: "Fresh Banana",
//     price: 70,
//     oldPrice: 90,
//     image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500",
//     rating: 4.7,
//   },
//   {
//     name: "Green Broccoli",
//     price: 85,
//     oldPrice: 110,
//     image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500",
//     rating: 4.9,
//   },
//   {
//     name: "Fresh Orange",
//     price: 95,
//     oldPrice: 120,
//     image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=500",
//     rating: 4.8,
//   },
// ];