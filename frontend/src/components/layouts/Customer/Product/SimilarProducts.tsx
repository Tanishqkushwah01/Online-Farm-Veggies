import ProductCard from "./ProductCard";
import { useProducts } from "../../../hooks/useFarmerProducts";

const SimilarProducts = () => {
  const { products, loading } = useProducts();

  if (loading) {
    return (
      <div>
        <h2 className="mb-5 text-2xl font-bold text-gray-900">
          Similar Products
        </h2>

        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-5 text-2xl font-bold text-gray-900">
        Similar Products
      </h2>

      <div className="overflow-x-auto pb-4">
        <div className="flex min-w-max gap-5">
          {products.slice(0, 10).map((product) => (
            <div key={product._id} className="w-65 shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarProducts;