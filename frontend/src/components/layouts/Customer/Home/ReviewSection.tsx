// import { Star, Heart } from "lucide-react";

// const reviews = [
//   {
//     name: "Rahul Sharma",
//     image: "https://i.pravatar.cc/150?img=11",
//     rating: 5,
//     review:
//       "Amazing quality vegetables! Everything was fresh and delivered on time. Highly recommended.",
//     date: "2 days ago",
//   },
//   {
//     name: "Priya Verma",
//     image: "https://i.pravatar.cc/150?img=5",
//     rating: 5,
//     review:
//       "Best online farm products I have ever purchased. Fruits were sweet and naturally fresh.",
//     date: "5 days ago",
//   },
//   {
//     name: "Amit Singh",
//     image: "https://i.pravatar.cc/150?img=18",
//     rating: 4,
//     review:
//       "Packaging was excellent and vegetables were fresh. Will definitely order again.",
//     date: "1 week ago",
//   },
// ];

// export default function ReviewSection() {
//   return (
//     <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">

//       {/* Heading */}
//       <div className="text-center mb-10">
//         <p className="text-green-600 font-semibold uppercase tracking-widest">
//           Customer Feedback
//         </p>

//         <h2 className="text-4xl font-bold text-gray-900 mt-2">
//           What Our Customers Say
//         </h2>

//         <div className="flex items-center justify-center gap-2 mt-4">
//           <div className="flex text-yellow-400">
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 size={22}
//                 fill="currentColor"
//               />
//             ))}
//           </div>

//           <span className="text-xl font-bold text-gray-800">
//             4.9
//           </span>

//           <span className="text-gray-500">
//             (2,500+ Reviews)
//           </span>
//         </div>
//       </div>

//       {/* Reviews */}
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {reviews.map((review, index) => (
//           <div
//             key={index}
//             className="relative rounded-3xl border border-gray-200 bg-gray-50 p-6 hover:shadow-xl hover:-translate-y-1 transition duration-300"
//           >
//             <div className="flex justify-between items-start">
//               <div className="flex gap-4">
//                 <img
//                   src={review.image}
//                   alt={review.name}
//                   className="h-14 w-14 rounded-full object-cover"
//                 />

//                 <div>
//                   <h3 className="font-bold text-gray-900">
//                     {review.name}
//                   </h3>

//                   <p className="text-sm text-gray-500">
//                     {review.date}
//                   </p>

//                   <div className="flex mt-2 text-yellow-400">
//                     {[...Array(review.rating)].map((_, i) => (
//                       <Star
//                         key={i}
//                         size={16}
//                         fill="currentColor"
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <button className="cursor-pointer text-gray-400 hover:text-red-500 transition">
//                 <Heart size={20} />
//               </button>
//             </div>

//             <p className="mt-5 text-gray-600 leading-7">
//               "{review.review}"
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Bottom */}
//       <div className="flex justify-center mt-10">
//         <button className="px-8 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition cursor-pointer">
//           View All Reviews
//         </button>
//       </div>
//     </section>
//   );
// }



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
    <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-200 sm:p-6 lg:p-8 dark:border-[#29343c] dark:bg-[#141c23]">
      {/* Heading */}
      <div className="mb-8 text-center sm:mb-10">
        <p className="font-semibold uppercase tracking-widest text-green-600">
          Customer Feedback
        </p>

        <h2 className="mt-2 wrap-break-word text-3xl font-bold text-gray-900 sm:text-4xl dark:text-[#f5f7f8]">
          What Our Customers Say
        </h2>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={22}
                fill="currentColor"
              />
            ))}
          </div>

          <span className="text-xl font-bold text-gray-800 dark:text-[#f5f7f8]">
            4.9
          </span>

          <span className="text-gray-500 dark:text-[#9aa7b1]">
            (2,500+ Reviews)
          </span>
        </div>
      </div>

      {/* Reviews */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="relative rounded-3xl border border-gray-200 bg-gray-50 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6 dark:border-[#29343c] dark:bg-[#192128]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 gap-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="h-14 w-14 shrink-0 rounded-full object-cover"
                />

                <div className="min-w-0">
                  <h3 className="truncate font-bold text-gray-900 dark:text-[#f5f7f8]">
                    {review.name}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-[#71808a]">
                    {review.date}
                  </p>

                  <div className="mt-2 flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill="currentColor"
                        className="text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <button className="shrink-0 cursor-pointer text-gray-400 transition hover:text-red-500 dark:text-[#71808a] dark:hover:text-[#ff6578]">
                <Heart size={20} />
              </button>
            </div>

            <p className="mt-5 wrap-break-word leading-7 text-gray-600 dark:text-[#9aa7b1]">
              "{review.review}"
            </p>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="mt-10 flex justify-center">
        <button className="w-full cursor-pointer rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700 sm:w-auto">
          View All Reviews
        </button>
      </div>
    </section>
  );
}