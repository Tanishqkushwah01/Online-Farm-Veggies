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

//   const isInWishlist = (productId: string) => {
//     if (!productId) return false;
//     return wishlistIds.includes(productId);
//   };

//   const fetchWishlist = async () => {
//     try {
//       setLoadingWishlist(true);

//       const response = await getWishlist();

//       if (response.data.success) {
//         const wishlist = response.data.wishlist || [];

//         const products = wishlist
//           .map((item: any) => item?.productId)
//           .filter((product: any) => product && product._id);

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
//       if (!product?._id) {
//         toast.error("Invalid product.");
//         return;
//       }

//       const productId = product._id;

//       const response = await addToWishlist(productId);

//       if (response.data.success) {
//         const isWishlisted = response.data.isWishlisted;

//         setWishlistIds((prev) =>
//           isWishlisted
//             ? [...new Set([...prev, productId])]
//             : prev.filter((id) => id !== productId)
//         );

//         setWishlistProducts((prev) => {
//           const safePrev = prev.filter((item) => item && item._id);

//           if (isWishlisted) {
//             const alreadyExists = safePrev.some(
//               (item) => item._id === productId
//             );

//             return alreadyExists ? safePrev : [...safePrev, product];
//           }

//           return safePrev.filter((item) => item._id !== productId);
//         });

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


import { createContext, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addToWishlist, getWishlist } from "../Api/customerApi";

type WishlistContextType = {
  wishlistIds: string[];
  wishlistProducts: any[];
  loadingWishlist: boolean;

  page: number;
  totalPages: number;
  totalWishlist: number;

  hasNextPage: boolean;
  hasPrevPage: boolean;

  search: string;
  category: string;
  message: string;

  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
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
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [totalWishlist, setTotalWishlist] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [message, setMessage] = useState("");
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const isInWishlist = useCallback((productId: string) => {
    if (!productId) return false;

    return wishlistIds.includes(productId);
  }, [wishlistIds]);

  const fetchWishlist = useCallback(async () => {
    try {
      setLoadingWishlist(true);

      const response = await getWishlist(
        page,
        15,
        search,
        category
      );

      if (response.data.success) {
        const wishlist = response.data.wishlist || [];

        const products = wishlist
          .map((item: any) => item?.productId)
          .filter((product: any) => product && product._id);

        setWishlistProducts(products);
        setWishlistIds(products.map((product: any) => product._id));

        setTotalPages(response.data.totalPages);
        setTotalWishlist(response.data.totalWishlist);

        setHasNextPage(response.data.hasNextPage);
        setHasPrevPage(response.data.hasPrevPage);

        setMessage(response.data.message || "");
      }
    } catch (error) {
      console.log(error);

      // setWishlistProducts([]);
      // setWishlistIds([]);
      // setTotalPages(0);
      // setTotalWishlist(0);
      // setHasNextPage(false);
      // setHasPrevPage(false);
      // setMessage("");
    } finally {
      setLoadingWishlist(false);
    }
  }, [page, search, category]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  useEffect(() => {
    setPage(1);
  }, [search, category]);

  const toggleWishlist = async (product: any) => {
    if (!product?._id) {
      toast.error("Invalid product.");
      return;
    }

    if (wishlistLoading) return;

    try {
      setWishlistLoading(true);

      const response = await addToWishlist(product._id);

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchWishlist();
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );

    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistProducts,
        loadingWishlist,

        page,
        totalPages,
        totalWishlist,

        hasNextPage,
        hasPrevPage,

        search,
        category,
        message,

        setPage,
        setSearch,
        setCategory,
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