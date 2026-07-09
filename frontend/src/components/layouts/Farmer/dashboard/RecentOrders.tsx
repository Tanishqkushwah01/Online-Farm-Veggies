import { useFarmerOrders } from "../../../hooks/useFarmerOrders";

type RecentOrdersProps = {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
};

const RecentOrders = ({ setActivePage }: RecentOrdersProps) => {
  const { orders, loading } = useFarmerOrders();

  const statusClass = (status: string) => {
    if (status === "Delivered") return "bg-green-100 text-green-600";
    if (status === "Accepted") return "bg-blue-100 text-blue-600";
    if (status === "Pending") return "bg-orange-100 text-orange-600";
    if (status === "Rejected") return "bg-red-100 text-red-600";
    return "bg-gray-100 text-gray-600";
  };

  const displayStatus = (status: string) => {
    return status === "Accepted" ? "Processing" : status;
  };

  const formatDateTime = (value?: string) => {
    if (!value) return "-";

    const date = new Date(value);
    if (isNaN(date.getTime())) return "-";

    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const recentOrders = [...orders]
    .sort((a: any, b: any) => {
      const dateA = new Date(a.orderedOn || a.createdAt).getTime();
      const dateB = new Date(b.orderedOn || b.createdAt).getTime();
      return dateB - dateA;
    })
    .slice(0, 5);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">Recent Orders</h2>

        <button
          onClick={() => setActivePage("orders")}
          className="hover:text-green-600 text-green-400 font-semibold cursor-pointer"
        >
          View All
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading recent orders...</p>
      ) : recentOrders.length === 0 ? (
        <p className="text-gray-500">No recent orders found.</p>
      ) : (
        <div className="space-y-7">
          {recentOrders.map((order: any) => {
            const customerName =
              order.customerName ||
              order.customer ||
              order.customerId?.username ||
              order.customerId?.name ||
              "Unknown Customer";

            const status = order.orderStatus || order.status || "Pending";

            const amount =
              order.totalPrice || order.totalAmount || order.amount || 0;

            const time = formatDateTime(order.orderedOn || order.createdAt);

            return (
              <div
                key={order._id}
                className="flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {customerName}
                  </h3>
                  <p className="text-sm text-gray-500">{time}</p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClass(
                    status
                  )}`}
                >
                  {displayStatus(status)}
                </span>

                <p className="font-bold text-slate-900">₹{amount}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentOrders;