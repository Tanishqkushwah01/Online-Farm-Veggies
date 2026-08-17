// import { useMemo, useState } from "react";
// import OrderStats from "./OrderStats";
// import OrderFilters from "./OrderFilters";
// import OrdersTable from "./OrdersTable";
// // import Pagination from "./Pagination";
// import { useFarmerOrders } from "../../../hooks/useFarmerOrders";

// const Orders = () => {
//   const { orders, loading,fetchOrders  } = useFarmerOrders();

//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("All Status");
//   const [dateFilter, setDateFilter] = useState("All Date");

// const filteredOrders = useMemo(() => {
//   return orders.filter((order: any) => {
//     const value = search.toLowerCase().trim();

//     const customerName =
//       order.customerName ||
//       order.customer ||
//       order.customerId?.username ||
//       order.customerId?.name ||
//       "";

//     const productName =
//       order.productName ||
//       order.product?.productName ||
//       order.productId?.productName ||
//       "";

//     const matchSearch =
//       !value ||
//       order.orderCode?.toLowerCase().includes(value) ||
//       customerName.toLowerCase().includes(value) ||
//       productName.toLowerCase().includes(value);

//     const matchStatus =
//       status === "All Status" ||
//       order.orderStatus?.toLowerCase() === status.toLowerCase();

//     const orderDate = new Date(order.orderedOn || order.createdAt);
//     const today = new Date();

//     let matchDate = true;

//     if (dateFilter === "Today") {
//       matchDate = orderDate.toDateString() === today.toDateString();
//     }

//     if (dateFilter === "This Week") {
//       const startOfWeek = new Date(today);
//       startOfWeek.setDate(today.getDate() - today.getDay());
//       startOfWeek.setHours(0, 0, 0, 0);

//       matchDate = orderDate >= startOfWeek;
//     }

//     if (dateFilter === "This Month") {
//       matchDate =
//         orderDate.getMonth() === today.getMonth() &&
//         orderDate.getFullYear() === today.getFullYear();
//     }

//     return matchSearch && matchStatus && matchDate;
//   });
// }, [orders, search, status, dateFilter]);

//   return (
//     <div className="min-h-full rounded-md bg-gray-300 p-8">
//       <div>
//         <h1 className="text-4xl font-bold text-slate-900">Orders</h1>
//         <p className="mt-2 text-lg text-gray-600">
//           Manage and track all customer orders.
//         </p>
//       </div>

//       <OrderStats />

//       <OrderFilters
//         search={search}
//         setSearch={setSearch}
//         status={status}
//         setStatus={setStatus}
//         dateFilter={dateFilter}
//         setDateFilter={setDateFilter}
//       />

//       <div className="mt-6 overflow-hidden rounded-xl shadow-sm">
//         <OrdersTable
//           orders={filteredOrders}
//           loading={loading}
//           fetchOrders={fetchOrders}
//         />

//         {/* <Pagination /> */}
//       </div>
//     </div>
//   );
// };

// export default Orders;


import { useMemo, useState } from "react";
import OrderStats from "./OrderStats";
import OrderFilters from "./OrderFilters";
import OrdersTable from "./OrdersTable";
import { useFarmerOrders } from "../../../hooks/useFarmerOrders";

const Orders = () => {
  const {
    orders,
    loading,
    fetchOrders,
  } = useFarmerOrders();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [dateFilter, setDateFilter] = useState("All Date");

  const filteredOrders = useMemo(() => {
    return orders.filter((order: any) => {
      const value = search.toLowerCase().trim();

      const customerName =
        order.customerName ||
        order.customer ||
        order.customerId?.username ||
        order.customerId?.name ||
        "";

      const productName =
        order.productName ||
        order.product?.productName ||
        order.productId?.productName ||
        "";

      const matchSearch =
        !value ||
        order.orderCode?.toLowerCase().includes(value) ||
        customerName.toLowerCase().includes(value) ||
        productName.toLowerCase().includes(value);

      const matchStatus =
        status === "All Status" ||
        order.orderStatus?.toLowerCase() === status.toLowerCase();

      const orderDate = new Date(
        order.orderedOn || order.createdAt
      );

      const today = new Date();

      let matchDate = true;

      if (dateFilter === "Today") {
        matchDate =
          orderDate.toDateString() === today.toDateString();
      }

      if (dateFilter === "This Week") {
        const startOfWeek = new Date(today);

        startOfWeek.setDate(
          today.getDate() - today.getDay()
        );

        startOfWeek.setHours(0, 0, 0, 0);

        matchDate = orderDate >= startOfWeek;
      }

      if (dateFilter === "This Month") {
        matchDate =
          orderDate.getMonth() === today.getMonth() &&
          orderDate.getFullYear() === today.getFullYear();
      }

      return matchSearch && matchStatus && matchDate;
    });
  }, [orders, search, status, dateFilter]);

  return (
    <div className="min-h-full rounded-md bg-gray-300 p-4 transition-colors duration-200 sm:p-5 md:p-6 lg:p-8 dark:bg-[#0f171f]">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-[#f5f7f8]">
          Orders
        </h1>

        <p className="mt-2 text-base text-gray-600 sm:text-lg dark:text-[#9aa7b1]">
          Manage and track all customer orders.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-5 min-w-0">
        <OrderStats />
      </div>

      {/* Filters */}
      <div className="min-w-0">
        <OrderFilters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />
      </div>

      {/* Orders Table */}
      <div className="mt-6 min-w-0 overflow-hidden rounded-xl shadow-sm">
        <OrdersTable
          orders={filteredOrders}
          loading={loading}
          fetchOrders={fetchOrders}
        />

        {/* <Pagination /> */}
      </div>
    </div>
  );
};

export default Orders;