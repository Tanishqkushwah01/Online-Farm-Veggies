// import {
//   CalendarDays,
//   Hash,
//   IndianRupee,
//   MapPin,
//   Package,
//   Phone,
//   User,
// } from "lucide-react";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import useOrder from "../../../hooks/useProductOrders";
// import useWebNavigate from "../../../hooks/useWebNavigate";
// import { getProductById } from "../../../Api/customerApi";
// import CancelOrder from "./CancelOrder";
// import OrderPagination from "./OrderPagination";

// const Orders = () => {
//   const {
//     orders,
//     loading,
//     page,
//     totalPages,
//     setPage,
//     removeOrderLocally,
//     message,
//   } = useOrder();
//   const { gotoProductDetails } = useWebNavigate();
//   const [showCancelModal, setShowCancelModal] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState<{
//     orderId: string;
//     orderCode: string;
//     productName: string;
//   } | null>(null);

//   const [loadingProductId, setLoadingProductId] = useState<string | null>(null);

//   const handleViewProduct = async (productId: string) => {
//     try {
//       setLoadingProductId(productId);

//       const response = await getProductById(productId);

//       if (response.data.success) {
//         gotoProductDetails(
//           productId,
//           response.data.product,
//           response.data.farmerDetails,
//           response.data.review
//         );
//       }
//     } catch (error: any) {
//       toast.error(error?.response?.data?.message || "Product not found");
//     } finally {
//       setLoadingProductId(null);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex h-[70vh] items-center justify-center text-lg font-semibold">
//         Loading Orders...
//       </div>
//     );
//   }

//   if (!loading && orders.length === 0) {
//     return (
//       <div className="min-h-screen bg-[#F5F7F5] p-8">
//         <div className="mx-auto flex h-[70vh] max-w-7xl items-center justify-center">
//           <div className="rounded-3xl border bg-white p-10 shadow">
//             <Package
//               className="mx-auto mb-4 text-gray-600"
//               size={60}
//             />

//             <h2 className="text-center text-2xl font-bold">
//               {message || "No Orders Found"}
//             </h2>

//             <p className="mt-2 text-center text-gray-500">
//               {message === "Product not found"
//                 ? "Try searching with another product name or order code."
//                 : "You haven't placed any orders yet."}
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#F5F7F5] p-8">

//       <div className="mx-auto max-w-7xl">
//         <h1 className="mb-8 text-4xl font-bold text-green-700">My Orders</h1>
//         {/* {message && orders.length > 0 && (
//           <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-700">
//             {message}
//           </div>
//         )} */}

//         <div className="space-y-6">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
//             >
//               <div className="grid items-stretch md:grid-cols-[220px_1fr]">
//                 <div className="h-56 md:h-full">
//                   <img
//                     src={order.productImage}
//                     alt={order.productName}
//                     className="h-full w-full object-cover"
//                   />
//                 </div>

//                 <div className="p-6">
//                   <div className="flex flex-wrap items-center justify-between gap-4">
//                     <div>
//                       <h2 className="text-2xl font-bold">
//                         {order.productName}
//                       </h2>
//                     </div>

//                     <span
//                       className={`rounded-full px-4 py-2 text-sm font-semibold ${order.orderStatus === "Delivered"
//                         ? "bg-green-100 text-green-700"
//                         : order.orderStatus === "Cancelled"
//                           ? "bg-red-100 text-red-700"
//                           : "bg-yellow-100 text-yellow-700"
//                         }`}
//                     >
//                       {order.orderStatus}
//                     </span>
//                   </div>

//                   <div className="mt-6 grid gap-4 md:grid-cols-2">
//                     <div className="flex items-center gap-3">
//                       <Hash className="text-green-600" />
//                       <div>
//                         <p className="text-gray-500">Order ID</p>
//                         <p className="break-all font-semibold">
//                           #{order.orderCode}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <Package className="text-green-600" />
//                       <div>
//                         <p className="text-gray-500">Quantity</p>
//                         <p className="font-semibold">{order.quantity}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <IndianRupee className="text-green-600" />
//                       <div>
//                         <p className="text-gray-500">Total Price</p>
//                         <p className="font-semibold">₹{order.totalPrice}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <CalendarDays className="text-green-600" />
//                       <div>
//                         <p className="text-gray-500">Required Date</p>
//                         <p className="font-semibold">
//                           {new Date(order.requiredDate).toLocaleDateString()}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <User className="text-green-600" />
//                       <div>
//                         <p className="text-gray-500">Farm Name</p>
//                         <p className="font-semibold">{order.farmName}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <MapPin className="text-green-600" />
//                       <div>
//                         <p className="text-gray-500">Location</p>
//                         <p className="font-semibold">{order.location}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <Phone className="text-green-600" />
//                       <div>
//                         <p className="text-gray-500">Farmer Phone</p>
//                         <p className="font-semibold">{order.phoneNumber}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <CalendarDays className="text-green-600" />
//                       <div>
//                         <p className="text-gray-500">Ordered On</p>
//                         <p className="font-semibold">
//                           {new Date(order.orderedOn).toLocaleDateString()}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-6 flex gap-4">
//                     {/* <button className="cursor-pointer rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700">
//                       Cancel Order
//                     </button> */}
//                     <button
//                       onClick={() => {
//                         setSelectedOrder({
//                           orderId: order._id,
//                           orderCode: order.orderCode,
//                           productName: order.productName,
//                         });

//                         setShowCancelModal(true);
//                       }}
//                       className="cursor-pointer rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
//                     >
//                       Cancel Order
//                     </button>

//                     <button
//                       onClick={() => handleViewProduct(order.productId)}
//                       disabled={loadingProductId === order.productId}
//                       className="cursor-pointer rounded-xl border border-green-600 px-6 py-3 font-semibold text-green-600 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-60"
//                     >
//                       {loadingProductId === order.productId
//                         ? "Loading..."
//                         : "View Product"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       {showCancelModal && selectedOrder && (
//         <CancelOrder
//           orderId={selectedOrder.orderId}
//           productName={selectedOrder.productName}
//           orderCode={selectedOrder.orderCode}
//           onClose={() => {
//             setShowCancelModal(false);
//             setSelectedOrder(null);
//           }}
//           onSuccess={(orderId) => removeOrderLocally(orderId)}
//         />

//       )}
//       <OrderPagination
//         currentPage={page}
//         totalPages={totalPages}
//         onPageChange={setPage}
//       />
//     </div>

//   );
// };

// export default Orders;



import {
  CalendarDays,
  Hash,
  IndianRupee,
  MapPin,
  Package,
  Phone,
  User,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import useOrder from "../../../hooks/useProductOrders";
import useWebNavigate from "../../../hooks/useWebNavigate";
import { getProductById } from "../../../Api/customerApi";
import CancelOrder from "./CancelOrder";
import OrderPagination from "./OrderPagination";

const Orders = () => {
  const {
    orders,
    loading,
    page,
    totalPages,
    setPage,
    removeOrderLocally,
    message,
  } = useOrder();

  const { gotoProductDetails } = useWebNavigate();

  const [showCancelModal, setShowCancelModal] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState<{
    orderId: string;
    orderCode: string;
    productName: string;
  } | null>(null);

  const [loadingProductId, setLoadingProductId] = useState<string | null>(
    null
  );

  const handleViewProduct = async (productId: string) => {
    try {
      setLoadingProductId(productId);

      const response = await getProductById(productId);

      if (response.data.success) {
        gotoProductDetails(
          productId,
          response.data.product,
          response.data.farmerDetails,
          response.data.review
        );
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Product not found");
    } finally {
      setLoadingProductId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F7F5] text-lg font-semibold text-gray-800 transition-colors duration-200 dark:bg-[#0f171f] dark:text-[#f5f7f8]">
        Loading Orders...
      </div>
    );
  }

  if (!loading && orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F7F5] px-4 py-6 transition-colors duration-200 sm:px-6 sm:py-7 lg:p-8 dark:bg-[#0f171f]">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-7xl items-center justify-center">
          <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow transition-colors duration-200 sm:p-10 dark:border-[#29343c] dark:bg-[#141c23]">
            <Package
              className="mx-auto mb-4 text-gray-600 dark:text-[#9aa7b1]"
              size={60}
            />

            <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-[#f5f7f8]">
              {message || "No Orders Found"}
            </h2>

            <p className="mt-2 text-center text-gray-500 dark:text-[#9aa7b1]">
              {message === "Product not found"
                ? "Try searching with another product name or order code."
                : "You haven't placed any orders yet."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7F5] px-4 py-6 transition-colors duration-200 sm:px-6 sm:py-7 lg:p-8 dark:bg-[#0f171f]">
      <div className="mx-auto w-full max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold text-green-700 dark:text-[#00c767]">
          My Orders
        </h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg dark:border-[#29343c] dark:bg-[#141c23]"
            >
              <div className="grid items-stretch md:grid-cols-[220px_1fr]">
                {/* Product Image */}
                <div className="h-56 md:h-full">
                  <img
                    src={order.productImage}
                    alt={order.productName}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Order Content */}
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                    <div className="min-w-0">
                      <h2 className="wrap-break-word text-2xl font-bold text-gray-900 dark:text-[#f5f7f8]">
                        {order.productName}
                      </h2>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${
                        order.orderStatus === "Delivered"
                          ? "bg-green-100 text-green-700 dark:bg-[#123126] dark:text-[#00c767]"
                          : order.orderStatus === "Cancelled"
                            ? "bg-red-100 text-red-700 dark:bg-[#321d24] dark:text-[#ff6578]"
                            : "bg-yellow-100 text-yellow-700 dark:bg-[#352e18] dark:text-[#f3c969]"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="flex min-w-0 items-center gap-3">
                      <Hash className="shrink-0 text-green-600" />

                      <div className="min-w-0">
                        <p className="text-gray-500 dark:text-[#71808a]">
                          Order ID
                        </p>

                        <p className="break-all font-semibold text-gray-900 dark:text-[#f5f7f8]">
                          #{order.orderCode}
                        </p>
                      </div>
                    </div>

                    <div className="flex min-w-0 items-center gap-3">
                      <Package className="shrink-0 text-green-600" />

                      <div className="min-w-0">
                        <p className="text-gray-500 dark:text-[#71808a]">
                          Quantity
                        </p>

                        <p className="font-semibold text-gray-900 dark:text-[#f5f7f8]">
                          {order.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="flex min-w-0 items-center gap-3">
                      <IndianRupee className="shrink-0 text-green-600" />

                      <div className="min-w-0">
                        <p className="text-gray-500 dark:text-[#71808a]">
                          Total Price
                        </p>

                        <p className="font-semibold text-gray-900 dark:text-[#f5f7f8]">
                          ₹{order.totalPrice}
                        </p>
                      </div>
                    </div>

                    <div className="flex min-w-0 items-center gap-3">
                      <CalendarDays className="shrink-0 text-green-600" />

                      <div className="min-w-0">
                        <p className="text-gray-500 dark:text-[#71808a]">
                          Required Date
                        </p>

                        <p className="font-semibold text-gray-900 dark:text-[#f5f7f8]">
                          {new Date(
                            order.requiredDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex min-w-0 items-center gap-3">
                      <User className="shrink-0 text-green-600" />

                      <div className="min-w-0">
                        <p className="text-gray-500 dark:text-[#71808a]">
                          Farm Name
                        </p>

                        <p className="wrap-break-word font-semibold text-gray-900 dark:text-[#f5f7f8]">
                          {order.farmName}
                        </p>
                      </div>
                    </div>

                    <div className="flex min-w-0 items-center gap-3">
                      <MapPin className="shrink-0 text-green-600" />

                      <div className="min-w-0">
                        <p className="text-gray-500 dark:text-[#71808a]">
                          Location
                        </p>

                        <p className="wrap-break-word font-semibold text-gray-900 dark:text-[#f5f7f8]">
                          {order.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex min-w-0 items-center gap-3">
                      <Phone className="shrink-0 text-green-600" />

                      <div className="min-w-0">
                        <p className="text-gray-500 dark:text-[#71808a]">
                          Farmer Phone
                        </p>

                        <p className="wrap-break-word font-semibold text-gray-900 dark:text-[#f5f7f8]">
                          {order.phoneNumber}
                        </p>
                      </div>
                    </div>

                    <div className="flex min-w-0 items-center gap-3">
                      <CalendarDays className="shrink-0 text-green-600" />

                      <div className="min-w-0">
                        <p className="text-gray-500 dark:text-[#71808a]">
                          Ordered On
                        </p>

                        <p className="font-semibold text-gray-900 dark:text-[#f5f7f8]">
                          {new Date(
                            order.orderedOn
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                    <button
                      onClick={() => {
                        setSelectedOrder({
                          orderId: order._id,
                          orderCode: order.orderCode,
                          productName: order.productName,
                        });

                        setShowCancelModal(true);
                      }}
                      className="w-full cursor-pointer rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 sm:w-auto"
                    >
                      Cancel Order
                    </button>

                    <button
                      onClick={() => handleViewProduct(order.productId)}
                      disabled={loadingProductId === order.productId}
                      className="w-full cursor-pointer rounded-xl border border-green-600 px-6 py-3 font-semibold text-green-600 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-[#00c767] dark:text-[#00c767] dark:hover:bg-[#123126] sm:w-auto"
                    >
                      {loadingProductId === order.productId
                        ? "Loading..."
                        : "View Product"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCancelModal && selectedOrder && (
        <CancelOrder
          orderId={selectedOrder.orderId}
          productName={selectedOrder.productName}
          orderCode={selectedOrder.orderCode}
          onClose={() => {
            setShowCancelModal(false);
            setSelectedOrder(null);
          }}
          onSuccess={(orderId) => removeOrderLocally(orderId)}
        />
      )}

      <OrderPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default Orders;