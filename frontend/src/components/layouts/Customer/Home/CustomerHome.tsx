import { useEffect, useState } from "react";
import PrivacyPolicy from "./PrivacyPolicy";
import Header from "./CustomerHeader";
import Settings from "../../../Settings/Settings";
import ChangePassword from "../../../Settings/ChangePassword";
import DeleteAccount from "../../../Settings/DeleteParmanentCard";
import HelpSupport from "./Help&Support";
import Notifications from "./Notifications";
import Wishlist from "./Wishlist";
import Orders from "./Orders";
import Navbar from "./Navbar";
import Slider from "./Slider";
import BestProducts from "./BestSelling";
import ReviewSection from "./ReviewSection";
import Footer from "./Footer";
// import HeroSection from "./HeroSection";
// import CategorySection from "./CategorySection";
// import BestSelling from "./BestSelling";
// import HeroSlider from "./HeroSection";

const CustomerHome = () => {
  const [activePage, setActivePage] = useState("home");
  const [filterOpen, setFilterOpen] = useState(false);
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
  console.log(activePage);

  return (
    <div className="min-h-screen bg-[#F5F7F5]">

      {["home", "wishlist", "orders"].includes(activePage) && (
        <>
          <Header
            setActivePage={setActivePage}
            onFilterClick={() => setFilterOpen((prev) => !prev)}
          />

          <Navbar filterOpen={filterOpen} setFilterOpen={setFilterOpen} />
        </>
      )}
      {activePage === "home" && (
        <div className="space-y-8 p-8">
          <Slider />
          <BestProducts />
          <ReviewSection />
          <Footer />
        </div>
      )}


      {activePage === "settings" && <Settings setActivePage={setActivePage} />}
      {activePage === "orders" && <Orders setActivePage={setActivePage} />}
      {activePage === "wishlist" && <Wishlist setActivePage={setActivePage} />}
      {activePage === "notifications" && <Notifications setActivePage={setActivePage} />}
      {activePage === "privacy" && <PrivacyPolicy setActivePage={setActivePage} />}
      {activePage === "help" && <HelpSupport setActivePage={setActivePage} />}
    </div>
  );
};

export default CustomerHome;