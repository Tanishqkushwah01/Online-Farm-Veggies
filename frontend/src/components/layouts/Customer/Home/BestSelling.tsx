// import ProductCard from "../ProductsCard";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { getTenProducts } from "../../../Api/customerApi";


function BestProducts() {
  const [products, setProducts] = useState<any[]>([]);
  console.log("products:",products);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await getTenProducts();

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
    fetchProducts();
  }, []);
  return (
    <section className="w-full bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-8">
      <div className="text-center mb-8">
        <p className="text-green-600 font-semibold text-sm uppercase tracking-wider">
          Customer Choice
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Best Products
        </h2>
      </div>

      {/* <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {bestProducts.map((product, index) => (
          <div
            key={index}
            className="group bg-gray-50 rounded-3xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative h-36 md:h-44 bg-white">
              <img
                src={product.image}
                alt={product.name}
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
                {product.name}
              </h3>

              <div className="flex items-center gap-1 mt-2 text-yellow-500">
                <Star size={16} fill="currentColor" />
                <span className="text-sm font-semibold text-gray-700">
                  {product.rating}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <span className="text-lg font-bold text-green-700">
                  ₹{product.price}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ₹{product.oldPrice}
                </span>
              </div>

              <button className="mt-4 w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2.5 rounded-xl hover:bg-green-700 transition cursor-pointer">
                <ShoppingCart size={17} />
                View More
              </button>
            </div>
          </div>
        ))}
      </div> */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          products.map((product: any) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))
        )}
      </div>
    </section>
  );
}


export default BestProducts;