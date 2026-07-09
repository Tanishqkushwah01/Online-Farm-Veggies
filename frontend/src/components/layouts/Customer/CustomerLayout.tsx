import { Outlet } from "react-router-dom";
import { CustomerProductProvider } from "../../context/CustomerProductContext";
import { WishlistProvider } from "../../context/WishlistContext";
import { OrderProvider } from "../../context/OrderContext";

const CustomerLayout = () => {
  return (
    <CustomerProductProvider>
      <WishlistProvider>
        <OrderProvider>
          <Outlet />
        </OrderProvider>
      </WishlistProvider>
    </CustomerProductProvider>
  );
};

export default CustomerLayout;