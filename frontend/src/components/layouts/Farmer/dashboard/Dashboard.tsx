import StatsCards from "./StatsCards";
import RecentOrders from "./RecentOrders";
import HighestRatedProducts from "./HighestRatedProducts";
import AddProductBanner from "./AddProductBanner";
import ProductTable from "./ProductTable";
import CustomerReviews from "./CustomerReviews";


type DashboardProps = {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
};

const Dashboard = ({ setActivePage }: DashboardProps) => {
  return (
    <div className="bg-gray-300 rounded-md p-6 min-h-full">
      <div>
        <h1 className="text-4xl font-bold text-black">Dashboard</h1>
        <p className="text-white mt-3 text-lg">
          Here's an overview of your farm performance.
        </p>
      </div>

      {/* <StatsCards /> */}
      <StatsCards setActivePage={setActivePage} />

      <div className="grid grid-cols-2 gap-5 mt-5">
        <RecentOrders setActivePage={setActivePage}/>
        <HighestRatedProducts setActivePage={setActivePage}/>
      </div>

      <div className="mt-5">
        <AddProductBanner />
      </div>

      <div className="mt-5">
        <ProductTable setActivePage={setActivePage}/>
      </div>

      <div className="mt-5">
        <CustomerReviews setActivePage={setActivePage}/>
      </div>
    </div>
  );
};

export default Dashboard;