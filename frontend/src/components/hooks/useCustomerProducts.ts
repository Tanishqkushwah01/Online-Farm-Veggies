import { useContext } from "react";
import { CustomerProductContext } from "../context/CustomerProductContext";

export const useCustomerProducts = () => {
  const context = useContext(CustomerProductContext);

  if (!context) {
    throw new Error(
      "useCustomerProducts must be used inside CustomerProductProvider"
    );
  }

  return context;
};