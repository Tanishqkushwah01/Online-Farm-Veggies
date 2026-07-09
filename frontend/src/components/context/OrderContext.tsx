// import {
//   createContext,
//   useEffect,
//   useState,
//   type ReactNode,
// } from "react";
// import { getCustomerOrders } from "../Api/customerApi";

// export type Order = {
//   _id: string;
//   productId: string;
//   farmerId: string;
//   productName: string;
//   productImage: string;
//   orderCode: string;
//   quantity: number;
//   totalPrice: number;
//   requiredDate: string;
//   farmName: string;
//   location: string;
//   phoneNumber: string;
//   orderedOn: string;
//   orderStatus: string;
// };

// type OrderContextType = {
//   orders: Order[];
//   loading: boolean;
//   fetchOrders: () => Promise<void>;
//   addOrderLocally: (newOrder: Order) => void;
//   hasOrdered: (productId: string) => boolean;
//   setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
// };

// export const OrderContext = createContext<OrderContextType | undefined>(
//   undefined
// );

// export const OrderProvider = ({ children }: { children: ReactNode }) => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);

//       const response = await getCustomerOrders();

//       if (response.data.success) {
//         setOrders(response.data.orders);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addOrderLocally = (newOrder: Order) => {
//     setOrders((prevOrders) => {
//       const alreadyExists = prevOrders.some(
//         (order) => order._id === newOrder._id
//       );

//       if (alreadyExists) return prevOrders;

//       return [newOrder, ...prevOrders];
//     });
//   };

//   const hasOrdered = (productId: string) => {
//     return orders.some(
//       (order) =>
//         order.productId === productId &&
//         order.orderStatus !== "Cancelled"
//     );
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   return (
//     <OrderContext.Provider
//       value={{
//         orders,
//         loading,
//         fetchOrders,
//         addOrderLocally,
//         hasOrdered,
//         setOrders,
//       }}
//     >
//       {children}
//     </OrderContext.Provider>
//   );
// };

import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getCustomerOrders } from "../Api/customerApi";

export type Order = {
  _id: string;
  productId: string;
  farmerId: string;
  productName: string;
  productImage: string;
  orderCode: string;
  quantity: number;
  totalPrice: number;
  requiredDate: string;
  farmName: string;
  location: string;
  phoneNumber: string;
  orderedOn: string;
  orderStatus: string;
};

type OrderContextType = {
  orders: Order[];
  loading: boolean;
  fetchOrders: () => Promise<void>;
  addOrderLocally: (newOrder: Order) => void;
  removeOrderLocally: (orderId: string) => void;
  hasOrdered: (productId: string) => boolean;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
};

export const OrderContext = createContext<OrderContextType | undefined>(
  undefined
);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response = await getCustomerOrders();

      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addOrderLocally = (newOrder: Order) => {
    setOrders((prevOrders) => {
      const alreadyExists = prevOrders.some(
        (order) => order._id === newOrder._id
      );

      if (alreadyExists) return prevOrders;

      return [newOrder, ...prevOrders];
    });
  };

  const removeOrderLocally = (orderId: string) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order._id !== orderId)
    );
  };

  const hasOrdered = (productId: string) => {
    return orders.some(
      (order) =>
        order.productId === productId && order.orderStatus !== "Cancelled"
    );
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        fetchOrders,
        addOrderLocally,
        removeOrderLocally,
        hasOrdered,
        setOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};