import React from "react";

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  farm: string;
  rating: number;
  reviews: number;
  onAdd?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  farm,
  rating,
  reviews,
  onAdd,
}) => {
  return (
    <div className="w-72 overflow-hidden rounded-2xl bg-[#f1f1f1] shadow-md border border-gray-200 transition-all duration-300 hover:shadow-2xl">
      
      {/* Product Image */}
      <div className="h-56 w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="text-2xl font-semibold text-gray-900">
          {name}
        </h2>

        <p className="mt-2 text-xl font-bold text-gray-900">
          ₹{price}
          <span className="text-base font-medium text-gray-500"> / kg</span>
        </p>

        <p className="mt-2 text-sm text-gray-500">
          {farm}
        </p>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg text-yellow-500">★</span>
          <span className="text-sm font-medium text-gray-700">
            {rating} ({reviews})
          </span>
        </div>

        <button
          onClick={onAdd}
          className="mt-6 w-full rounded-xl border border-green-300 py-3 text-lg font-semibold text-green-700 transition-all duration-300 hover:bg-green-50 active:scale-95"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;