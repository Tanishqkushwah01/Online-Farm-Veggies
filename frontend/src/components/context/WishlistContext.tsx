// import { createContext, useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { addToWishlist, getWishlist } from "../Api/customerApi";

// type WishlistContextType = {
//   wishlistIds: string[];
//   wishlistProducts: any[];
//   loadingWishlist: boolean;
//   setWishlistIds: React.Dispatch<React.SetStateAction<string[]>>;
//   isInWishlist: (productId: string) => boolean;
//   toggleWishlist: (product: any) => Promise<void>;
//   fetchWishlist: () => Promise<void>;
// };

// export const WishlistContext = createContext<WishlistContextType | null>(null);

// export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
//   const [wishlistIds, setWishlistIds] = useState<string[]>([]);
//   const [wishlistProducts, setWishlistProducts] = useState<any[]>([]);
//   const [loadingWishlist, setLoadingWishlist] = useState(true);

//   const isInWishlist = (productId: string) => wishlistIds.includes(productId);

//   const fetchWishlist = async () => {
//     try {
//       setLoadingWishlist(true);

//       const response = await getWishlist();

//       if (response.data.success) {
//         const wishlist = response.data.wishlist || [];
//         const products = wishlist.map((item: any) => item.productId);

//         setWishlistProducts(products);
//         setWishlistIds(products.map((product: any) => product._id));
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoadingWishlist(false);
//     }
//   };

//   useEffect(() => {
//     fetchWishlist();
//   }, []);

//   const toggleWishlist = async (product: any) => {
//     try {
//       const productId = product._id;
//       const response = await addToWishlist(productId);

//       if (response.data.success) {
//         const isWishlisted = response.data.isWishlisted;

//         setWishlistIds((prev) =>
//           isWishlisted
//             ? [...new Set([...prev, productId])]
//             : prev.filter((id) => id !== productId)
//         );

//         setWishlistProducts((prev) =>
//           isWishlisted
//             ? prev.some((item) => item._id === productId)
//               ? prev
//               : [...prev, product]
//             : prev.filter((item) => item._id !== productId)
//         );

//         toast.success(response.data.message);
//       }
//     } catch (error: any) {
//       toast.error(error?.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <WishlistContext.Provider
//       value={{
//         wishlistIds,
//         wishlistProducts,
//         loadingWishlist,
//         setWishlistIds,
//         isInWishlist,
//         toggleWishlist,
//         fetchWishlist,
//       }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };

import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addToWishlist, getWishlist } from "../Api/customerApi";

type WishlistContextType = {
  wishlistIds: string[];
  wishlistProducts: any[];
  loadingWishlist: boolean;
  setWishlistIds: React.Dispatch<React.SetStateAction<string[]>>;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: any) => Promise<void>;
  fetchWishlist: () => Promise<void>;
};

export const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [wishlistProducts, setWishlistProducts] = useState<any[]>([]);
  const [loadingWishlist, setLoadingWishlist] = useState(true);

  const isInWishlist = (productId: string) => {
    if (!productId) return false;
    return wishlistIds.includes(productId);
  };

  const fetchWishlist = async () => {
    try {
      setLoadingWishlist(true);

      const response = await getWishlist();

      if (response.data.success) {
        const wishlist = response.data.wishlist || [];

        const products = wishlist
          .map((item: any) => item?.productId)
          .filter((product: any) => product && product._id);

        setWishlistProducts(products);
        setWishlistIds(products.map((product: any) => product._id));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingWishlist(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const toggleWishlist = async (product: any) => {
    try {
      if (!product?._id) {
        toast.error("Invalid product.");
        return;
      }

      const productId = product._id;

      const response = await addToWishlist(productId);

      if (response.data.success) {
        const isWishlisted = response.data.isWishlisted;

        setWishlistIds((prev) =>
          isWishlisted
            ? [...new Set([...prev, productId])]
            : prev.filter((id) => id !== productId)
        );

        setWishlistProducts((prev) => {
          const safePrev = prev.filter((item) => item && item._id);

          if (isWishlisted) {
            const alreadyExists = safePrev.some(
              (item) => item._id === productId
            );

            return alreadyExists ? safePrev : [...safePrev, product];
          }

          return safePrev.filter((item) => item._id !== productId);
        });

        toast.success(response.data.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistProducts,
        loadingWishlist,
        setWishlistIds,
        isInWishlist,
        toggleWishlist,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};