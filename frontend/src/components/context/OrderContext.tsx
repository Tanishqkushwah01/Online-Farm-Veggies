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
//   removeOrderLocally: (orderId: string) => void;
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

//   const removeOrderLocally = (orderId: string) => {
//     setOrders((prevOrders) =>
//       prevOrders.filter((order) => order._id !== orderId)
//     );
//   };

//   const hasOrdered = (productId: string) => {
//     return orders.some(
//       (order) =>
//         order.productId === productId && order.orderStatus !== "Cancelled"
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
//         removeOrderLocally,
//         hasOrdered,
//         setOrders,
//       }}
//     >
//       {children}
//     </OrderContext.Provider>
//   );
// };

// import {
//   createContext,
//   useCallback,
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

//   page: number;
//   totalPages: number;
//   totalOrders: number;

//   hasNextPage: boolean;
//   hasPrevPage: boolean;

//   setPage: React.Dispatch<React.SetStateAction<number>>;
//   setOrders: React.Dispatch<React.SetStateAction<Order[]>>;

//   fetchOrders: () => Promise<void>;

//   addOrderLocally: (newOrder: Order) => void;
//   removeOrderLocally: (orderId: string) => void;
//   hasOrdered: (productId: string) => boolean;
// };

// export const OrderContext = createContext<OrderContextType | undefined>(
//   undefined
// );

// export const OrderProvider = ({
//   children,
// }: {
//   children: ReactNode;
// }) => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [totalOrders, setTotalOrders] = useState(0);

//   const [hasNextPage, setHasNextPage] = useState(false);
//   const [hasPrevPage, setHasPrevPage] = useState(false);

//   const fetchOrders = useCallback(async () => {
//     try {
//       setLoading(true);

//       const response = await getCustomerOrders(page, 5);

//       if (response.data.success) {
//         setOrders(response.data.orders);

//         setTotalPages(response.data.totalPages);
//         setTotalOrders(response.data.totalOrders);

//         setHasNextPage(response.data.hasNextPage);
//         setHasPrevPage(response.data.hasPrevPage);
//       }
//     } catch (error) {
//       console.log("Fetch Orders Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [page]);

//   const addOrderLocally = (newOrder: Order) => {
//     setOrders((prevOrders) => {
//       const alreadyExists = prevOrders.some(
//         (order) => order._id === newOrder._id
//       );

//       if (alreadyExists) return prevOrders;

//       return [newOrder, ...prevOrders];
//     });
//   };

//   const removeOrderLocally = (orderId: string) => {
//     setOrders((prevOrders) =>
//       prevOrders.filter((order) => order._id !== orderId)
//     );
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
//   }, [fetchOrders]);

//   return (
//     <OrderContext.Provider
//       value={{
//         orders,
//         loading,

//         page,
//         totalPages,
//         totalOrders,

//         hasNextPage,
//         hasPrevPage,

//         setPage,
//         setOrders,

//         fetchOrders,

//         addOrderLocally,
//         removeOrderLocally,
//         hasOrdered,
//       }}
//     >
//       {children}
//     </OrderContext.Provider>
//   );
// };

import {  createContext,  useCallback,  useEffect,  useState,  type ReactNode} from "react";
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

  page: number;
  totalPages: number;
  totalOrders: number;

  hasNextPage: boolean;
  hasPrevPage: boolean;

  search: string;
  category: string;
  message: string;

  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;

  fetchOrders: () => Promise<void>;

  addOrderLocally: (newOrder: Order) => void;
  removeOrderLocally: (orderId: string) => void;
  hasOrdered: (productId: string) => boolean;
};

export const OrderContext = createContext<OrderContextType | undefined>(
  undefined
);

export const OrderProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [category, setCategory] = useState("");

  const [message, setMessage] = useState("");

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getCustomerOrders(
        page,
        5,
        debouncedSearch,
        category
      );

      if (response.data.success) {
        setOrders(response.data.orders || []);

        setTotalPages(response.data.totalPages || 0);
        setTotalOrders(response.data.totalOrders || 0);

        setHasNextPage(page < response.data.totalPages);
        setHasPrevPage(page > 1);

        setMessage(response.data.message || "");
      } else {
        setOrders([]);
        setMessage(response.data.message || "");
      }
    } catch (error) {
      console.log("Fetch Orders Error:", error);

      setOrders([]);
      setMessage("Unable to load orders");
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, category]);

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
        order.productId === productId &&
        order.orderStatus !== "Cancelled"
    );
  };

  // Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Reset page when search/category changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, category]);

  // Fetch Orders
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,

        page,
        totalPages,
        totalOrders,

        hasNextPage,
        hasPrevPage,

        search,
        category,
        message,

        setSearch,
        setCategory,
        setPage,
        setOrders,

        fetchOrders,

        addOrderLocally,
        removeOrderLocally,
        hasOrdered,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};