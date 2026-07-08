import ReviewStats from "./ReviewStats";
import RatingSummary from "./RatingSummary";
import ReviewFilters from "./ReviewFilters";
import ReviewList from "./ReviewList";
import { useState } from "react";
import useWebNavigate from "../../../hooks/useWebNavigate";

type ReviewsProps = {
  onProductClick: (productId: string) => void;
};

const Reviews = ({ onProductClick }: ReviewsProps) => {
  const [reviewType, setReviewType] = useState<"customer" | "product">("product");
  const { gotoFarmerProduct } = useWebNavigate();

  return (
    <div className="bg-gray-300 rounded-md p-8 min-h-full">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Reviews</h1>
        <p className="text-gray-600 mt-2 text-lg">
          Manage and respond to your customer reviews.
        </p>
      </div>

      <ReviewStats reviewType={reviewType} />
      <RatingSummary reviewType={reviewType} />
      <ReviewFilters
        reviewType={reviewType}
        setReviewType={setReviewType}
      />
      {/* <ReviewList onProductClick={onProductClick} reviewType={reviewType}  /> */}
      <ReviewList
        reviewType={reviewType}
        onProductClick={onProductClick}
      />
    </div>
  );
};

export default Reviews;