import { Outlet } from "react-router-dom";
import { CustomerProductProvider } from "../../context/CustomerProductContext";
import { WishlistProvider } from "../../context/WishlistContext";
import { OrderProvider } from "../../context/OrderContext";
import { NotificationProvider } from "../../context/NotificationContext";
import { CustomerNavigationProvider } from "../../context/CustomerNavigationContext";
import { CustomerFarmerProductProvider } from "../../context/CustomerFarmerProductContext";

const CustomerLayout = () => {
  return (
    // <CustomerProductProvider>
    //   <WishlistProvider>
    //     <OrderProvider>
    //       <NotificationProvider>
    //         <Outlet />
    //       </NotificationProvider>
    //     </OrderProvider>
    //   </WishlistProvider>
    // </CustomerProductProvider>
    <CustomerNavigationProvider>
      <CustomerFarmerProductProvider>
        <CustomerProductProvider>
          <WishlistProvider>
            <OrderProvider>
              <NotificationProvider>
                <Outlet />
              </NotificationProvider>
            </OrderProvider>
          </WishlistProvider>
        </CustomerProductProvider>
        </CustomerFarmerProductProvider>
    </CustomerNavigationProvider>
  );
};

export default CustomerLayout;