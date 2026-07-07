import { Outlet } from "react-router-dom";
import { CustomerProductProvider } from "../../context/CustomerProductContext";

const CustomerLayout = () => {
  return (
    <CustomerProductProvider>
      <Outlet />
    </CustomerProductProvider>
  );
};

export default CustomerLayout;