import { Outlet } from "react-router-dom";
import { ProductProvider } from "../../context/FarmerProductContext";
import { ProductHighlightProvider } from "../../context/ProductHighlightContext";
import { FarmerOrdersProvider } from "../../context/FarmerOrdersContext";
import { NotificationProvider } from "../../context/NotificationContext";

const FarmerLayout = () => {
  return (
    <ProductProvider>
      <FarmerOrdersProvider>
        <NotificationProvider>
          <ProductHighlightProvider>
            <Outlet />
          </ProductHighlightProvider>
        </NotificationProvider>
      </FarmerOrdersProvider>
    </ProductProvider>
  );
};

export default FarmerLayout;