// import { useEffect, useState } from "react";

// import Header from "../components/layouts/Farmer/Header";
// import Sidebar from "../components/layouts/Farmer/Sidebar";
// import Settings from "../components/Settings/Settings";
// import ChangePassword from "../components/Settings/ChangePassword";
// import DeleteAccount from "../components/Settings/DeleteParmanentCard";

// import Dashboard from "../components/layouts/Farmer/dashboard/Dashboard";
// import Products from "../components/layouts/Farmer/Products/Products";
// import Orders from "../components/layouts/Farmer/Orders/Orders";
// import Reviews from "../components/layouts/Farmer/Reviews/Reviews";
// import NotificationsPage from "../components/layouts/Farmer/Notifications/NotificationsPage";

// const FarmerDashboard = () => {
//   const [activePage, setActivePage] = useState("dashboard");

//   useEffect(() => {
//     const info = JSON.parse(localStorage.getItem("userInfo") || "{}");

//     if (info?.isProfileCompleted === false) {
//       setActivePage("settings");
//     }
//   }, []);

//   if (activePage === "changePassword") {
//     return <ChangePassword setActivePage={setActivePage} />;
//   }

//   if (activePage === "DeleteAccount") {
//     return <DeleteAccount setActivePage={setActivePage}/>;
//   }

//   if(activePage === "notifications"){
//     return <NotificationsPage setActivePage={setActivePage}/>
//   }

//   return (
//     <div className="h-screen w-screen overflow-hidden border-10 border-white">
//       <div className="h-full w-full flex rounded-md bg-[#F1F1F1] overflow-hidden">
//         <Sidebar activePage={activePage} setActivePage={setActivePage} />

//         <div className="flex-1 flex flex-col">
//           <Header username="Tanishq kushwah" setActivePage={setActivePage}/>

//           <main className="flex-1 bg-gray-300 p-6 overflow-auto rounded-md no-scrollbar">
//             {activePage === "dashboard" && (
//               <Dashboard setActivePage={setActivePage} />
//             )}

//             {activePage === "products" && <Products />}

//             {activePage === "reviews" && (
//               <Reviews setActivePage={setActivePage} />
//             )}

//             {activePage === "orders" && <Orders />}

//             {activePage === "settings" && (
//               <Settings setActivePage={setActivePage} />
//             )}
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FarmerDashboard;

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
import NotificationsPage from "../components/layouts/Farmer/Notifications/NotificationsPage";

const FarmerDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");

  // Controls mobile sidebar drawer
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("userInfo") || "{}");

    if (info?.isProfileCompleted === false) {
      setActivePage("settings");
    }
  }, []);

  // Close mobile sidebar whenever page changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [activePage]);

  if (activePage === "changePassword") {
    return <ChangePassword setActivePage={setActivePage} />;
  }

  if (activePage === "DeleteAccount") {
    return <DeleteAccount setActivePage={setActivePage} />;
  }

  if (activePage === "notifications") {
    return (
      <NotificationsPage setActivePage={setActivePage} />
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden border-10 border-white transition-colors duration-200 dark:border-[#0d151b]">
      <div className="relative flex h-full w-full overflow-hidden rounded-md bg-[#F1F1F1] transition-colors duration-200 dark:bg-[#141c23]">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] lg:hidden"
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-50
            w-72
            transform
            transition-transform
            duration-300
            ease-in-out
            lg:relative
            lg:z-0
            lg:flex
            lg:w-auto
            lg:translate-x-0
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <Sidebar
            activePage={activePage}
            setActivePage={setActivePage}
            setSidebarOpen={setSidebarOpen}
          />
        </aside>

        {/* Main application area */}
        <div className="flex min-w-0 flex-1 flex-col">
          <Header
            username="Tanishq kushwah"
            setActivePage={setActivePage}
            onMenuClick={() => setSidebarOpen(true)}
          />

          <main className="no-scrollbar min-w-0 flex-1 overflow-auto rounded-md bg-gray-300 p-4 transition-colors duration-200 sm:p-5 md:p-6 lg:p-7 xl:p-8 dark:bg-[#0f171f]">
            <div className="mx-auto w-full min-w-0 max-w-[1920px]">
              {activePage === "dashboard" && (
                <Dashboard setActivePage={setActivePage} />
              )}

              {activePage === "products" && <Products />}

              {activePage === "reviews" && (
                <Reviews setActivePage={setActivePage} />
              )}

              {activePage === "orders" && <Orders />}

              {activePage === "settings" && (
                <Settings setActivePage={setActivePage} />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;