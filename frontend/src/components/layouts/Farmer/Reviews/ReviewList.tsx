// import { MessageCircle, Star } from "lucide-react";
// import { reviews } from "./dummyData";

// const ReviewList = () => {
//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-4 overflow-hidden">
//       {reviews.map((item) => (
//         <div
//           key={item.id}
//           className="p-6 border-b border-gray-200 last:border-none flex items-start gap-5"
//         >
//           <div className="h-14 w-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xl">
//             {item.customer.charAt(0)}
//           </div>

//           <div className="flex-1">
//             <div className="flex items-center gap-3">
//               <h3 className="font-bold text-slate-900">{item.customer}</h3>

//               {/* {item.verified && (
//                 <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
//                   Verified Buyer
//                 </span>
//               )} */}
//             </div>

//             <p className="text-sm text-gray-500 mt-1">
//               {item.product} • {item.date}
//             </p>

//             <div className="flex items-center gap-1 text-yellow-500 mt-3">
//               {Array.from({ length: 5 }).map((_, index) => (
//                 <Star
//                   key={index}
//                   size={18}
//                   fill={index < item.rating ? "currentColor" : "none"}
//                 />
//               ))}
//             </div>

//             <p className="text-gray-700 mt-3">{item.review}</p>
//           </div>

//           <button className="border border-gray-300 px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100">
//             <MessageCircle size={18} />
//             Reply
//           </button>
//         </div>
//       ))}

//       <div className="p-5 flex items-center justify-between">
//         <p className="text-gray-500">Showing 1 to 3 of 248 reviews</p>

//         <div className="flex gap-2">
//           <button className="h-10 w-10 rounded-lg bg-green-600 text-white">1</button>
//           <button className="h-10 w-10 rounded-lg border border-gray-300">2</button>
//           <button className="h-10 w-10 rounded-lg border border-gray-300">3</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewList;
import { MessageCircle, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { getFarmerReviews } from "../../../Api/farmerApi";

type ReviewType = {
  _id: string;
  customerName: string;
  customerImage?: string;
  productId: string;
  productName: string;
  rating: number;
  review: string;
  createdAt: string;
};

type ReviewListProps = {
  reviewType: "customer" | "product";
  onProductClick: (productId: string) => void;
};

const ReviewList = ({ reviewType, onProductClick }: ReviewListProps) => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const response = await getFarmerReviews(reviewType);
      console.log(response.data.reviews)

      if (response.data.success) {
        setReviews(response.data.reviews);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [reviewType]);

  if (loading) {
    return <p className="mt-4 text-gray-500">Loading reviews...</p>;
  }

  if (reviews.length === 0) {
    return <p className="mt-4 text-gray-500">No Reviews Found</p>;
  }

  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {reviews.map((item) => (
        <div
          key={item._id}
          className="flex items-start gap-5 border-b border-gray-200 p-6 last:border-none"
        >
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-green-100">
            {item.customerImage ? (
              <img
                src={item.customerImage}
                alt={item.customerName}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-xl font-bold text-green-600">
                {item.customerName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-slate-900">
              {item.customerName}
            </h3>

            <button
              // onClick={() => onProductClick(item.productId)}
              onClick={() => {
                console.log("clicked productId:", item.productId);
                onProductClick(item.productId);
              }}
              className="mt-1 text-sm cursor-pointer font-semibold text-green-600 hover:underline"
            >
              {item.productName}
            </button>

            <p className="mt-1 text-sm text-gray-500">
              {new Date(item.createdAt).toLocaleDateString()}
            </p>

            <div className="mt-3 flex items-center gap-1 text-yellow-500">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={18}
                  fill={index < item.rating ? "currentColor" : "none"}
                />
              ))}
            </div>

            <p className="mt-3 text-gray-700">{item.review}</p>
          </div>

          <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2 hover:bg-gray-100">
            <MessageCircle size={18} />
            Reply
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;