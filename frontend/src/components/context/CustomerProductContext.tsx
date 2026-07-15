import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { getTenProducts, getCustomerProducts } from "../Api/customerApi";


export type CustomerProduct = {
  _id: string;
  productName: string;
  category: string;
  price: number;
  quantity: number;
  review: number;
  image: string;
};

type CustomerProductContextType = {

  // =========================
  // Home
  // =========================

  products: CustomerProduct[];
  loading: boolean;
  fetchProducts: () => Promise<void>;

  // =========================
  // Search
  // =========================

  allProducts: CustomerProduct[];
  categoryProducts: CustomerProduct[];

  searchLoading: boolean;

  page: number;
  totalPages: number;
  totalProducts: number;

  search: string;
  location: string;
  category: string;
  price: string;

  message: string;

  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setPrice: React.Dispatch<React.SetStateAction<string>>;

  fetchSearchProducts: () => Promise<void>;
};


export const CustomerProductContext = createContext<CustomerProductContextType | null>(null);

export const CustomerProductProvider = ({ children }: { children: ReactNode }) => {

  // =========================
  // Home Products
  // =========================

  const [products, setProducts] = useState<CustomerProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchProducts = async () => {
    try {
      setLoading(true);

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

  // =========================
  // Search Page
  // =========================

  const [allProducts, setAllProducts] = useState<CustomerProduct[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<CustomerProduct[]>([]);

  const [searchLoading, setSearchLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const [message, setMessage] = useState("");

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All Location");
  const [category, setCategory] = useState("All Category");
  const [price, setPrice] = useState("");

  const fetchSearchProducts = async () => {
    try {
      setSearchLoading(true);

      const response = await getCustomerProducts(
        page,
        20,
        search,
        location,
        category,
        price
      );
      console.log({
        search,
        location,
        category,
        price,
      });

      if (response.data.success) {
        setAllProducts(response.data.products || []);

        setCategoryProducts(
          response.data.categoryProducts || []
        );

        setTotalPages(
          response.data.totalPages || 1
        );

        setTotalProducts(
          response.data.totalProducts || 0
        );

        setMessage(
          response.data.message || ""
        );
      }
    } catch (error) {
      console.log(error);

      setAllProducts([]);
      setCategoryProducts([]);

      setTotalPages(1);
      setTotalProducts(0);
      setMessage("Something went wrong");

    } finally {
      setSearchLoading(false);
    }
  };

  // Home API
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, location, category, price]);

  useEffect(() => {
    fetchSearchProducts();
  }, [page, search, location, category, price]);

  return (
    <CustomerProductContext.Provider
      value={{
        // Home
        products,
        loading,
        fetchProducts,

        // Search
        allProducts,
        categoryProducts,
        searchLoading,

        page,
        totalPages,
        totalProducts,

        search,
        location,
        category,
        price,

        message,

        setPage,
        setSearch,
        setLocation,
        setCategory,
        setPrice,

        fetchSearchProducts,
      }}
    >
      {children}
    </CustomerProductContext.Provider>
  );

};