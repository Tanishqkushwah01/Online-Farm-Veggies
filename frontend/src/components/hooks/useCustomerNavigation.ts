import { useContext } from "react";
import { CustomerNavigationContext } from "../context/CustomerNavigationContext";

export const useCustomerNavigation = () => {
  const context = useContext(CustomerNavigationContext);

  if (!context) {
    throw new Error(
      "useCustomerNavigation must be used inside CustomerNavigationProvider"
    );
  }

  return context;
};