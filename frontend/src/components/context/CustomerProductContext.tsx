import {
  createContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import { getTenProducts } from "../Api/customerApi";

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
  products: CustomerProduct[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
};

export const CustomerProductContext =
  createContext<CustomerProductContextType | null>(null);

export const CustomerProductProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
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

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <CustomerProductContext.Provider
      value={{
        products,
        loading,
        fetchProducts,
      }}
    >
      {children}
    </CustomerProductContext.Provider>
  );
};