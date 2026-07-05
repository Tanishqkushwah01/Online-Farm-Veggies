const RecentOrders = () => {
  const orders = [
    {
      name: "Ramesh Patel",
      time: "Today, 10:30 AM",
      status: "Delivered",
      amount: "₹560",
    },
    {
      name: "Sneha Kapoor",
      time: "Today, 09:15 AM",
      status: "Processing",
      amount: "₹320",
    },
    {
      name: "Amit Singh",
      time: "Yesterday, 08:45 PM",
      status: "Delivered",
      amount: "₹750",
    },
    {
      name: "Priya Sharma",
      time: "Yesterday, 06:20 PM",
      status: "Shipped",
      amount: "₹480",
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">Recent Orders</h2>
        <button className="text-green-600 font-semibold">View All</button>
      </div>

      <div className="space-y-5">
        {orders.map((order, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">{order.name}</h3>
              <p className="text-sm text-gray-500">{order.time}</p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-600"
                  : order.status === "Processing"
                  ? "bg-orange-100 text-orange-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {order.status}
            </span>

            <p className="font-bold text-slate-900">{order.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;