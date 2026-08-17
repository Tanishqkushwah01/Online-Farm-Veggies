import { Heart, ShoppingBag, Star } from "lucide-react";
import { useWishlist } from "../../../hooks/useWishlist";
import useOrder from "../../../hooks/useProductOrders";

type Props = {
  product: any;
  onOrderClick: () => void;
};

const ProductDetailsCard = ({ product, onOrderClick }: Props) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { hasOrdered } = useOrder();

  const isWishlisted = isInWishlist(product._id);
  const ordered = hasOrdered(product._id);

  return (
    <div className="space-y-5">
      <div className="relative h-72 overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 shadow-sm md:h-96">
        <img
          src={product.image}
          alt={product.productName}
          className="h-full w-full object-cover"
        />

        <button
          onClick={() => toggleWishlist(product)}
          className="absolute right-4 top-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105"
        >
          <Heart
            size={20}
            className={`transition-all duration-300 ${
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-gray-700 hover:text-red-500"
            }`}
          />
        </button>

        <span
          className={`absolute left-4 top-4 rounded-full px-4 py-1.5 text-sm font-semibold text-white ${
            product.quantity > 0 ? "bg-green-600" : "bg-red-500"
          }`}
        >
          {product.quantity > 0 ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {product.productName}
            </h1>

            <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
              <Star size={17} className="fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-gray-800">
                {product.review ?? 5}
              </span>
              <span>(124 Reviews)</span>
            </div>

            <div className="mt-4 grid gap-2 text-sm text-gray-700 sm:grid-cols-2">
              <p>
                <span className="font-semibold">Price:</span>{" "}
                <span className="text-xl font-bold text-green-600">
                  ₹{product.price} / kg
                </span>
              </p>

              <p>
                <span className="font-semibold">Available:</span>{" "}
                {product.quantity} kg
              </p>

              <p>
                <span className="font-semibold">Category:</span>{" "}
                {product.category}
              </p>
            </div>

            <div className="mt-5">
              <h2 className="mb-2 text-lg font-bold text-gray-900">
                Product Details
              </h2>

              <p className="text-sm leading-6 text-gray-600">
                {product.description ||
                  "Freshly harvested from farm, organic cultivation, no chemicals, same day dispatch."}
              </p>
            </div>
          </div>

          <div className="group relative w-full md:w-auto">
            <button
              disabled={ordered || product.quantity <= 0}
              onClick={() => {
                if (ordered || product.quantity <= 0) return;
                onOrderClick();
              }}
              className={`flex w-full items-center justify-center gap-2 rounded-2xl px-7 py-3 font-semibold text-white shadow-md transition md:w-auto ${
                ordered
                  ? "cursor-not-allowed bg-gray-400"
                  : product.quantity <= 0
                  ? "cursor-not-allowed bg-red-400"
                  : "cursor-pointer bg-green-600 hover:bg-green-700"
              }`}
            >
              <ShoppingBag size={18} />
              {ordered
                ? "Already Ordered"
                : product.quantity <= 0
                ? "Out of Stock"
                : "Order Now"}
            </button>

            {ordered && (
              <div className="pointer-events-none absolute -top-12 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-black px-3 py-2 text-sm text-white shadow-lg group-hover:block">
                You have already ordered this product
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-500">
            To protect farmer privacy, contact details will only be visible
            after you place an order.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;