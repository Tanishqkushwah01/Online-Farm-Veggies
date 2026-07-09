import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { getHighestRatedProducts } from "../../../Api/farmerApi";

type ProductType = {
  _id: string;
  productName: string;
  image: string;
  averageRating: number;
  totalReviews: number;
};
type HighestRatedProductsProps = {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
};

const HighestRatedProducts = ({ setActivePage }: HighestRatedProductsProps) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHighestRatedProducts = async () => {
    try {
      const response = await getHighestRatedProducts();

      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHighestRatedProducts();
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-center text-gray-500">
          Loading highest rated products...
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold text-slate-900">
          Highest Rated Products
        </h2>

        <p className="text-center text-gray-500">
          No rated products found.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">
          Highest Rated Products
        </h2>

        <button
        onClick={() => setActivePage("reviews")}
        className="font-semibold text-green-400 cursor-pointer hover:text-green-600">
          View All
        </button>
      </div>

      <div className="space-y-5">
        {products.map((product, index) => (
          <div
            key={product._id}
            className="flex items-center justify-between rounded-xl p-2 transition hover:bg-gray-50"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
                #{index + 1}
              </div>

              <img
                src={product.image}
                alt={product.productName}
                className="h-14 w-14 rounded-lg object-cover"
              />

              <div>
                <h3 className="font-semibold text-slate-900">
                  {product.productName}
                </h3>

                <p className="text-sm text-gray-500">
                  {product.totalReviews} Reviews
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-yellow-50 px-3 py-1.5">
              <Star
                size={18}
                className="fill-yellow-400 text-yellow-400"
              />

              <span className="font-bold text-slate-900">
                {product.averageRating.toFixed(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighestRatedProducts;