import { Trash2, Star } from "lucide-react";

type ProductProps = {
  product: {
    _id: string;
    productName: string;
    category: string;
    price: number;
    quantity: number;
    review: number;
    image: string;
  };
  onDelete: (id: string) => void;
  onEdit: (product: any) => void;
};

const ProductCard = ({
  product,
  onDelete,
  onEdit,
}: ProductProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow duration-300 hover:shadow-xl">
      <img
        src={product.image}
        alt={product.productName}
        className="h-52 w-full object-cover"
      />

      <div className="p-5">
        <h2 className="text-xl font-bold">{product.productName}</h2>

        <p className="mt-1 text-gray-500">{product.category}</p>

        <h1 className="mt-4 text-2xl font-bold text-green-600">
          ₹{product.price}
        </h1>

        <div className="mt-4 flex justify-between">
          <span className="text-gray-600">
            {product.quantity} Kg
          </span>

          <span className="flex items-center gap-1 text-yellow-500">
            <Star size={18} fill="currentColor" />
            {product.review}
          </span>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 cursor-pointer rounded-lg bg-green-600 py-2 text-white hover:bg-green-700"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(product._id)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;