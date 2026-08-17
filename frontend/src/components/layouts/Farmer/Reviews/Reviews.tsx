// import ReviewStats from "./ReviewStats";
// import RatingSummary from "./RatingSummary";
// import ReviewFilters from "./ReviewFilters";
// import ReviewList from "./ReviewList";
// import { useState } from "react";

// type ReviewsProps = {
//   setActivePage: React.Dispatch<React.SetStateAction<string>>;
// };

// const Reviews = ({ setActivePage }: ReviewsProps) => {
//   const [reviewType, setReviewType] = useState<"customer" | "product">(
//     "product"
//   );

//   const [search, setSearch] = useState("");

//   return (
//     <div className="min-h-full rounded-md bg-gray-300 p-8">
//       <div>
//         <h1 className="text-4xl font-bold text-slate-900">Reviews</h1>
//         <p className="mt-2 text-lg text-gray-600">
//           Manage and respond to your customer reviews.
//         </p>
//       </div>

//       <ReviewStats reviewType={reviewType} />
//       <RatingSummary reviewType={reviewType} />

//       <ReviewFilters
//         reviewType={reviewType}
//         setReviewType={setReviewType}
//         search={search}
//         setSearch={setSearch}
//       />

//       <ReviewList
//         reviewType={reviewType}
//         search={search}
//         setActivePage={setActivePage}
//       />
//     </div>
//   );
// };

// export default Reviews;



import ReviewStats from "./ReviewStats";
import RatingSummary from "./RatingSummary";
import ReviewFilters from "./ReviewFilters";
import ReviewList from "./ReviewList";
import { useState } from "react";

type ReviewsProps = {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
};

const Reviews = ({ setActivePage }: ReviewsProps) => {
  const [reviewType, setReviewType] = useState<
    "customer" | "product"
  >("product");

  const [search, setSearch] = useState("");

  return (
    <div
      className="
        min-h-full
        rounded-md
        bg-gray-300
        p-4
        transition-colors
        duration-200
        sm:p-5
        md:p-6
        lg:p-8
        dark:bg-[#0f171f]
      "
    >
      {/* Header */}
      <div className="min-w-0">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-[#f5f7f8]">
          Reviews
        </h1>

        <p className="mt-2 text-base text-gray-600 sm:text-lg dark:text-[#9aa7b1]">
          Manage and respond to your customer reviews.
        </p>
      </div>

      {/* Review Stats */}
      <div className="mt-5 min-w-0">
        <ReviewStats reviewType={reviewType} />
      </div>

      {/* Rating Summary */}
      <div className="min-w-0">
        <RatingSummary reviewType={reviewType} />
      </div>

      {/* Filters */}
      <div className="min-w-0">
        <ReviewFilters
          reviewType={reviewType}
          setReviewType={setReviewType}
          search={search}
          setSearch={setSearch}
        />
      </div>

      {/* Reviews */}
      <div className="min-w-0">
        <ReviewList
          reviewType={reviewType}
          search={search}
          setActivePage={setActivePage}
        />
      </div>
    </div>
  );
};

export default Reviews;