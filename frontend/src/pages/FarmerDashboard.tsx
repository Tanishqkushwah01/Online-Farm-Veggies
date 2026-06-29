import Header from "../components/layouts/Farmer/Header";
import Sidebar from "../components/layouts/Farmer/Sidebar";
import { useEffect, useState } from "react";
import Settings from "../components/layouts/Farmer/Settings";
import ChangePassword from "../components/layouts/Farmer/ChangePassword";
import DeleteAccount from "../components/layouts/Farmer/DeleteParmanentCard";

const FarmerDashboard = () => {

  useEffect(()=>{
    const info =  JSON.parse(localStorage.getItem("userInfo")!);
    if(!info.isProfileCompleted){
      setActivePage("settings")
    }
  },[])
  const [activePage, setActivePage] = useState("dashboard");
  if (activePage === "changePassword") {
    return <ChangePassword setActivePage={setActivePage} />;
  }
  if (activePage === "DeleteAccount") {
    return <DeleteAccount />
  }
  return (
    <div className="h-screen w-screen overflow-hidden border-10 border-white">
      <div className="h-full w-full flex rounded-md bg-[#F1F1F1] overflow-hidden">

        {/* <Sidebar /> */}
        <Sidebar setActivePage={setActivePage} />

        <div className="flex-1 flex flex-col">
          <Header username="Tanishq kushwah" />



          {/* <main className="flex-1 bg-green-600 p-6 overflow-auto rounded-md no-scrollbar">
             {activePage === "dashboard" && <Dashboard />}
          {activePage === "products" && <Products />}
          {activePage === "orders" && <Orders />} 
            {activePage === "Settings" && <Settings />}
            <Settings />

            <div className="grid grid-cols-4 gap-4">
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
            </div> 
          </main> */}


          <main className="flex-1 bg-green-600 p-6 overflow-auto rounded-md no-scrollbar">
            {/* {activePage === "dashboard" && <DashboardHome />} */}
            {activePage === "settings" && (
              <Settings setActivePage={setActivePage} />
            )}
          </main>
        </div>

      </div>
    </div>
  );
};

export default FarmerDashboard;