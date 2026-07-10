import { Outlet } from "react-router-dom";
import { CustomerProductProvider } from "../../context/CustomerProductContext";
import { WishlistProvider } from "../../context/WishlistContext";
import { OrderProvider } from "../../context/OrderContext";
import { NotificationProvider } from "../../context/NotificationContext";

const CustomerLayout = () => {
  return (
    <CustomerProductProvider>
      <WishlistProvider>
        <OrderProvider>
          <NotificationProvider>
            <Outlet />
          </NotificationProvider>
        </OrderProvider>
      </WishlistProvider>
    </CustomerProductProvider>
  );
};

export default CustomerLayout;