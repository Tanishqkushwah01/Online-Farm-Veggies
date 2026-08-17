// import { Heart } from "lucide-react";

// import { useWishlist } from "../../../hooks/useWishlist";

// import ProductCard from "../Product/ProductCard";
// import WishlistPagination from "./WishlistPagination";

// const Wishlist = () => {
//   const {
//     wishlistProducts,
//     loadingWishlist,
//     totalPages,
//     message,
//   } = useWishlist();

//   const validWishlistProducts = wishlistProducts.filter(
//     (product: any) => product && product._id
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 px-8 py-8">
//       <div className="mb-8">
//         <h1 className="flex items-center gap-3 text-4xl font-bold text-gray-900">
//           <Heart
//             className="fill-red-500 text-red-500"
//             size={36}
//           />

//           My Wishlist
//         </h1>

//         <p className="mt-2 text-gray-500">
//           Your saved fresh vegetables are here
//         </p>
//       </div>

//       {loadingWishlist ? (
//         <h1 className="text-xl font-semibold text-gray-700">
//           Loading...
//         </h1>
//       ) : validWishlistProducts.length > 0 ? (
//         <>
//           <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
//             {validWishlistProducts.map((product: any) => (
//               <ProductCard
//                 key={product._id}
//                 product={product}
//               />
//             ))}
//           </div>

//           {totalPages > 1 && (
//             <WishlistPagination />
//           )}
//         </>
//       ) : (
//         <div className="flex h-[60vh] flex-col items-center justify-center text-center">
//           <Heart
//             size={70}
//             className="mb-4 text-gray-300"
//           />

//           <h2 className="text-2xl font-bold text-gray-800">
//             {message || "Your wishlist is empty"}
//           </h2>

//           <p className="mt-2 text-gray-500">
//             Save your favourite vegetables here.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Wishlist;



import { Heart } from "lucide-react";

import { useWishlist } from "../../../hooks/useWishlist";

import ProductCard from "../Product/ProductCard";
import WishlistPagination from "./WishlistPagination";

const Wishlist = () => {
  const {
    wishlistProducts,
    loadingWishlist,
    totalPages,
    message,
  } = useWishlist();

  const validWishlistProducts = wishlistProducts.filter(
    (product: any) => product && product._id
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 transition-colors duration-200 sm:px-6 sm:py-7 lg:px-8 lg:py-8 dark:bg-[#0f171f]">
      <div className="mb-8">
        <h1 className="flex flex-wrap items-center gap-3 text-4xl font-bold text-gray-900 dark:text-[#f5f7f8]">
          <Heart
            className="fill-red-500 text-red-500"
            size={36}
          />

          My Wishlist
        </h1>

        <p className="mt-2 text-gray-500 dark:text-[#9aa7b1]">
          Your saved fresh vegetables are here
        </p>
      </div>

      {loadingWishlist ? (
        <h1 className="text-xl font-semibold text-gray-700 dark:text-[#9aa7b1]">
          Loading...
        </h1>
      ) : validWishlistProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {validWishlistProducts.map((product: any) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>

          {totalPages > 1 && <WishlistPagination />}
        </>
      ) : (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
          <Heart
            size={70}
            className="mb-4 text-gray-300 dark:text-[#47535c]"
          />

          <h2 className="text-2xl font-bold text-gray-800 dark:text-[#f5f7f8]">
            {message || "Your wishlist is empty"}
          </h2>

          <p className="mt-2 break-words text-gray-500 dark:text-[#9aa7b1]">
            Save your favourite vegetables here.
          </p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;