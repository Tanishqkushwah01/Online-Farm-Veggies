import { MessageCircle, Star } from "lucide-react";
import { reviews } from "./dummyData";

const ReviewList = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-4 overflow-hidden">
      {reviews.map((item) => (
        <div
          key={item.id}
          className="p-6 border-b border-gray-200 last:border-none flex items-start gap-5"
        >
          <div className="h-14 w-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xl">
            {item.customer.charAt(0)}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-slate-900">{item.customer}</h3>

              {item.verified && (
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
                  Verified Buyer
                </span>
              )}
            </div>

            <p className="text-sm text-gray-500 mt-1">
              {item.product} • {item.date}
            </p>

            <div className="flex items-center gap-1 text-yellow-500 mt-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={18}
                  fill={index < item.rating ? "currentColor" : "none"}
                />
              ))}
            </div>

            <p className="text-gray-700 mt-3">{item.review}</p>
          </div>

          <button className="border border-gray-300 px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100">
            <MessageCircle size={18} />
            Reply
          </button>
        </div>
      ))}

      <div className="p-5 flex items-center justify-between">
        <p className="text-gray-500">Showing 1 to 3 of 248 reviews</p>

        <div className="flex gap-2">
          <button className="h-10 w-10 rounded-lg bg-green-600 text-white">1</button>
          <button className="h-10 w-10 rounded-lg border border-gray-300">2</button>
          <button className="h-10 w-10 rounded-lg border border-gray-300">3</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewList;