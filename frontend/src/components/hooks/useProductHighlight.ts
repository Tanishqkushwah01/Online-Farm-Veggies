import { useContext } from "react";
import { ProductHighlightContext } from "../context/ProductHighlightContext";

export const useProductHighlight = () => {
  const context = useContext(ProductHighlightContext);

  if (!context) {
    throw new Error("useProductHighlight must be used inside ProductHighlightProvider");
  }

  return context;
};