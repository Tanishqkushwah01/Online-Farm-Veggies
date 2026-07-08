// import { Star, Sprout, Truck, PackageCheck } from "lucide-react";

// const RatingSummary = () => {
//   const ratings = [
//     { star: 5, count: 156, percent: 62 },
//     { star: 4, count: 62, percent: 25 },
//     { star: 3, count: 18, percent: 7 },
//     { star: 2, count: 7, percent: 3 },
//     { star: 1, count: 5, percent: 2 },
//   ];

//   const loveItems = [
//     {
//       title: "Fresh & Quality Products",
//       desc: "Most customers praise freshness and quality.",
//       icon: <Sprout size={22} />,
//     },
//     {
//       title: "Fast Delivery",
//       desc: "Quick and timely delivery service.",
//       icon: <Truck size={22} />,
//     },
//     {
//       title: "Good Packaging",
//       desc: "Products are well packed and safe.",
//       icon: <PackageCheck size={22} />,
//     },
//   ];

//   return (
//     <div className="grid grid-cols-2 gap-5 mt-6">
//       <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
//         <h2 className="text-xl font-bold text-slate-900 mb-5">
//           Rating Distribution
//         </h2>

//         <div className="space-y-4">
//           {ratings.map((item) => (
//             <div key={item.star} className="flex items-center gap-4">
//               <div className="w-16 flex items-center gap-1">
//                 <span>{item.star}</span>
//                 <Star size={16} className="text-yellow-500" fill="currentColor" />
//               </div>

//               <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
//                 <div
//                   className="h-full bg-green-600 rounded-full"
//                   style={{ width: `${item.percent}%` }}
//                 />
//               </div>

//               <p className="w-24 text-right text-gray-600">
//                 {item.count} ({item.percent}%)
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
//         <h2 className="text-xl font-bold text-slate-900 mb-5">
//           What Customers Love
//         </h2>

//         <div className="space-y-5">
//           {loveItems.map((item) => (
//             <div key={item.title} className="flex items-start gap-4">
//               <div className="h-12 w-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
//                 {item.icon}
//               </div>

//               <div>
//                 <h3 className="font-bold text-slate-900">{item.title}</h3>
//                 <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RatingSummary;

import { useEffect, useState } from "react";
import {
  Star,
  Sprout,
  Truck,
  PackageCheck,
} from "lucide-react";
import {
  getRatingDistribution,
} from "../../../Api/farmerApi";

type RatingSummaryProps = {
  reviewType: "customer" | "product";
};

type Distribution = {
  total: number;
  fiveStar: number;
  fourStar: number;
  threeStar: number;
  twoStar: number;
  oneStar: number;
};

const RatingSummary = ({ reviewType }: RatingSummaryProps) => {
  const [distribution, setDistribution] = useState<Distribution>({
    total: 0,
    fiveStar: 0,
    fourStar: 0,
    threeStar: 0,
    twoStar: 0,
    oneStar: 0,
  });

  const fetchDistribution = async () => {
    try {
      const response = await getRatingDistribution(reviewType);

      if (response.data.success) {
        setDistribution(response.data.distribution);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDistribution();
  }, [reviewType]);

  const ratings = [
    {
      star: 5,
      count: distribution.fiveStar,
    },
    {
      star: 4,
      count: distribution.fourStar,
    },
    {
      star: 3,
      count: distribution.threeStar,
    },
    {
      star: 2,
      count: distribution.twoStar,
    },
    {
      star: 1,
      count: distribution.oneStar,
    },
  ];

  const loveItems = [
    {
      title: "Fresh & Quality Products",
      desc: "Most customers appreciate freshness and premium quality.",
      icon: <Sprout size={22} />,
    },
    {
      title: "Fast Delivery",
      desc: "Orders are delivered quickly and on time.",
      icon: <Truck size={22} />,
    },
    {
      title: "Secure Packaging",
      desc: "Products arrive safely with proper packaging.",
      icon: <PackageCheck size={22} />,
    },
  ];

  return (
    <div className="mt-6 grid grid-cols-2 gap-5">
      {/* Rating Distribution */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-bold text-slate-900">
          Rating Distribution
        </h2>

        <div className="space-y-4">
          {ratings.map((item) => {
            const percent =
              distribution.total === 0
                ? 0
                : ((item.count / distribution.total) * 100).toFixed(0);

            return (
              <div
                key={item.star}
                className="flex items-center gap-4"
              >
                <div className="flex w-16 items-center gap-1">
                  <span>{item.star}</span>

                  <Star
                    size={16}
                    className="text-yellow-500"
                    fill="currentColor"
                  />
                </div>

                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-green-600 transition-all duration-500"
                    style={{
                      width: `${percent}%`,
                    }}
                  />
                </div>

                <p className="w-24 text-right text-gray-600">
                  {item.count} ({percent}%)
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Customer Love */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-bold text-slate-900">
          What Customers Love
        </h2>

        <div className="space-y-5">
          {loveItems.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                {item.icon}
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingSummary;