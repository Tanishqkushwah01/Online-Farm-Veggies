// import { Star, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";

// const ReviewStats = () => {
//   const stats = [
//     {
//       title: "Average Rating",
//       value: "4.6",
//       subtitle: "Based on 248 reviews",
//       icon: <Star size={28} />,
//       color: "bg-green-100 text-green-600",
//     },
//     {
//       title: "Total Reviews",
//       value: "248",
//       subtitle: "+32 this month",
//       icon: <MessageSquare size={28} />,
//       color: "bg-blue-100 text-blue-600",
//     },
//     {
//       title: "Positive Reviews",
//       value: "235",
//       subtitle: "94.7% of total",
//       icon: <ThumbsUp size={28} />,
//       color: "bg-green-100 text-green-600",
//     },
//     {
//       title: "Negative Reviews",
//       value: "13",
//       subtitle: "5.3% of total",
//       icon: <ThumbsDown size={28} />,
//       color: "bg-red-100 text-red-600",
//     },
//   ];

//   return (
//     <div className="grid grid-cols-4 gap-5 mt-6">
//       {stats.map((item) => (
//         <div
//           key={item.title}
//           className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex items-center justify-between"
//         >
//           <div>
//             <p className="text-gray-600 font-medium">{item.title}</p>
//             <h2 className="text-3xl font-bold text-slate-900 mt-2">
//               {item.value}
//             </h2>
//             <p className="text-sm text-green-600 font-semibold mt-2">
//               {item.subtitle}
//             </p>
//           </div>

//           <div
//             className={`h-14 w-14 rounded-full flex items-center justify-center ${item.color}`}
//           >
//             {item.icon}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ReviewStats;

import { useEffect, useState } from "react";
import {
  Star,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { getFarmerReviewStats } from "../../../Api/farmerApi";

type ReviewStatsProps = {
  reviewType: "customer" | "product";
};

const ReviewStats = ({ reviewType }: ReviewStatsProps) => {
  const [statsData, setStatsData] = useState({
    averageRating: 0,
    totalReviews: 0,
    positiveReviews: 0,
    negativeReviews: 0,
  });

  const fetchReviewStats = async () => {
    try {
      const response = await getFarmerReviewStats(reviewType);

      if (response.data.success) {
        setStatsData(response.data.stats);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReviewStats();
  }, [reviewType]);

  const positivePercent =
    statsData.totalReviews === 0
      ? 0
      : ((statsData.positiveReviews / statsData.totalReviews) * 100).toFixed(1);

  const negativePercent =
    statsData.totalReviews === 0
      ? 0
      : ((statsData.negativeReviews / statsData.totalReviews) * 100).toFixed(1);

  const stats = [
    {
      title:
        reviewType === "product"
          ? "Average Product Rating"
          : "Average Farmer Rating",
      value: statsData.averageRating,
      subtitle: `Based on ${statsData.totalReviews} reviews`,
      icon: <Star size={28} />,
      color: "bg-green-100 text-green-600",
    },
    {
      title:
        reviewType === "product"
          ? "Product Reviews"
          : "Farmer Reviews",
      value: statsData.totalReviews,
      subtitle: "Total reviews",
      icon: <MessageSquare size={28} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Positive Reviews",
      value: statsData.positiveReviews,
      subtitle: `${positivePercent}% of total`,
      icon: <ThumbsUp size={28} />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Negative Reviews",
      value: statsData.negativeReviews,
      subtitle: `${negativePercent}% of total`,
      icon: <ThumbsDown size={28} />,
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="mt-6 grid grid-cols-4 gap-5">
      {stats.map((item) => (
        <div
          key={item.title}
          className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div>
            <p className="font-medium text-gray-600">{item.title}</p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {item.value}
            </h2>

            <p className="mt-2 text-sm font-semibold text-green-600">
              {item.subtitle}
            </p>
          </div>

          <div
            className={`flex h-14 w-14 items-center justify-center rounded-full ${item.color}`}
          >
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewStats;