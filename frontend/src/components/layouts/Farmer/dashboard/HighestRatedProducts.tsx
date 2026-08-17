// import { Star } from "lucide-react";
// import { useEffect, useState } from "react";
// import { getHighestRatedProducts } from "../../../Api/farmerApi";

// type ProductType = {
//   _id: string;
//   productName: string;
//   image: string;
//   averageRating: number;
//   totalReviews: number;
// };
// type HighestRatedProductsProps = {
//   setActivePage: React.Dispatch<React.SetStateAction<string>>;
// };

// const HighestRatedProducts = ({ setActivePage }: HighestRatedProductsProps) => {
//   const [products, setProducts] = useState<ProductType[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchHighestRatedProducts = async () => {
//     try {
//       const response = await getHighestRatedProducts();

//       if (response.data.success) {
//         setProducts(response.data.products);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchHighestRatedProducts();
//   }, []);

//   if (loading) {
//     return (
//       <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
//         <p className="text-center text-gray-500">
//           Loading highest rated products...
//         </p>
//       </div>
//     );
//   }

//   if (products.length === 0) {
//     return (
//       <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
//         <h2 className="mb-6 text-xl font-bold text-slate-900">
//           Highest Rated Products
//         </h2>

//         <p className="text-center text-gray-500">
//           No rated products found.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
//       <div className="mb-6 flex items-center justify-between">
//         <h2 className="text-xl font-bold text-slate-900">
//           Highest Rated Products
//         </h2>

//         <button
//         onClick={() => setActivePage("reviews")}
//         className="font-semibold text-green-400 cursor-pointer hover:text-green-600">
//           View All
//         </button>
//       </div>

//       <div className="space-y-5">
//         {products.map((product, index) => (
//           <div
//             key={product._id}
//             className="flex items-center justify-between rounded-xl p-2 transition hover:bg-gray-50"
//           >
//             <div className="flex items-center gap-4">
//               <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
//                 #{index + 1}
//               </div>

//               <img
//                 src={product.image}
//                 alt={product.productName}
//                 className="h-14 w-14 rounded-lg object-cover"
//               />

//               <div>
//                 <h3 className="font-semibold text-slate-900">
//                   {product.productName}
//                 </h3>

//                 <p className="text-sm text-gray-500">
//                   {product.totalReviews} Reviews
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-2 rounded-full bg-yellow-50 px-3 py-1.5">
//               <Star
//                 size={18}
//                 className="fill-yellow-400 text-yellow-400"
//               />

//               <span className="font-bold text-slate-900">
//                 {product.averageRating.toFixed(1)}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HighestRatedProducts;


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

const HighestRatedProducts = ({
  setActivePage,
}: HighestRatedProductsProps) => {
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
      <div className="w-full min-w-0 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-200 sm:p-6 dark:border-[#29343c] dark:bg-[#141c23]">
        <p className="text-center text-gray-500 dark:text-[#9aa7b1]">
          Loading highest rated products...
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="w-full min-w-0 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-200 sm:p-6 dark:border-[#29343c] dark:bg-[#141c23]">
        <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-[#f5f7f8]">
          Highest Rated Products
        </h2>

        <p className="text-center text-gray-500 dark:text-[#9aa7b1]">
          No rated products found.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-200 sm:p-6 dark:border-[#29343c] dark:bg-[#141c23]">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <h2 className="min-w-0 text-xl font-bold leading-7 text-slate-900 dark:text-[#f5f7f8]">
          Highest Rated Products
        </h2>

        <button
          onClick={() => setActivePage("reviews")}
          className="shrink-0 cursor-pointer whitespace-nowrap font-semibold text-green-400 transition hover:text-green-600 dark:text-[#00c767] dark:hover:text-[#00e676]"
        >
          View All
        </button>
      </div>

      {/* Products */}
      <div className="space-y-4 sm:space-y-5">
        {products.map((product, index) => (
          <div
            key={product._id}
            className="rounded-xl p-2 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-[#192128]"
          >
            {/* Product main content */}
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              {/* Rank */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 font-bold text-green-700 dark:bg-[#123126] dark:text-[#00c767]">
                #{index + 1}
              </div>

              {/* Image */}
              <img
                src={product.image}
                alt={product.productName}
                className="h-12 w-12 shrink-0 rounded-lg object-cover sm:h-14 sm:w-14"
              />

              {/* Product info */}
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold text-slate-900 dark:text-[#f5f7f8]">
                  {product.productName}
                </h3>

                <p className="mt-1 text-sm text-gray-500 dark:text-[#9aa7b1]">
                  {product.totalReviews} Reviews
                </p>
              </div>

              {/* Rating - Desktop */}
              <div className="hidden shrink-0 items-center gap-2 rounded-full bg-yellow-50 px-3 py-1.5 sm:flex dark:bg-[#352e18]">
                <Star
                  size={18}
                  className="fill-yellow-400 text-yellow-400"
                />

                <span className="font-bold text-slate-900 dark:text-[#f5f7f8]">
                  {product.averageRating.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Rating - Mobile */}
            <div className="mt-3 flex items-center justify-end sm:hidden">
              <div className="flex items-center gap-2 rounded-full bg-yellow-50 px-3 py-1.5 dark:bg-[#352e18]">
                <Star
                  size={18}
                  className="fill-yellow-400 text-yellow-400"
                />

                <span className="font-bold text-slate-900 dark:text-[#f5f7f8]">
                  {product.averageRating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighestRatedProducts;