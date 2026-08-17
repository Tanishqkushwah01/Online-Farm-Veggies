// import ProductCard from "../Product/ProductCard";
// import { useCustomerProducts } from "../../../hooks/useCustomerProducts";

// function BestProducts() {
//   const { products, loading } = useCustomerProducts();

//   return (
//     <section className="w-full bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-8">
//       <div className="text-center mb-8">
//         <p className="text-green-600 font-semibold text-sm uppercase tracking-wider">
//           Customer Choice
//         </p>

//         <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
//           Best Products
//         </h2>
//       </div>

//       {loading ? (
//         <h1 className="text-center text-gray-600">Loading...</h1>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
//           {products.map((product: any) => (
//             <ProductCard key={product._id} product={product} />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }

// export default BestProducts;



import ProductCard from "../Product/ProductCard";
import { useCustomerProducts } from "../../../hooks/useCustomerProducts";

function BestProducts() {
  const { products, loading } = useCustomerProducts();

  return (
    <section className="w-full rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-200 sm:p-6 md:p-8 dark:border-[#29343c] dark:bg-[#141c23]">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
          Customer Choice
        </p>

        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-[#f5f7f8]">
          Best Products
        </h2>
      </div>

      {loading ? (
        <h1 className="text-center text-gray-600 dark:text-[#9aa7b1]">
          Loading...
        </h1>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product: any) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default BestProducts;