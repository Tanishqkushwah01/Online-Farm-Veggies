import { Star, Heart } from "lucide-react";

const reviews = [
  {
    name: "Rahul Sharma",
    image: "https://i.pravatar.cc/150?img=11",
    rating: 5,
    review:
      "Amazing quality vegetables! Everything was fresh and delivered on time. Highly recommended.",
    date: "2 days ago",
  },
  {
    name: "Priya Verma",
    image: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    review:
      "Best online farm products I have ever purchased. Fruits were sweet and naturally fresh.",
    date: "5 days ago",
  },
  {
    name: "Amit Singh",
    image: "https://i.pravatar.cc/150?img=18",
    rating: 4,
    review:
      "Packaging was excellent and vegetables were fresh. Will definitely order again.",
    date: "1 week ago",
  },
];

export default function ReviewSection() {
  return (
    <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">

      {/* Heading */}
      <div className="text-center mb-10">
        <p className="text-green-600 font-semibold uppercase tracking-widest">
          Customer Feedback
        </p>

        <h2 className="text-4xl font-bold text-gray-900 mt-2">
          What Our Customers Say
        </h2>

        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={22}
                fill="currentColor"
              />
            ))}
          </div>

          <span className="text-xl font-bold text-gray-800">
            4.9
          </span>

          <span className="text-gray-500">
            (2,500+ Reviews)
          </span>
        </div>
      </div>

      {/* Reviews */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="relative rounded-3xl border border-gray-200 bg-gray-50 p-6 hover:shadow-xl hover:-translate-y-1 transition duration-300"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="h-14 w-14 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-bold text-gray-900">
                    {review.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {review.date}
                  </p>

                  <div className="flex mt-2 text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill="currentColor"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <button className="cursor-pointer text-gray-400 hover:text-red-500 transition">
                <Heart size={20} />
              </button>
            </div>

            <p className="mt-5 text-gray-600 leading-7">
              "{review.review}"
            </p>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="flex justify-center mt-10">
        <button className="px-8 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition cursor-pointer">
          View All Reviews
        </button>
      </div>
    </section>
  );
}