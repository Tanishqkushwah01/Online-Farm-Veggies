import { Star, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";

const ReviewStats = () => {
  const stats = [
    {
      title: "Average Rating",
      value: "4.6",
      subtitle: "Based on 248 reviews",
      icon: <Star size={28} />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Reviews",
      value: "248",
      subtitle: "+32 this month",
      icon: <MessageSquare size={28} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Positive Reviews",
      value: "235",
      subtitle: "94.7% of total",
      icon: <ThumbsUp size={28} />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Negative Reviews",
      value: "13",
      subtitle: "5.3% of total",
      icon: <ThumbsDown size={28} />,
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-5 mt-6">
      {stats.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex items-center justify-between"
        >
          <div>
            <p className="text-gray-600 font-medium">{item.title}</p>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              {item.value}
            </h2>
            <p className="text-sm text-green-600 font-semibold mt-2">
              {item.subtitle}
            </p>
          </div>

          <div
            className={`h-14 w-14 rounded-full flex items-center justify-center ${item.color}`}
          >
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewStats;