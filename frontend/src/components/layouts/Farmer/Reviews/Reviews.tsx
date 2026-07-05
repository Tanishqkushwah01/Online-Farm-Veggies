import ReviewStats from "./ReviewStats";
import RatingSummary from "./RatingSummary";
import ReviewFilters from "./ReviewFilters";
import ReviewList from "./ReviewList";

const Reviews = () => {
  return (
    <div className="bg-gray-300 rounded-md p-8 min-h-full">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Reviews</h1>
        <p className="text-gray-600 mt-2 text-lg">
          Manage and respond to your customer reviews.
        </p>
      </div>

      <ReviewStats />
      <RatingSummary />
      <ReviewFilters />
      <ReviewList />
    </div>
  );
};

export default Reviews;