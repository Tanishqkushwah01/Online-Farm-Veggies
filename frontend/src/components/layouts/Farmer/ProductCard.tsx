import { Edit, Trash2, Package, Tag, FileText } from "lucide-react";

export type Product = {
  _id: string;
  productName: string;
  category: string;
  price: number;
  quantity: number;
  unit: string;
  stockStatus: "In Stock" | "Out of Stock";
  description: string;
  imageUrl?: string;
};

type ProductCardProps = {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
};

const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="relative h-44 w-full overflow-hidden rounded-xl bg-gray-100">
        <img
          src={product.imageUrl || "https://via.placeholder.com/400x250?text=No+Image"}
          alt={product.productName}
          className="h-full w-full object-cover"
        />

        <span
          className={`absolute right-3 top-3 rounded-lg px-3 py-1 text-sm font-semibold text-white ${
            product.stockStatus === "In Stock"
              ? "bg-green-600"
              : "bg-red-500"
          }`}
        >
          {product.stockStatus}
        </span>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-800">
            {product.productName}
          </h3>
          <p className="mt-1 font-semibold text-green-600">
            {product.category}
          </p>
        </div>

        <p className="font-bold text-green-600">
          ₹{product.price} / {product.unit}
        </p>
      </div>

      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p className="flex items-center gap-2">
          <Package size={16} />
          Quantity: {product.quantity} {product.unit}
        </p>

        <p className="flex items-center gap-2">
          <Tag size={16} />
          Unit: {product.unit}
        </p>

        <p className="flex items-start gap-2">
          <FileText size={16} className="mt-0.5" />
          {product.description}
        </p>
      </div>

      <div className="mt-5 flex justify-end gap-3">
        <button
          onClick={() => onEdit(product)}
          className="rounded-xl border border-gray-200 p-3 text-slate-700 transition hover:bg-gray-100"
        >
          <Edit size={18} />
        </button>

        <button
          onClick={() => onDelete(product._id)}
          className="rounded-xl border border-gray-200 p-3 text-red-500 transition hover:bg-red-50"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;