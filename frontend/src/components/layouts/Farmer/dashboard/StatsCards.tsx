import { useEffect, useState } from "react";
import { Package, ShoppingBag, Clock, Users } from "lucide-react";
import StatCard from "./StatCard";
import { getDashboardStats } from "../../../Api/farmerApi";

type Props = {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
};

const StatsCards = ({ setActivePage }: Props) => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    newProductsThisWeek: 0,
    totalOrders: 0,
    ordersThisWeek: 0,
    pendingOrders: 0,
    totalCustomers: 0,
    customersThisWeek: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();

        if (res.data.success) {
          setStats(res.data.stats);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      subtitle: `+${stats.newProductsThisWeek} new this week`,
      icon: <Package size={30} />,
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      subtitle: `+${stats.ordersThisWeek} this week`,
      icon: <ShoppingBag size={30} />,
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      subtitle: "View and manage",
      icon: <Clock size={30} />,
      onClick: () => setActivePage("orders"),
    },
    {
      title: "Total Customers",
      value: stats.totalCustomers,
      subtitle: `+${stats.customersThisWeek} this week`,
      icon: <Users size={30} />,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mt-6">
      {cards.map((item) => (
        <StatCard
          key={item.title}
          title={item.title}
          value={item.value}
          subtitle={item.subtitle}
          icon={item.icon}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
};

export default StatsCards;