import { useContext } from "react";
import { ProductContext } from "../context/FarmerProductContext";

export const useFarmerProducts = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts must be used inside ProductProvider");
  }

  return context;
};