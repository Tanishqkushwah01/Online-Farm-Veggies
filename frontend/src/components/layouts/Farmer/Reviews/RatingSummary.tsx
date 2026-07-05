import { Star, Sprout, Truck, PackageCheck } from "lucide-react";

const RatingSummary = () => {
  const ratings = [
    { star: 5, count: 156, percent: 62 },
    { star: 4, count: 62, percent: 25 },
    { star: 3, count: 18, percent: 7 },
    { star: 2, count: 7, percent: 3 },
    { star: 1, count: 5, percent: 2 },
  ];

  const loveItems = [
    {
      title: "Fresh & Quality Products",
      desc: "Most customers praise freshness and quality.",
      icon: <Sprout size={22} />,
    },
    {
      title: "Fast Delivery",
      desc: "Quick and timely delivery service.",
      icon: <Truck size={22} />,
    },
    {
      title: "Good Packaging",
      desc: "Products are well packed and safe.",
      icon: <PackageCheck size={22} />,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-5 mt-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-slate-900 mb-5">
          Rating Distribution
        </h2>

        <div className="space-y-4">
          {ratings.map((item) => (
            <div key={item.star} className="flex items-center gap-4">
              <div className="w-16 flex items-center gap-1">
                <span>{item.star}</span>
                <Star size={16} className="text-yellow-500" fill="currentColor" />
              </div>

              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-600 rounded-full"
                  style={{ width: `${item.percent}%` }}
                />
              </div>

              <p className="w-24 text-right text-gray-600">
                {item.count} ({item.percent}%)
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-slate-900 mb-5">
          What Customers Love
        </h2>

        <div className="space-y-5">
          {loveItems.map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                {item.icon}
              </div>

              <div>
                <h3 className="font-bold text-slate-900">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingSummary;