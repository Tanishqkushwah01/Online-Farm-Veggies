import { Outlet } from "react-router-dom";
import { ProductProvider } from "../../context/FarmerProductContext";
import { ProductHighlightProvider } from "../../context/ProductHighlightContext";
import { FarmerOrdersProvider } from "../../context/FarmerOrdersContext";

const FarmerLayout = () => {
  return (
    <ProductProvider>
      <FarmerOrdersProvider>
      <ProductHighlightProvider>

        <Outlet />
      </ProductHighlightProvider>
      </FarmerOrdersProvider>
    </ProductProvider>
  );
};

export default FarmerLayout;