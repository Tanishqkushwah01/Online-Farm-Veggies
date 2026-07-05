import { Star } from "lucide-react";

const CustomerReviews = () => {
  const reviews = [
    {
      name: "Ramesh Patel",
      review: "Great quality vegetables! Everything was fresh and delivered on time.",
      rating: 5,
    },
    {
      name: "Sneha Kapoor",
      review: "Very good packaging and freshness. Will order again.",
      rating: 5,
    },
    {
      name: "Amit Singh",
      review: "Good experience overall. Keep up the good work!",
      rating: 4,
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">Customer Reviews</h2>
        <button className="text-green-600 font-semibold">View All</button>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {reviews.map((item) => (
          <div
            key={item.name}
            className="border border-gray-100 rounded-xl p-5 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-600">
                {item.name.charAt(0)}
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">{item.name}</h3>

                <div className="flex text-green-500 mt-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      fill={index < item.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-sm leading-6">{item.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;