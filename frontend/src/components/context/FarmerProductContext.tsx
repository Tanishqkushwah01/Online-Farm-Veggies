// import {
//   createContext,
//   useEffect,
//   useState,
// } from "react";
// import type { ReactNode } from "react";
// import { getFarmerProducts } from "../Api/farmerApi";

// export type Product = {
//   _id: string;
//   productName: string;
//   category: string;
//   price: number;
//   quantity: number;
//   review: number;
//   image: string;
// };

// type ProductContextType = {
//   products: Product[];
//   loading: boolean;
//   fetchProducts: () => Promise<void>;
// };

// export const ProductContext = createContext<ProductContextType | null>(null);

// export const ProductProvider = ({
//   children,
// }: {
//   children: ReactNode;
// }) => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(false);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);

//       const response = await getFarmerProducts();

//       if (response.data.success) {
//         setProducts(response.data.data);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <ProductContext.Provider
//       value={{
//         products,
//         loading,
//         fetchProducts,
//       }}
//     >
//       {children}
//     </ProductContext.Provider>
//   );
// };
import {
  createContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import { getFarmerProducts } from "../Api/farmerApi";
import type {
  CategoryFilter,
  StockFilter,
} from "../layouts/Farmer/Products/ProductFilter";

export type Product = {
  _id: string;
  productName: string;
  category: string;
  price: number;
  quantity: number;
  review: number;
  image: string;
};

type ProductContextType = {
  products: Product[];
  loading: boolean;

  page: number;
  totalPages: number;
  totalProducts: number;

  search: string;
  category: CategoryFilter;
  stock: StockFilter;

  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<CategoryFilter>>;
  setStock: React.Dispatch<React.SetStateAction<StockFilter>>;

  fetchProducts: (page?: number) => Promise<void>;
  handleNext: () => void;
  handlePrevious: () => void;
};

export const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const [search, setSearch] = useState("");
  const [category, setCategory] =
    useState<CategoryFilter>("All Category");
  const [stock, setStock] =
    useState<StockFilter>("All Stock");

  const fetchProducts = async (currentPage = page) => {
    try {
      setLoading(true);

      const response = await getFarmerProducts(
        currentPage,
        12,
        search,
        category,
        stock
      );

      if (response.data.success) {
        setProducts(response.data.products || []);
        setPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
        setTotalProducts(response.data.totalProducts);
      }
    } catch (error) {
      console.log(error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [search, category, stock]);

  useEffect(() => {
    fetchProducts(1);
  }, [search, category, stock]);

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,

        page,
        totalPages,
        totalProducts,

        search,
        category,
        stock,

        setSearch,
        setCategory,
        setStock,

        fetchProducts,
        handleNext,
        handlePrevious,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};