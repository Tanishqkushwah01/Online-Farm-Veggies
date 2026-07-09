import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { getRecentCustomerReviews } from "../../../Api/farmerApi";

type CustomerReviewsProps = {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
};

type ReviewType = {
  _id: string;
  rating: number;
  review: string;
  customerName?: string;
  customerImage?: string;
  customerId?: {
    username?: string;
    profilePicture?: string;
  };
};

const CustomerReviews = ({ setActivePage }: CustomerReviewsProps) => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const res = await getRecentCustomerReviews();

      if (res.data.success) {
        setReviews(res.data.reviews);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 min-h-75">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Customer Reviews
        </h2>

        <button
          onClick={() => setActivePage("reviews")}
          className="text-green-400 hover:text-green-600 font-semibold cursor-pointer"
        >
          View All
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <div className="flex min-h-47.5 items-center justify-center text-gray-500">
          No customer reviews yet.
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-5 min-h-47.5">
          {reviews.map((item) => {
            const name =
              item.customerName ||
              item.customerId?.username ||
              "Customer";

            const image =
              item.customerImage ||
              item.customerId?.profilePicture;

            return (
              <div
                key={item._id}
                className="border border-gray-100 rounded-xl p-5 shadow-sm min-h-47.5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full bg-green-100 flex items-center justify-center">
                    {image ? (
                      <img
                        src={image}
                        alt={name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="font-bold text-green-600 text-lg">
                        {name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {name}
                    </h3>

                    <div className="flex text-green-500 mt-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          size={16}
                          fill={
                            index < item.rating
                              ? "currentColor"
                              : "none"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-6 line-clamp-3">
                  {item.review}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;