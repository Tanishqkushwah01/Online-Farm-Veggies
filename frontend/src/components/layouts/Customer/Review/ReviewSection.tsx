// import { Star, Trash2 } from "lucide-react";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { addReview, deleteReview } from "../../../Api/customerApi";

// type ReviewType = "product" | "farmer";

// type Props = {
//   id: string;
//   type: ReviewType;
//   reviews?: MyReview | null;
//   onReviewAdded?: () => void;
// };

// type MyReview = {
//   _id: string;
//   rating: number;
//   review: string;
//   createdAt: string;
//   username?: string;
// };

// const ReviewSection = ({ id, type, reviews, onReviewAdded }: Props) => {
//   const [rating, setRating] = useState(0);
//   const [hoverRating, setHoverRating] = useState(0);
//   const [review, setReview] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [deleteLoading, setDeleteLoading] = useState(false);

//   const [alreadyReviewed, setAlreadyReviewed] = useState(false);
//   const [showReview, setShowReview] = useState(false);
//   const [myReview, setMyReview] = useState<MyReview | null>(null);
//   // console.log('reviews == ',reviews);

//   const reviewTarget = type === "product" ? "product" : "farmer";

//   useEffect(() => {
//     if (reviews) {
//       setAlreadyReviewed(true);
//       setMyReview(reviews);
//     } else {
//       setAlreadyReviewed(false);
//       setShowReview(false);
//       setMyReview(null);
//     }
//   }, [reviews]);

//   const handleSubmit = async () => {
//     if (loading) return;

//     if (alreadyReviewed) {
//       setShowReview((prev) => !prev);
//       return;
//     }

//     if (!rating) {
//       return toast.error("Please select a rating.", {
//         id: "rating-required",
//       });
//     }

//     try {
//       setLoading(true);
//       console.log("lucide dreams id== ",{
//         id,
//         rating,
//         review: review.trim(),
//       });

//       const response = await addReview(type, {
//         id,
//         rating,
//         review: review.trim(),
//       });
//       console.log("lucide dreams == ",response.data);

//       if (response.data.success) {
//         toast.success("Review submitted.", {
//           id: "review-success",
//         });

//         setAlreadyReviewed(true);
//         setMyReview({
//           ...response.data.review,
//           username: response.data.username,
//         });
//         setShowReview(true);

//         setRating(0);
//         setHoverRating(0);
//         setReview("");

//         onReviewAdded?.();
//       }
//     } catch (error: any) {
//       const message =
//         error?.response?.data?.message || "Something went wrong.";

//       toast.error(message, {
//         id: "review-error",
//       });

//       if (
//         message === `You have already reviewed this ${reviewTarget}.` ||
//         message === "You have already reviewed this."
//       ) {
//         setAlreadyReviewed(true);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReviewDelete = async () => {
//     if (deleteLoading) return;
    
//     try {
//       setDeleteLoading(true);

//       const response = await deleteReview(type, id);

//       if (response.data.success) {
//         toast.success(response.data.message || "Review deleted successfully.", {
//           id: "review-deleted",
//         });

//         setAlreadyReviewed(false);
//         setShowReview(false);
//         setMyReview(null);

//         setRating(0);
//         setHoverRating(0);
//         setReview("");

//         onReviewAdded?.();
//       }
//     } catch (error: any) {
//       toast.error(error?.response?.data?.message || "Something went wrong.", {
//         id: "delete-review-error",
//       });
//     } finally {
//       setDeleteLoading(false);
//     }
//   };

//   return (
//     <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
//       <h2 className="text-3xl font-bold text-gray-900">Customer Review</h2>

//       <p className="mt-2 text-gray-500">
//         Share your experience and help others make better choices.
//       </p>

//       <div className="mt-8">
//         <h3 className="mb-3 font-semibold text-gray-800">
//           Your Rating <span className="text-red-500">*</span>
//         </h3>

//         <div className="flex gap-2">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <button
//               type="button"
//               key={star}
//               disabled={alreadyReviewed || loading}
//               onClick={() => setRating(star)}
//               onMouseEnter={() => setHoverRating(star)}
//               onMouseLeave={() => setHoverRating(0)}
//               className="transition hover:scale-125 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               <Star
//                 size={34}
//                 className={`transition-all duration-200 ${star <= (hoverRating || rating)
//                     ? "fill-yellow-400 text-yellow-400"
//                     : "text-gray-300"
//                   }`}
//               />
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="mt-8">
//         <h3 className="mb-3 font-semibold text-gray-800">
//           Write Review
//           <span className="ml-2 text-sm font-normal text-gray-400">
//             (Optional)
//           </span>
//         </h3>

//         <textarea
//           value={review}
//           disabled={alreadyReviewed || loading}
//           onChange={(e) => setReview(e.target.value)}
//           maxLength={500}
//           placeholder="Tell others about your experience..."
//           className="h-36 w-full resize-none rounded-2xl border border-gray-200 p-5 outline-none transition focus:border-green-600 disabled:cursor-not-allowed disabled:bg-gray-100"
//         />

//         <div className="mt-2 flex justify-between gap-4">
//           <span className="text-sm text-gray-400">
//             Have a lot of great things to write? Oops! You only have a
//             500-character limit.
//           </span>

//           <span className="text-sm text-gray-500">{review.length}/500</span>
//         </div>
//       </div>

//       <button
//         disabled={loading}
//         onClick={handleSubmit}
//         className="mt-8 w-full cursor-pointer rounded-2xl bg-green-600 py-4 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
//       >
//         {loading
//           ? "Submitting..."
//           : alreadyReviewed
//             ? showReview
//               ? "Hide Your Review"
//               : "Want to see what you reviewed?"
//             : "Submit Review"}
//       </button>

//       {showReview && myReview && (
//         <div className="mt-8 rounded-3xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
//           <div className="flex items-start justify-between gap-4">
//             <div>
//               <h3 className="text-xl font-bold text-gray-900">
//                 {myReview.username || "Your Review"}
//               </h3>

//               <div className="mt-3 flex gap-1">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <Star
//                     key={star}
//                     size={22}
//                     className={
//                       star <= myReview.rating
//                         ? "fill-yellow-400 text-yellow-400"
//                         : "text-gray-300"
//                     }
//                   />
//                 ))}
//               </div>

//               <p className="mt-4 text-gray-700">
//                 {myReview.review || "No written review provided."}
//               </p>

//               <p className="mt-4 text-sm text-gray-400">
//                 Reviewed on{" "}
//                 {new Date(myReview.createdAt).toLocaleDateString("en-IN")}
//               </p>
//             </div>

//             <button
//               type="button"
//               disabled={deleteLoading}
//               onClick={handleReviewDelete}
//               className="rounded-xl border cursor-pointer border-red-200 p-3 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {deleteLoading ? "..." : <Trash2 size={18} />}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReviewSection;

import { Star, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addReview, deleteReview } from "../../../Api/customerApi";

type ReviewType = "product" | "farmer";

type MyReview = {
  _id: string;
  rating: number;
  review: string;
  createdAt: string;
  username?: string;
};

type Props = {
  id: string;
  type: ReviewType;
  reviews?: MyReview | null;
  onReviewAdded?: () => void;
};

const ReviewSection = ({ id, type, reviews, onReviewAdded }: Props) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [myReview, setMyReview] = useState<MyReview | null>(null);

  const alreadyReviewed = !!myReview;
  const reviewTarget = type === "product" ? "product" : "farmer";

  useEffect(() => {
    setRating(0);
    setHoverRating(0);
    setReview("");
    setShowReview(false);
    setMyReview(reviews ?? null);
  }, [id, reviews]);

  const handleSubmit = async () => {
    if (loading) return;

    if (alreadyReviewed) {
      setShowReview((prev) => !prev);
      return;
    }

    if (!rating) {
      return toast.error("Please select a rating.", {
        id: "rating-required",
      });
    }

    try {
      setLoading(true);

      const response = await addReview(type, {
        id,
        rating,
        review: review.trim(),
      });

      if (response.data.success) {
        const newReview: MyReview = {
          ...response.data.review,
          username: response.data.username,
        };

        setMyReview(newReview);
        setShowReview(true);

        setRating(0);
        setHoverRating(0);
        setReview("");

        toast.success("Review submitted.", {
          id: "review-success",
        });

        onReviewAdded?.();
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || "Something went wrong.";

      toast.error(message, {
        id: "review-error",
      });

      if (
        message === `You have already reviewed this ${reviewTarget}.` ||
        message === "You have already reviewed this."
      ) {
        onReviewAdded?.();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReviewDelete = async () => {
    if (deleteLoading || !myReview) return;

    try {
      setDeleteLoading(true);

      const response = await deleteReview(type, id);

      if (response.data.success) {
        setMyReview(null);
        setShowReview(false);

        setRating(0);
        setHoverRating(0);
        setReview("");

        toast.success(response.data.message || "Review deleted successfully.", {
          id: "review-deleted",
        });

        onReviewAdded?.();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong.", {
        id: "delete-review-error",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-bold text-gray-900">Customer Review</h2>

      <p className="mt-2 text-gray-500">
        Share your experience and help others make better choices.
      </p>

      <div className="mt-8">
        <h3 className="mb-3 font-semibold text-gray-800">
          Your Rating <span className="text-red-500">*</span>
        </h3>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              disabled={alreadyReviewed || loading}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition hover:scale-125 disabled:cursor-not-allowed disabled:opacity-60"
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
        <h3 className="mb-3 font-semibold text-gray-800">
          Write Review
          <span className="ml-2 text-sm font-normal text-gray-400">
            (Optional)
          </span>
        </h3>

        <textarea
          value={review}
          disabled={alreadyReviewed || loading}
          onChange={(e) => setReview(e.target.value)}
          maxLength={500}
          placeholder="Tell others about your experience..."
          className="h-36 w-full resize-none rounded-2xl border border-gray-200 p-5 outline-none transition focus:border-green-600 disabled:cursor-not-allowed disabled:bg-gray-100"
        />

        <div className="mt-2 flex justify-between gap-4">
          <span className="text-sm text-gray-400">
            Have a lot of great things to write? Oops! You only have a
            500-character limit.
          </span>

          <span className="text-sm text-gray-500">{review.length}/500</span>
        </div>
      </div>

      <button
        type="button"
        disabled={loading}
        onClick={handleSubmit}
        className="mt-8 w-full cursor-pointer rounded-2xl bg-green-600 py-4 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading
          ? "Submitting..."
          : alreadyReviewed
          ? showReview
            ? "Hide Your Review"
            : "Want to see what you reviewed?"
          : "Submit Review"}
      </button>

      {showReview && myReview && (
        <div className="mt-8 rounded-3xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {myReview.username || "Your Review"}
              </h3>

              <div className="mt-3 flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={22}
                    className={
                      star <= myReview.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              <p className="mt-4 text-gray-700">
                {myReview.review || "No written review provided."}
              </p>

              <p className="mt-4 text-sm text-gray-400">
                Reviewed on{" "}
                {new Date(myReview.createdAt).toLocaleDateString("en-IN")}
              </p>
            </div>

            <button
              type="button"
              disabled={deleteLoading}
              onClick={handleReviewDelete}
              className="cursor-pointer rounded-xl border border-red-200 p-3 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {deleteLoading ? "..." : <Trash2 size={18} />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;