import { useContext } from "react";
import { FarmerOrdersContext } from "../context/FarmerOrdersContext";

export const useFarmerOrders = () => {
  const context = useContext(FarmerOrdersContext);

  if (!context) {
    throw new Error(
      "useFarmerOrders must be used inside FarmerOrdersProvider"
    );
  }

  return context;
};