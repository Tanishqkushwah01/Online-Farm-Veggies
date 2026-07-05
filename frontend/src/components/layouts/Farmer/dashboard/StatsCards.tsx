import { Package, ShoppingBag, Clock, Users } from "lucide-react";
import StatCard from "./StatCard";

const StatsCards = () => {
  const stats = [
    {
      title: "Total Products",
      value: 32,
      subtitle: "+5 new this week",
      icon: <Package size={30} />,
    },
    {
      title: "Total Orders",
      value: 128,
      subtitle: "+18 this week",
      icon: <ShoppingBag size={30} />,
    },
    {
      title: "Pending Orders",
      value: 14,
      subtitle: "View and manage",
      icon: <Clock size={30} />,
    },
    {
      title: "Total Customers",
      value: 86,
      subtitle: "+7 this week",
      icon: <Users size={30} />,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mt-6">
      {stats.map((item) => (
        <StatCard
          key={item.title}
          title={item.title}
          value={item.value}
          subtitle={item.subtitle}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default StatsCards;