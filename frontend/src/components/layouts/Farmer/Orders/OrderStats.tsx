import { ShoppingBag, Clock, RefreshCcw, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getOrderStats } from "../../../Api/farmerApi";

type StatsType = {
  totalOrders: number;
  pendingOrders: number;
  acceptedOrders: number;
  deliveredOrders: number;

  totalOrdersThisWeek: number;
  pendingOrdersThisWeek: number;
  acceptedOrdersThisWeek: number;
  deliveredOrdersThisWeek: number;
};

const OrderStats = () => {
  const [stats, setStats] = useState<StatsType>({
    totalOrders: 0,
    pendingOrders: 0,
    acceptedOrders: 0,
    deliveredOrders: 0,

    totalOrdersThisWeek: 0,
    pendingOrdersThisWeek: 0,
    acceptedOrdersThisWeek: 0,
    deliveredOrdersThisWeek: 0,
  });

  const fetchStats = async () => {
    try {
      const response = await getOrderStats();

      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const cards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      subtitle: `+${stats.totalOrdersThisWeek} this week`,
      icon: <ShoppingBag size={28} />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      subtitle: `+${stats.pendingOrdersThisWeek} this week`,
      icon: <Clock size={28} />,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Processing Orders",
      value: stats.acceptedOrders,
      subtitle: `+${stats.acceptedOrdersThisWeek} this week`,
      icon: <RefreshCcw size={28} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Delivered Orders",
      value: stats.deliveredOrders,
      subtitle: `+${stats.deliveredOrdersThisWeek} this week`,
      icon: <CheckCircle size={28} />,
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-5 mt-6">
      {cards.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex items-center gap-5"
        >
          <div
            className={`h-14 w-14 rounded-full flex items-center justify-center ${item.color}`}
          >
            {item.icon}
          </div>

          <div>
            <p className="text-gray-600 font-medium">{item.title}</p>

            <h2 className="text-3xl font-bold text-slate-900">
              {item.value}
            </h2>

            <p className="text-sm text-green-600 font-semibold mt-1">
              {item.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStats;