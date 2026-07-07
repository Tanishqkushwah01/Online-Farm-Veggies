import { Star } from "lucide-react";

const ProductReviewSection = () => {
  return (
    <div className="rounded-[24px] border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>

      <div className="mt-4 flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={20}
            className="fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>

      <div className="mt-4 rounded-2xl bg-gray-50 p-4">
        <textarea
          placeholder="Write your review..."
          className="h-28 w-full resize-none rounded-2xl border border-gray-200 bg-white p-4 outline-none focus:border-green-500"
        />

        <div className="mt-4 flex justify-end">
          <button className="rounded-2xl bg-green-600 px-6 py-2.5 font-semibold text-white transition hover:bg-green-700">
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductReviewSection;