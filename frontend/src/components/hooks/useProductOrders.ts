import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

const useCusomterOrders = () => {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error("useOrder must be used inside OrderProvider");
  }

  return context;
};

export default useCusomterOrders;