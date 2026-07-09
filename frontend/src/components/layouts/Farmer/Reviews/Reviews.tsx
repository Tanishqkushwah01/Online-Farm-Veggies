import ReviewStats from "./ReviewStats";
import RatingSummary from "./RatingSummary";
import ReviewFilters from "./ReviewFilters";
import ReviewList from "./ReviewList";
import { useState } from "react";

type ReviewsProps = {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
};

const Reviews = ({ setActivePage }: ReviewsProps) => {
  const [reviewType, setReviewType] = useState<"customer" | "product">(
    "product"
  );

  const [search, setSearch] = useState("");

  return (
    <div className="min-h-full rounded-md bg-gray-300 p-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Reviews</h1>
        <p className="mt-2 text-lg text-gray-600">
          Manage and respond to your customer reviews.
        </p>
      </div>

      <ReviewStats reviewType={reviewType} />
      <RatingSummary reviewType={reviewType} />

      <ReviewFilters
        reviewType={reviewType}
        setReviewType={setReviewType}
        search={search}
        setSearch={setSearch}
      />

      <ReviewList
        reviewType={reviewType}
        search={search}
        setActivePage={setActivePage}
      />
    </div>
  );
};

export default Reviews;