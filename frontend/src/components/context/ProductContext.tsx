import {
  createContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import { getFarmerProducts } from "../Api/farmerApi";

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
  fetchProducts: () => Promise<void>;
};

export const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await getFarmerProducts();

      if (response.data.success) {
        setProducts(response.data.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};