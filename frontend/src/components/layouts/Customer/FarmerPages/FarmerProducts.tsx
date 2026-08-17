import ProductCard from "../Product/ProductCard";
import type { FarmerProduct } from "../../../context/CustomerFarmerProductContext";

type Props = {
  products: FarmerProduct[];
  matchedProducts: FarmerProduct[];
  loading: boolean;
  messages: string[];
  totalProducts?: number;
  search: string;
  category?: string;
};

const FarmerProducts = ({
  matchedProducts,
  products,
  loading,
  messages,
  totalProducts =0 ,
  search,
  category,
}: Props) => {

  if (loading) {
    return (
      <section className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Farmer Products
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center py-24">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />

          <p className="mt-5 text-gray-500">
            Loading farmer products...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Farmer Products
        </h2>

        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
          {totalProducts+matchedProducts.length} Product{totalProducts+matchedProducts.length !== 1 && "s"}
        </span>
      </div>

      {/* ===================== MATCHED PRODUCTS ===================== */}

      {matchedProducts.length > 0 && (
        <>
          {messages[0] && (
            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4">
              <p className="font-semibold text-green-700">
                {messages[0]}
              </p>

              {(search || category) && (
                <div className="mt-3 flex flex-wrap gap-2">

                  {search && (
                    <span className="rounded-full bg-white px-3 py-1 text-sm shadow">
                      🔍 {search}
                    </span>
                  )}

                  {category && (
                    <span className="rounded-full bg-white px-3 py-1 text-sm shadow">
                      📂 {category}
                    </span>
                  )}

                </div>
              )}
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {matchedProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        </>
      )}

      {/* ===================== OTHER PRODUCTS ===================== */}

      {products.length > 0 && (
        <>
          {messages[1] && (
            <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-4">
              <p className="font-semibold text-blue-700">
                {messages[1]}
              </p>
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        </>
      )}

      {/* ===================== EMPTY STATE ===================== */}

      {matchedProducts.length === 0 && products.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-gray-50 py-20 text-center">
          <h3 className="text-xl font-semibold text-gray-800">
            No Products Found
          </h3>

          <p className="mt-3 text-gray-500">
            {messages[0] || messages[1] || "No products available."}
          </p>
        </div>
      )}
    </section>
  );
};

export default FarmerProducts;