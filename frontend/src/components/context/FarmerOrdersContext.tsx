import {
  createContext,
  useEffect,
  useState,
} from "react";
import { getFarmerOrders } from "../Api/farmerApi";

type FarmerOrdersContextType = {
  orders: any[];
  loading: boolean;
  fetchOrders: () => Promise<void>;
  setOrders: React.Dispatch<React.SetStateAction<any[]>>;
};

export const FarmerOrdersContext =
  createContext<FarmerOrdersContextType | null>(null);

export const FarmerOrdersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response = await getFarmerOrders();

      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <FarmerOrdersContext.Provider
      value={{
        orders,
        loading,
        fetchOrders,
        setOrders,
      }}
    >
      {children}
    </FarmerOrdersContext.Provider>
  );
};

