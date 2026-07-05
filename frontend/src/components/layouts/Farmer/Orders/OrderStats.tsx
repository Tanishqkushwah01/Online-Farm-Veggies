import { ShoppingBag, Clock, RefreshCcw, CheckCircle } from "lucide-react";

const OrderStats = () => {
  const stats = [
    {
      title: "Total Orders",
      value: 128,
      subtitle: "+18 this week",
      icon: <ShoppingBag size={28} />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Pending Orders",
      value: 14,
      subtitle: "+3 this week",
      icon: <Clock size={28} />,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Processing Orders",
      value: 28,
      subtitle: "+8 this week",
      icon: <RefreshCcw size={28} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Delivered Orders",
      value: 86,
      subtitle: "+12 this week",
      icon: <CheckCircle size={28} />,
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-5 mt-6">
      {stats.map((item) => (
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
            <h2 className="text-3xl font-bold text-slate-900">{item.value}</h2>
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