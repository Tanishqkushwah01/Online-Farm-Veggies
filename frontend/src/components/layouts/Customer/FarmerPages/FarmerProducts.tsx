import ProductCard from "../Product/ProductCard";

type Props = {
  products: any[];
};

const FarmerProducts = ({ products }: Props) => {
  return (
    <section className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900">Farmer Products</h2>

      {products.length === 0 ? (
        <p className="mt-6 rounded-2xl bg-gray-50 p-8 text-center text-gray-500">
          No products available.
        </p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FarmerProducts;