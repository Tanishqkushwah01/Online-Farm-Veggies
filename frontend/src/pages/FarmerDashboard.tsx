import { useEffect, useState } from "react";

import Header from "../components/layouts/Farmer/Header";
import Sidebar from "../components/layouts/Farmer/Sidebar";
import Settings from "../components/Settings/Settings";
import ChangePassword from "../components/Settings/ChangePassword";
import DeleteAccount from "../components/Settings/DeleteParmanentCard";

import Dashboard from "../components/layouts/Farmer/dashboard/Dashboard";
import Products from "../components/layouts/Farmer/Products/Products";
import Orders from "../components/layouts/Farmer/Orders/Orders";
import Reviews from "../components/layouts/Farmer/Reviews/Reviews";

import { ProductProvider } from "../components/context/FarmerProductContext";

const FarmerDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [highlightProductId, setHighlightProductId] = useState<string | null>(null);

  const handleProductClick = (productId: string) => {
    setActivePage("products");
    setHighlightProductId(productId);

    setTimeout(() => {
      document.getElementById("product-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);

    setTimeout(() => {
      setHighlightProductId(null);
    }, 2500);
  };
  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("userInfo") || "{}");

    if (info?.isProfileCompleted === false) {
      setActivePage("settings");
    }
  }, []);

  if (activePage === "changePassword") {
    return <ChangePassword setActivePage={setActivePage} />;
  }

  if (activePage === "DeleteAccount") {
    return <DeleteAccount />;
  }

  return (
    <div className="h-screen w-screen overflow-hidden border-10 border-white">
      <div className="h-full w-full flex rounded-md bg-[#F1F1F1] overflow-hidden">

        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
        />

        <ProductProvider>
          <div className="flex-1 flex flex-col">

            <Header username="Tanishq kushwah" />

            <main className="flex-1 bg-gray-300 p-6 overflow-auto rounded-md no-scrollbar">

              {activePage === "dashboard" && <Dashboard setActivePage={setActivePage} />}

              {/* {activePage === "products" && <Products />} */}
              {activePage === "products" && (
                <Products highlightProductId={highlightProductId} />
              )}

              {activePage === "reviews" && (
                <Reviews onProductClick={handleProductClick} />
              )}

              {activePage === "orders" && <Orders />}

              {/* {activePage === "reviews" && <Reviews />} */}

              {activePage === "settings" && (
                <Settings setActivePage={setActivePage} />
              )}

            </main>

          </div>
        </ProductProvider>

      </div>
    </div>
  );
};

export default FarmerDashboard;