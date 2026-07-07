import { ArrowLeft, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { getWishlist } from "../../../Api/customerApi";
import ProductCard from "../Product/ProductCard";

type WishlistProps = {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
};

type ProductType = {
  _id: string;
  productName: string;
  image: string;
  price: number;
  review?: number;
  isWishlisted?: boolean;
};

type WishlistItemType = {
  _id: string;
  productId: ProductType;
};

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItemType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const response = await getWishlist();
      console.log(response.data);

      if (response.data.success) {
        setWishlistItems(response.data.wishlist);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-8">
      

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
          <Heart className="text-red-500 fill-red-500" size={36} />
          My Wishlist
        </h1>

        <p className="text-gray-500 mt-2">
          Your saved fresh vegetables are here
        </p>
      </div>

      {loading ? (
        <h1 className="text-xl font-semibold text-gray-700">Loading...</h1>
      ) : wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlistItems.map((item) => (
            <ProductCard
              key={item._id}
              product={{
                ...item.productId,
                isWishlisted: true,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="h-[60vh] flex flex-col items-center justify-center text-center">
          <Heart size={70} className="text-gray-300 mb-4 hover:text-red-500" />

          <h2 className="text-2xl font-bold text-gray-800">
            Your wishlist is empty
          </h2>

          <p className="text-gray-500 mt-2">
            Save your favourite vegetables here.
          </p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;