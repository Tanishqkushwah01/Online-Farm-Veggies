import Header from "../components/layouts/Farmer/Header";
import ProductCard from "../components/layouts/Farmer/ProductCard";
import Sidebar from "../components/layouts/Farmer/Sidebar";

const FarmerDashboard = () => {
  return (
    <div className="h-screen w-screen overflow-hidden border-10 border-white">
      <div className="h-full w-full flex rounded-md bg-[#F1F1F1] overflow-hidden">

        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Header username="Tanishq kushwah" />

          <main className="flex-1 bg-green-600 p-6 overflow-auto">
            <div className="flex flex-col gap-4">
              <ProductCard product="hi" onDelete="fds" />
              <ProductCard product="hi" onDelete="fds" />
              <ProductCard product="hi" onDelete="fds" />
            </div>
          </main>
        </div>

      </div>
    </div>
  );
};

export default FarmerDashboard;