import {  Trash2, Star } from "lucide-react";

type ProductProps = {
  product: {
    productName: string;
    category: string;
    price: number;
    quantity: number;
    review: number;
    image: string;
  };
};

const ProductCard = ({ product }: ProductProps) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-xl duration-300 overflow-hidden border border-gray-200">

      <img
        src={product.image}
        alt={product.productName}
        className="h-52 w-full object-cover"
      />

      <div className="p-5">

        <h2 className="text-xl font-bold">
          {product.productName}
        </h2>

        <p className="text-gray-500 mt-1">
          {product.category}
        </p>

        <h1 className="text-green-600 text-2xl font-bold mt-4">
          ₹{product.price}
        </h1>

        <div className="flex justify-between mt-4">

          <span className="text-gray-600">
            {product.quantity} Kg
          </span>

          <span className="flex items-center gap-1 text-yellow-500">
            <Star size={18} fill="currentColor" />
            {product.review}
          </span>

        </div>

        <div className="flex gap-3 mt-6">

          <button className="cursor-pointer flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
            Edit
          </button>

          <button className="cursor-pointer h-10 w-10 rounded-lg bg-red-100 text-red-600 flex justify-center items-center hover:bg-red-200">
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;