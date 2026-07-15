// import ProductCard from "../Product/ProductCard";

// type Props = {
//   products: any[];
//   loading: boolean;
// };

// const FarmerProducts = ({
//   products,
//   loading,
// }: Props) => {
//   if (loading) {
//     return (
//       <section className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
//         <h2 className="text-2xl font-bold text-gray-900">
//           Farmer Products
//         </h2>

//         <div className="mt-8 flex items-center justify-center py-16">
//           <p className="text-gray-500">
//             Loading products...
//           </p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
//     {/* // <section className="p-6"> */}
//       <h2 className="text-2xl font-bold text-gray-900">
//         Farmer Products
//       </h2>

//       {products.length === 0 ? (
//         <p className="mt-6 rounded-2xl bg-gray-50 p-8 text-center text-gray-500">
//           No products available.
//         </p>
//       ) : (
//         <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
//           {products.map((product) => (
//             <ProductCard
//               key={product._id}
//               product={product}
//             />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// };

// export default FarmerProducts;

// // import type { FarmerProduct } from "../../../context/CustomerFarmerProductContext";


// // type FarmerProductsProps = {
// //   products: FarmerProduct[];
// //   loading: boolean;
// // };



// // const FarmerProducts = ({
// //   products,
// //   loading,
// // }: FarmerProductsProps) => {



// //   if (loading) {

// //     return (

// //       <div
// //         className="
// //         grid
// //         grid-cols-1
// //         sm:grid-cols-2
// //         lg:grid-cols-3
// //         xl:grid-cols-4
// //         gap-6
// //         "
// //       >

// //         {
// //           Array.from({
// //             length:8
// //           }).map((_,index)=>(

// //             <div
// //               key={index}
// //               className="
// //               rounded-3xl
// //               bg-white
// //               p-4
// //               shadow-sm
// //               animate-pulse
// //               "
// //             >

// //               <div
// //                 className="
// //                 h-48
// //                 rounded-2xl
// //                 bg-gray-200
// //                 "
// //               />


// //               <div
// //                 className="
// //                 mt-4
// //                 h-5
// //                 w-3/4
// //                 rounded
// //                 bg-gray-200
// //                 "
// //               />


// //               <div
// //                 className="
// //                 mt-3
// //                 h-4
// //                 w-1/2
// //                 rounded
// //                 bg-gray-200
// //                 "
// //               />

// //             </div>


// //           ))
// //         }


// //       </div>

// //     );

// //   }







// //   if(products.length === 0){


// //     return (

// //       <div
// //         className="
// //         rounded-3xl
// //         bg-white
// //         p-10
// //         text-center
// //         shadow-sm
// //         "
// //       >

// //         <p
// //           className="
// //           text-lg
// //           font-semibold
// //           text-gray-600
// //           "
// //         >

// //           No products available

// //         </p>


// //         <p
// //           className="
// //           mt-2
// //           text-sm
// //           text-gray-400
// //           "
// //         >

// //           This farmer has no available products.

// //         </p>


// //       </div>

// //     );

// //   }







// //   return (

// //     <div

// //       className="
// //       grid
// //       grid-cols-1
// //       sm:grid-cols-2
// //       md:grid-cols-3
// //       xl:grid-cols-4
// //       gap-6
// //       "

// //     >



// //       {
// //         products.map((product)=>(


// //           <div

// //             key={product._id}

// //             className="
// //             group
// //             overflow-hidden
// //             rounded-3xl
// //             bg-white
// //             shadow-sm
// //             transition
// //             hover:-translate-y-1
// //             hover:shadow-lg
// //             "

// //           >





// //             {/* Image */}


// //             <div

// //               className="
// //               relative
// //               h-52
// //               overflow-hidden
// //               bg-gray-100
// //               "

// //             >


// //               <img

// //                 src={product.image}

// //                 alt={product.productName}

// //                 className="
// //                 h-full
// //                 w-full
// //                 object-cover
// //                 transition
// //                 duration-300
// //                 group-hover:scale-105
// //                 "

// //               />



// //               {
// //                 product.quantity <= 0 && (


// //                   <span

// //                     className="
// //                     absolute
// //                     right-3
// //                     top-3
// //                     rounded-full
// //                     bg-red-500
// //                     px-3
// //                     py-1
// //                     text-xs
// //                     font-semibold
// //                     text-white
// //                     "

// //                   >

// //                     Out of Stock

// //                   </span>


// //                 )
// //               }



// //             </div>









// //             {/* Content */}


// //             <div
// //               className="
// //               p-5
// //               "
// //             >



// //               <div
// //                 className="
// //                 flex
// //                 items-start
// //                 justify-between
// //                 gap-3
// //                 "
// //               >


// //                 <h3

// //                   className="
// //                   line-clamp-2
// //                   text-base
// //                   font-semibold
// //                   text-gray-800
// //                   "

// //                 >

// //                   {product.productName}

// //                 </h3>




// //                 <span

// //                   className="
// //                   rounded-full
// //                   bg-green-50
// //                   px-3
// //                   py-1
// //                   text-xs
// //                   font-medium
// //                   text-green-700
// //                   "

// //                 >

// //                   {product.category}

// //                 </span>



// //               </div>








// //               <p

// //                 className="
// //                 mt-3
// //                 text-xl
// //                 font-bold
// //                 text-green-600
// //                 "

// //               >

// //                 ₹{product.price}

// //                 <span
// //                   className="
// //                   ml-1
// //                   text-sm
// //                   font-medium
// //                   text-gray-500
// //                   "
// //                 >

// //                   /{product.unit}

// //                 </span>


// //               </p>








// //               <div

// //                 className="
// //                 mt-4
// //                 flex
// //                 items-center
// //                 justify-between
// //                 text-sm
// //                 "

// //               >



// //                 <span
// //                   className="
// //                   text-gray-600
// //                   "
// //                 >

// //                   Qty:
// //                   <b className="ml-1 text-gray-800">

// //                     {product.quantity}

// //                   </b>

// //                 </span>





// //                 <span

// //                   className="
// //                   flex
// //                   items-center
// //                   gap-1
// //                   text-yellow-500
// //                   "

// //                 >

// //                   ⭐

// //                   <span className="text-gray-700">

// //                     {product.averageRating || 0}

// //                   </span>


// //                   <span className="text-gray-400">

// //                     ({product.totalReviews || 0})

// //                   </span>


// //                 </span>




// //               </div>




// //             </div>



// //           </div>


// //         ))
// //       }



// //     </div>

// //   );

// // };


// // export default FarmerProducts;


// import ProductCard from "../Product/ProductCard";
// import type { FarmerProduct } from "../../../context/CustomerFarmerProductContext";

// type Props = {
//   products: FarmerProduct[];
//   loading: boolean;
// };

// const FarmerProducts = ({
//   products,
//   loading,
// }: Props) => {
//   if (loading) {
//     return (
//       <section className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
//         <h2 className="text-2xl font-bold text-gray-900">
//           Farmer Products
//         </h2>

//         <div className="mt-8 flex justify-center py-16">
//           <p className="text-gray-500">Loading products...</p>
//         </div>
//       </section>
//     );
//   }

//   if (products.length === 0) {
//     return (
//       <section className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
//         <h2 className="text-2xl font-bold text-gray-900">
//           Farmer Products
//         </h2>

//         <p className="mt-6 rounded-2xl bg-gray-50 p-8 text-center text-gray-500">
//           No products available.
//         </p>
//       </section>
//     );
//   }

//   const featuredProduct = products[0];
//   const otherProducts = products.slice(1);

//   return (
//     <section className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
//       {/* Search Product */}

//       <div>
//         <h2 className="text-2xl font-bold text-gray-900">
//           Search Product
//         </h2>

//         <div className="mt-6 w-[280px]">
//           <ProductCard product={featuredProduct} />
//         </div>
//       </div>

//       {/* Grid */}

//       {otherProducts.length > 0 && (
//         <div className="mt-12">
//           <h2 className="text-2xl font-bold text-gray-900">
//             More Products From This Farmer
//           </h2>

//           <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
//             {otherProducts.map((product) => (
//               <ProductCard
//                 key={product._id}
//                 product={product}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default FarmerProducts;

// import ProductCard from "../Product/ProductCard";
// import type { FarmerProduct } from "../../../context/CustomerFarmerProductContext";

// type Props = {
//   products: FarmerProduct[];
//   loading: boolean;
//   search: string;
//   matchedCount: number;
// };

// const FarmerProducts = ({
//   products,
//   loading,
//   search,
//   matchedCount,
// }: Props) => {
//   if (loading) {
//     return (
//       <section className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
//         <h2 className="text-2xl font-bold text-gray-900">
//           Farmer Products
//         </h2>

//         <div className="mt-10 flex items-center justify-center py-16">
//           <p className="text-gray-500">Loading products...</p>
//         </div>
//       </section>
//     );
//   }

//   if (!products || products.length === 0) {
//     return (
//       <section className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
//         <h2 className="text-2xl font-bold text-gray-900">
//           Farmer Products
//         </h2>

//         <p className="mt-6 rounded-2xl bg-gray-50 p-8 text-center text-gray-500">
//           No products available.
//         </p>
//       </section>
//     );
//   }

//   // Search laga hai aur backend ko match mila
//   const showFeatured =
//     search.trim() !== "" && matchedCount > 0;

//   const featuredProduct = showFeatured
//     ? products[0]
//     : null;

//   const gridProducts = showFeatured
//     ? products.slice(1)
//     : products;

//   return (
//     <section className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">

//       {/* Search Product */}

//       {showFeatured && featuredProduct && (
//         <>
//           <h2 className="text-2xl font-bold text-gray-900">
//             Search Product
//           </h2>

//           <div className="mt-6 mb-10 w-[280px]">
//             <ProductCard product={featuredProduct} />
//           </div>
//         </>
//       )}

//       {/* Farmer Products */}

//       <h2 className="text-2xl font-bold text-gray-900">
//         {showFeatured
//           ? "More Products From This Farmer"
//           : "Farmer Products"}
//       </h2>

//       <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
//         {gridProducts.map((product) => (
//           <ProductCard
//             key={product._id}
//             product={product}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default FarmerProducts;

// import ProductCard from "../Product/ProductCard";
// import type { FarmerProduct } from "../../../context/CustomerFarmerProductContext";

// type Props = {
//   products: FarmerProduct[];
//   loading: boolean;
// };

// const FarmerProducts = ({
//   products,
//   loading,
// }: Props) => {
//   if (loading) {
//     return (
//       <section className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
//         <h2 className="text-2xl font-bold text-gray-900">
//           Farmer Products
//         </h2>

//         <div className="mt-8 flex items-center justify-center py-16">
//           <p className="text-gray-500">
//             Loading products...
//           </p>
//         </div>
//       </section>
//     );
//   }

//   if (products.length === 0) {
//     return (
//       <section className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
//         <h2 className="text-2xl font-bold text-gray-900">
//           Farmer Products
//         </h2>

//         <p className="mt-6 rounded-2xl bg-gray-50 p-8 text-center text-gray-500">
//           No products available.
//         </p>
//       </section>
//     );
//   }

//   return (
//     <section className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
//       <h2 className="text-2xl font-bold text-gray-900">
//         Farmer Products
//       </h2>

//       <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
//         {products.map((product) => (
//           <ProductCard
//             key={product._id}
//             product={product}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default FarmerProducts;
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