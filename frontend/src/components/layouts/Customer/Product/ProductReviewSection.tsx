import { Star } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { addReview } from "../../../Api/customerApi";

type Props = {
  productId: string;
  onReviewAdded?: () => void;
};

const ProductReviewSection = ({
  productId,
  onReviewAdded,
}: Props) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!rating) {
      return toast.error("Please select rating.");
    }

    if (!review.trim()) {
      return toast.error("Please write a review.");
    }

    try {
      setLoading(true);

      const response = await addReview({
        productId,
        rating,
        review,
      });

      if (response.data.success) {
        toast.success("Review submitted.");

        setRating(0);
        setHoverRating(0);
        setReview("");

        onReviewAdded?.();
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">

      <h2 className="text-3xl font-bold text-gray-900">
        Customer Review
      </h2>

      <p className="text-gray-500 mt-2">
        Share your experience with this product.
      </p>

      <div className="mt-8">

        <h3 className="font-semibold text-gray-800 mb-3">
          Your Rating
        </h3>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition hover:scale-125"
            >
              <Star
                size={34}
                className={`transition-all duration-200 ${
                  star <= (hoverRating || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>

      </div>

      <div className="mt-8">

        <h3 className="font-semibold text-gray-800 mb-3">
          Write Review
        </h3>

        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          maxLength={500}
          placeholder="Tell others what you liked about this product..."
          className="w-full h-36 rounded-2xl border border-gray-200 p-5 resize-none outline-none focus:border-green-600 transition"
        />

        <div className="flex justify-between mt-2">

          <span className="text-sm text-gray-400">
            Maximum 500 characters
          </span>

          <span className="text-sm text-gray-500">
            {review.length}/500
          </span>

        </div>

      </div>

      <button
        disabled={loading}
        onClick={handleSubmit}
        className="mt-8 w-full rounded-2xl bg-green-600 py-4 font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>

    </div>
  );
};

export default ProductReviewSection;