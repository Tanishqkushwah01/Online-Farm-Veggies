// import { BadgeCheck, Star } from "lucide-react";
// import { useEffect, useState } from "react";
// import { getFarmerReviews } from "../../../Api/farmerApi";
// import { useProductHighlight } from "../../../hooks/useProductHighlight";

// type ReviewType = {
//   _id: string;
//   customerName?: string;
//   customerImage?: string;
//   customerId?: {
//     username?: string;
//     profilePicture?: string;
//   };
//   productId:
//   | string
//   | {
//     _id: string;
//     productName: string;
//   };
//   productName?: string;
//   rating: number;
//   review: string;
//   createdAt: string;
// };

// type ReviewListProps = {
//   reviewType: "customer" | "product";
//   search: string;
//   setActivePage: React.Dispatch<React.SetStateAction<string>>;
// };

// const ReviewList = ({ reviewType, search, setActivePage }: ReviewListProps) => {
//   const [reviews, setReviews] = useState<ReviewType[]>([]);
//   const [loading, setLoading] = useState(false);
//   const { highlightProduct } = useProductHighlight();

//   const fetchReviews = async () => {
//     try {
//       setLoading(true);

//       const response = await getFarmerReviews(reviewType, search);

//       if (response.data.success) {
//         setReviews(response.data.reviews || []);
//       } else {
//         setReviews([]);
//       }
//     } catch (error) {
//       console.log(error);
//       setReviews([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getCustomerName = (item: ReviewType) => {
//     return item.customerName || item.customerId?.username || "Unknown Customer";
//   };

//   const getCustomerImage = (item: ReviewType) => {
//     return item.customerImage || item.customerId?.profilePicture;
//   };

//   const getProductId = (item: ReviewType) => {
//     return typeof item.productId === "string"
//       ? item.productId
//       : item.productId?._id;
//   };

//   const getProductName = (item: ReviewType) => {
//     return (
//       item.productName ||
//       (typeof item.productId !== "string" ? item.productId?.productName : "")
//     );
//   };

//   const handleProductClick = (productId: string) => {
//     setActivePage("products");

//     setTimeout(() => {
//       highlightProduct(productId);
//     }, 100);
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, [reviewType, search]);

//   return (
//     <div className="mt-4 min-h-80 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
//       {loading && (
//         <div className="border-b border-gray-100 px-6 py-3 text-sm text-gray-500">
//           Searching reviews...
//         </div>
//       )}

//       {!loading && reviews.length === 0 && (
//         <div className="flex min-h-75 items-center justify-center text-gray-500">
//           No Reviews Found
//         </div>
//       )}

//       {reviews.map((item) => {
//         const customerName = getCustomerName(item);
//         const customerImage = getCustomerImage(item);
//         const productId = getProductId(item);
//         const productName = getProductName(item);

//         return (
//           <div
//             key={item._id}
//             className="flex items-start gap-5 border-b border-gray-200 p-6 last:border-none"
//           >
//             <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-100">
//               {customerImage ? (
//                 <img
//                   src={customerImage}
//                   alt={customerName}
//                   className="h-full w-full object-cover"
//                 />
//               ) : (
//                 <span className="text-xl font-bold text-green-600">
//                   {customerName.charAt(0).toUpperCase()}
//                 </span>
//               )}
//             </div>

//             <div className="min-w-0 flex-1">
//               <h3 className="font-bold text-slate-900">{customerName}</h3>

//               {reviewType === "product" && productId && (
//                 <button
//                   onClick={() => handleProductClick(productId)}
//                   className="mt-1 cursor-pointer text-sm font-semibold text-green-600 hover:underline"
//                 >
//                   {productName}
//                 </button>
//               )}

//               <p className="mt-1 text-sm text-gray-500">
//                 {new Date(item.createdAt).toLocaleDateString("en-IN")}
//               </p>

//               <div className="mt-3 flex items-center gap-1 text-yellow-500">
//                 {Array.from({ length: 5 }).map((_, index) => (
//                   <Star
//                     key={index}
//                     size={18}
//                     fill={index < item.rating ? "currentColor" : "none"}
//                   />
//                 ))}
//               </div>

//               <p className="review-text mt-3 leading-7 text-gray-700">
//                 {item.review}
//               </p>
//             </div>


//             <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-gray-600">
//               <BadgeCheck size={18} />
//               <span>Verified Purchase</span>
//             </div>

//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ReviewList;



import { BadgeCheck, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { getFarmerReviews } from "../../../Api/farmerApi";
import { useProductHighlight } from "../../../hooks/useProductHighlight";

type ReviewType = {
  _id: string;
  customerName?: string;
  customerImage?: string;
  customerId?: {
    username?: string;
    profilePicture?: string;
  };
  productId:
    | string
    | {
        _id: string;
        productName: string;
      };
  productName?: string;
  rating: number;
  review: string;
  createdAt: string;
};

type ReviewListProps = {
  reviewType: "customer" | "product";
  search: string;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
};

const ReviewList = ({
  reviewType,
  search,
  setActivePage,
}: ReviewListProps) => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [loading, setLoading] = useState(false);

  const { highlightProduct } = useProductHighlight();

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const response = await getFarmerReviews(
        reviewType,
        search
      );

      if (response.data.success) {
        setReviews(response.data.reviews || []);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.log(error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const getCustomerName = (item: ReviewType) => {
    return (
      item.customerName ||
      item.customerId?.username ||
      "Unknown Customer"
    );
  };

  const getCustomerImage = (item: ReviewType) => {
    return (
      item.customerImage ||
      item.customerId?.profilePicture
    );
  };

  const getProductId = (item: ReviewType) => {
    return typeof item.productId === "string"
      ? item.productId
      : item.productId?._id;
  };

  const getProductName = (item: ReviewType) => {
    return (
      item.productName ||
      (typeof item.productId !== "string"
        ? item.productId?.productName
        : "")
    );
  };

  const handleProductClick = (productId: string) => {
    setActivePage("products");

    setTimeout(() => {
      highlightProduct(productId);
    }, 100);
  };

  useEffect(() => {
    fetchReviews();
  }, [reviewType, search]);

  return (
    <div className="mt-4 min-h-80 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-colors duration-200 dark:border-[#29343c] dark:bg-[#141c23]">
      {/* Loading */}
      {loading && (
        <div className="border-b border-gray-100 px-5 py-3 text-sm text-gray-500 sm:px-6 dark:border-[#29343c] dark:text-[#9aa7b1]">
          Searching reviews...
        </div>
      )}

      {/* Empty */}
      {!loading && reviews.length === 0 && (
        <div className="flex min-h-75 items-center justify-center px-4 text-center text-gray-500 dark:text-[#9aa7b1]">
          No Reviews Found
        </div>
      )}

      {/* Reviews */}
      {reviews.map((item) => {
        const customerName = getCustomerName(item);
        const customerImage = getCustomerImage(item);
        const productId = getProductId(item);
        const productName = getProductName(item);

        return (
          <div
            key={item._id}
            className="
              flex
              flex-col
              gap-4
              border-b
              border-gray-200
              p-5
              last:border-none
              transition-colors
              duration-200
              sm:p-6
              md:flex-row
              md:items-start
              dark:border-[#29343c]
            "
          >
            {/* Customer Image */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-100 dark:bg-[#123126]">
              {customerImage ? (
                <img
                  src={customerImage}
                  alt={customerName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-xl font-bold text-green-600 dark:text-[#00c767]">
                  {customerName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            {/* Review Content */}
            <div className="min-w-0 flex-1">
              <h3 className="break-words font-bold text-slate-900 dark:text-[#f5f7f8]">
                {customerName}
              </h3>

              {reviewType === "product" && productId && (
                <button
                  type="button"
                  onClick={() =>
                    handleProductClick(productId)
                  }
                  className="mt-1 block max-w-full cursor-pointer truncate text-left text-sm font-semibold text-green-600 hover:underline dark:text-[#00c767]"
                >
                  {productName}
                </button>
              )}

              <p className="mt-1 text-sm text-gray-500 dark:text-[#9aa7b1]">
                {new Date(
                  item.createdAt
                ).toLocaleDateString("en-IN")}
              </p>

              {/* Rating */}
              <div className="mt-3 flex items-center gap-1 text-yellow-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    fill={
                      index < item.rating
                        ? "currentColor"
                        : "none"
                    }
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="mt-3 break-words leading-7 text-gray-700 dark:text-[#c4cdd3]">
                {item.review}
              </p>

              {/* Verified - mobile/tablet */}
              <div className="mt-4 flex w-fit items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-600 md:hidden dark:border-[#29343c] dark:bg-[#192128] dark:text-[#9aa7b1]">
                <BadgeCheck
                  size={18}
                  className="shrink-0 text-green-600 dark:text-[#00c767]"
                />
                <span>Verified Purchase</span>
              </div>
            </div>

            {/* Verified - desktop */}
            <div className="hidden shrink-0 items-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-gray-600 md:flex dark:border-[#29343c] dark:bg-[#192128] dark:text-[#9aa7b1]">
              <BadgeCheck
                size={18}
                className="shrink-0 text-green-600 dark:text-[#00c767]"
              />
              <span className="whitespace-nowrap">
                Verified Purchase
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewList;