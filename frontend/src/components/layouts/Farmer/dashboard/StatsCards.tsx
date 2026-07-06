// import { Package, ShoppingBag, Clock, Users } from "lucide-react";
// import StatCard from "./StatCard";

// const StatsCards = () => {
//   const stats = [
//     {
//       title: "Total Products",
//       value: 32,
//       subtitle: "+5 new this week",
//       icon: <Package size={30} />,
//     },
//     {
//       title: "Total Orders",
//       value: 128,
//       subtitle: "+18 this week",
//       icon: <ShoppingBag size={30} />,
//     },
//     {
//       title: "Pending Orders",
//       value: 14,
//       subtitle: "View and manage",
//       icon: <Clock size={30} />,
//     },
//     {
//       title: "Total Customers",
//       value: 86,
//       subtitle: "+7 this week",
//       icon: <Users size={30} />,
//     },
//   ];

//   return (
//     <div className="grid grid-cols-4 gap-4 mt-6">
//       {stats.map((item) => (
//         <StatCard
//           key={item.title}
//           title={item.title}
//           value={item.value}
//           subtitle={item.subtitle}
//           icon={item.icon}
//         />
//       ))}
//     </div>
//   );
// };

// export default StatsCards;

import { useEffect, useState } from "react";
import { Package, ShoppingBag, Clock, Users } from "lucide-react";
import StatCard from "./StatCard";
import { getProductStats } from "../../../Api/farmerApi";

const StatsCards = () => {
  const [stats, setStats] = useState([
    {
      title: "Total Products",
      value: 0,
      subtitle: "+0 new this week",
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
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getProductStats();
        console.log("PRODUCT STATS ===>", res.data);

        if (res.data.success) {
          setStats((prev) => {
            const updated = [...prev];

            updated[0] = {
              ...updated[0],
              value: res.data.totalProducts,
              subtitle: `+${res.data.newThisWeek} new this week`,
            };

            return updated;
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchStats();
  }, []);

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