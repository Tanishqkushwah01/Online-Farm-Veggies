import { Heart } from "lucide-react";
import { useWishlist } from "../../../hooks/useWishlist";
import ProductCard from "../Product/ProductCard";

const Wishlist = () => {
  const { wishlistProducts, loadingWishlist } = useWishlist();

  const validWishlistProducts = wishlistProducts.filter(
    (product: any) => product && product._id
  );

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-8">
      <div className="mb-8">
        <h1 className="flex items-center gap-3 text-4xl font-bold text-gray-900">
          <Heart className="fill-red-500 text-red-500" size={36} />
          My Wishlist
        </h1>

        <p className="mt-2 text-gray-500">
          Your saved fresh vegetables are here
        </p>
      </div>

      {loadingWishlist ? (
        <h1 className="text-xl font-semibold text-gray-700">Loading...</h1>
      ) : validWishlistProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {validWishlistProducts.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex h-[60vh] flex-col items-center justify-center text-center">
          <Heart size={70} className="mb-4 text-gray-300 hover:text-red-600" />

          <h2 className="text-2xl font-bold text-gray-800">
            Your wishlist is empty
          </h2>

          <p className="mt-2 text-gray-500">
            Save your favourite vegetables here.
          </p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;