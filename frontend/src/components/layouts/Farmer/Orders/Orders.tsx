import OrderStats from "./OrderStats";
import OrderFilters from "./OrderFilters";
import OrdersTable from "./OrdersTable";
import Pagination from "./Pagination";

const Orders = () => {
  return (
    <div className="bg-gray-300 rounded-md p-8 min-h-full">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Orders</h1>
        <p className="text-gray-600 mt-2 text-lg">
          Manage and track all customer orders.
        </p>
      </div>

      <OrderStats />

      <div className="mt-6 shadow-sm rounded-xl overflow-hidden">
        <OrderFilters />
        <OrdersTable />
        <Pagination />
      </div>
    </div>
  );
};

export default Orders;