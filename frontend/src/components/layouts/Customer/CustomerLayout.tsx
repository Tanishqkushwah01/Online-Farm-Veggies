import { Outlet } from "react-router-dom";
import { CustomerProductProvider } from "../../context/CustomerProductContext";
import { WishlistProvider } from "../../context/WishlistContext";

const CustomerLayout = () => {
  return (
    <CustomerProductProvider>
      <WishlistProvider>
        <Outlet />
      </WishlistProvider>
    </CustomerProductProvider>
  );
};

export default CustomerLayout;