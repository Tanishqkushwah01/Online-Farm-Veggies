// import StatsCards from "./StatsCards";
// import RecentOrders from "./RecentOrders";
// import HighestRatedProducts from "./HighestRatedProducts";
// import AddProductBanner from "./AddProductBanner";
// import ProductTable from "./ProductTable";
// import CustomerReviews from "./CustomerReviews";


// type DashboardProps = {
//   setActivePage: React.Dispatch<React.SetStateAction<string>>;
// };

// const Dashboard = ({ setActivePage }: DashboardProps) => {
//   return (
//     <div className="bg-gray-300 rounded-md p-6 min-h-full">
//       <div>
//         <h1 className="text-4xl font-bold text-black">Dashboard</h1>
//         <p className="text-white mt-3 text-lg">
//           Here's an overview of your farm performance.
//         </p>
//       </div>

//       {/* <StatsCards /> */}
//       <StatsCards setActivePage={setActivePage} />

//       <div className="grid grid-cols-2 gap-5 mt-5">
//         <RecentOrders setActivePage={setActivePage}/>
//         <HighestRatedProducts setActivePage={setActivePage}/>
//       </div>

//       <div className="mt-5">
//         <AddProductBanner />
//       </div>

//       <div className="mt-5">
//         <ProductTable setActivePage={setActivePage}/>
//       </div>

//       <div className="mt-5">
//         <CustomerReviews setActivePage={setActivePage}/>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


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
    <div className="min-h-full rounded-md bg-gray-300 p-4 transition-colors duration-200 sm:p-5 md:p-6 dark:bg-[#0f171f]">
      <div>
        <h1 className="text-3xl font-bold text-black sm:text-4xl dark:text-[#f5f7f8]">
          Dashboard
        </h1>

        <p className="mt-3 text-base text-gray-700 sm:text-lg dark:text-[#9aa7b1]">
          Here's an overview of your farm performance.
        </p>
      </div>

      <StatsCards setActivePage={setActivePage} />

      {/* Recent Orders + Highest Rated Products */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <RecentOrders setActivePage={setActivePage} />

        <HighestRatedProducts setActivePage={setActivePage} />
      </div>

      {/* Add Product */}
      <div className="mt-5">
        <AddProductBanner />
      </div>

      {/* Product Table */}
      <div className="mt-5 min-w-0">
        <ProductTable setActivePage={setActivePage} />
      </div>

      {/* Customer Reviews */}
      <div className="mt-5">
        <CustomerReviews setActivePage={setActivePage} />
      </div>
    </div>
  );
};

export default Dashboard;