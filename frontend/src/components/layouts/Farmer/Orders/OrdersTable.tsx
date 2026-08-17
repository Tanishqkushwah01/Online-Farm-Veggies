// import { MoreVertical } from "lucide-react";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { removeOrder, updateOrderStatus } from "../../../Api/farmerApi";
// import RemoveOrder from "./RemoveOrder";

// type OrdersTableProps = {
//   orders: any[];
//   loading: boolean;
//   fetchOrders: () => void;
// };

// const OrdersTable = ({ orders, loading, fetchOrders }: OrdersTableProps) => {
//   const [openActionId, setOpenActionId] = useState<string | null>(null);
//   const [removeOrderData, setRemoveOrderData] = useState<any | null>(null);

//   const statusClass = (status: string) => {
//     if (status === "Pending") return "bg-orange-100 text-orange-600";
//     if (status === "Accepted") return "bg-blue-100 text-blue-600";
//     if (status === "Delivered") return "bg-green-100 text-green-600";
//     if (status === "Rejected") return "bg-red-100 text-red-600";
//     return "bg-gray-100 text-gray-600";
//   };

//   const displayStatus = (status: string) => {
//     return status === "Accepted" ? "Processing" : status;
//   };

//   const formatDate = (value?: string) => {
//     if (!value) return { date: "-", time: "" };

//     const d = new Date(value);

//     if (isNaN(d.getTime())) {
//       return { date: "-", time: "" };
//     }

//     return {
//       date: d.toLocaleDateString("en-IN"),
//       time: d.toLocaleTimeString("en-IN", {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//     };
//   };

//   const handleStatusUpdate = async (orderId: string, status: string) => {
//     try {
//       const response = await updateOrderStatus(orderId, status);

//       if (response.data.success) {
//         toast.success(response.data.message || "Order updated");
//         setOpenActionId(null);
//         fetchOrders();
//       }
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   const handleRemoveOrder = async () => {
//     if (!removeOrderData?._id) return;

//     const response = await removeOrder(removeOrderData._id);

//     if (response.data.success) {
//       toast.success(response.data.message || "Order removed");
//       setRemoveOrderData(null);
//       fetchOrders();
//     }
//   };

//   if (loading) {
//     return <p className="bg-white p-6">Loading orders...</p>;
//   }

//   return (
//     <>
//       <div className="overflow-visible bg-white">
//         <table className="w-full min-w-250">
//           <thead>
//             <tr className="border-b border-gray-200 text-left">
//               <th className="p-6">Order ID</th>
//               <th className="p-6">Customer</th>
//               <th className="p-6">Product</th>
//               <th className="p-6">Quantity</th>
//               <th className="p-6">Amount</th>
//               <th className="p-6">Status</th>
//               <th className="p-6">Date</th>
//               <th className="p-6">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.length > 0 ? (
//               orders.map((order, index) => {
//                 const orderId =
//                   order.orderCode || order.id || order._id?.slice(-6) || "N/A";

//                 const customerName =
//                   order.customerName ||
//                   order.customer ||
//                   order.customerId?.username ||
//                   order.customerId?.name ||
//                   "Unknown Customer";

//                 const phone =
//                   order.phoneNumber ||
//                   order.phone ||
//                   order.customerId?.phoneNumber ||
//                   "No phone";

//                 const customerImage =
//                   order.customerImage ||
//                   order.customerId?.profilePicture ||
//                   order.customerId?.image ||
//                   "";

//                 const productName =
//                   order.productName ||
//                   order.product?.productName ||
//                   order.productId?.productName ||
//                   "Unknown Product";

//                 const quantity = order.quantity || 0;
//                 const unit = order.unit || "kg";

//                 const amount =
//                   order.totalPrice || order.totalAmount || order.amount || 0;

//                 const status = order.orderStatus || order.status || "Pending";

//                 const { date, time } = formatDate(
//                   order.orderedOn || order.createdAt || order.date
//                 );

//                 const openUp = index >= orders.length - 2;

//                 return (
//                   <tr
//                     key={order._id || orderId}
//                     className="border-b border-gray-100 hover:bg-gray-50"
//                   >
//                     <td className="p-6">{orderId}</td>

//                     <td className="p-6">
//                       <div className="flex items-center gap-3">
//                         <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-green-100 font-bold text-green-600">
//                           {customerImage ? (
//                             <img
//                               src={customerImage}
//                               alt={customerName}
//                               className="h-full w-full object-cover"
//                             />
//                           ) : (
//                             <span>{customerName.charAt(0).toUpperCase()}</span>
//                           )}
//                         </div>

//                         <div>
//                           <p className="font-semibold text-slate-900">
//                             {customerName}
//                           </p>
//                           <p className="text-sm text-gray-500">{phone}</p>
//                         </div>
//                       </div>
//                     </td>

//                     <td className="p-6 font-semibold">{productName}</td>

//                     <td className="p-6">
//                       {quantity} {unit}
//                     </td>

//                     <td className="p-6 font-semibold">₹{amount}</td>

//                     <td className="p-6">
//                       <span
//                         className={`rounded-full px-4 py-1 text-sm font-semibold ${statusClass(
//                           status
//                         )}`}
//                       >
//                         {displayStatus(status)}
//                       </span>
//                     </td>

//                     <td className="p-6">
//                       <p className="font-medium">{date}</p>
//                       <p className="text-sm text-gray-500">{time}</p>
//                     </td>

//                     <td className="relative p-6">
//                       <button
//                         onClick={() =>
//                           setOpenActionId(
//                             openActionId === order._id ? null : order._id
//                           )
//                         }
//                         className="rounded-lg p-2 cursor-pointer hover:bg-gray-100"
//                       >
//                         <MoreVertical size={22} />
//                       </button>

//                       {openActionId === order._id && (
//                         <div
//                           className={`absolute right-6 z-9999 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl ${
//                             openUp ? "bottom-14" : "top-14"
//                           }`}
//                         >
//                           {status === "Pending" && (
//                             <>
//                               <button
//                                 onClick={() =>
//                                   handleStatusUpdate(order._id, "Accepted")
//                                 }
//                                 className="w-full px-4 py-3 text-left text-green-600 hover:bg-green-50"
//                               >
//                                 Accept Order
//                               </button>

//                               <button
//                                 onClick={() =>
//                                   handleStatusUpdate(order._id, "Rejected")
//                                 }
//                                 className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50"
//                               >
//                                 Reject Order
//                               </button>
//                             </>
//                           )}

//                           {status === "Accepted" && (
//                             <button
//                               onClick={() =>
//                                 handleStatusUpdate(order._id, "Delivered")
//                               }
//                               className="w-full px-4 py-3 text-left text-blue-600 hover:bg-blue-50"
//                             >
//                               Mark Delivered
//                             </button>
//                           )}

//                           {(status === "Delivered" || status === "Rejected") && (
//                             <button
//                               onClick={() => {
//                                 setRemoveOrderData(order);
//                                 setOpenActionId(null);
//                               }}
//                               className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50"
//                             >
//                               Remove Order
//                             </button>
//                           )}
//                         </div>
//                       )}
//                     </td>
//                   </tr>
//                 );
//               })
//             ) : (
//               <tr>
//                 <td colSpan={8} className="p-10 text-center text-gray-500">
//                   No orders found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {removeOrderData && (
//         <RemoveOrder
//           orderCode={removeOrderData.orderCode}
//           onClose={() => setRemoveOrderData(null)}
//           onConfirm={handleRemoveOrder}
//         />
//       )}
//     </>
//   );
// };

// export default OrdersTable;


import { MoreVertical } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { removeOrder, updateOrderStatus } from "../../../Api/farmerApi";
import RemoveOrder from "./RemoveOrder";

type OrdersTableProps = {
  orders: any[];
  loading: boolean;
  fetchOrders: () => void;
};

const OrdersTable = ({
  orders,
  loading,
  fetchOrders,
}: OrdersTableProps) => {
  const [openActionId, setOpenActionId] =
    useState<string | null>(null);

  const [removeOrderData, setRemoveOrderData] =
    useState<any | null>(null);

  const statusClass = (status: string) => {
    if (status === "Pending") {
      return "bg-orange-100 text-orange-600 dark:bg-[#35261b] dark:text-[#ffad63]";
    }

    if (status === "Accepted") {
      return "bg-blue-100 text-blue-600 dark:bg-[#122432] dark:text-[#66b8ff]";
    }

    if (status === "Delivered") {
      return "bg-green-100 text-green-600 dark:bg-[#123126] dark:text-[#00c767]";
    }

    if (status === "Rejected") {
      return "bg-red-100 text-red-600 dark:bg-[#321d24] dark:text-[#ff6578]";
    }

    return "bg-gray-100 text-gray-600 dark:bg-[#192128] dark:text-[#9aa7b1]";
  };

  const displayStatus = (status: string) => {
    return status === "Accepted" ? "Processing" : status;
  };

  const formatDate = (value?: string) => {
    if (!value) {
      return {
        date: "-",
        time: "",
      };
    }

    const d = new Date(value);

    if (isNaN(d.getTime())) {
      return {
        date: "-",
        time: "",
      };
    }

    return {
      date: d.toLocaleDateString("en-IN"),
      time: d.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const handleStatusUpdate = async (
    orderId: string,
    status: string
  ) => {
    try {
      const response = await updateOrderStatus(
        orderId,
        status
      );

      if (response.data.success) {
        toast.success(
          response.data.message || "Order updated"
        );

        setOpenActionId(null);
        fetchOrders();
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const handleRemoveOrder = async () => {
    if (!removeOrderData?._id) return;

    try {
      const response = await removeOrder(
        removeOrderData._id
      );

      if (response.data.success) {
        toast.success(
          response.data.message || "Order removed"
        );

        setRemoveOrderData(null);
        fetchOrders();
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 transition-colors duration-200 dark:border-[#29343c] dark:bg-[#141c23]">
        <p className="text-gray-500 dark:text-[#9aa7b1]">
          Loading orders...
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white transition-colors duration-200 dark:border-[#29343c] dark:bg-[#141c23]">
        {/* Horizontal scroll on smaller screens */}
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[1100px] border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-left dark:border-[#29343c]">
                <th className="whitespace-nowrap p-5 font-semibold text-gray-600 sm:p-6 dark:text-[#9aa7b1]">
                  Order ID
                </th>

                <th className="whitespace-nowrap p-5 font-semibold text-gray-600 sm:p-6 dark:text-[#9aa7b1]">
                  Customer
                </th>

                <th className="whitespace-nowrap p-5 font-semibold text-gray-600 sm:p-6 dark:text-[#9aa7b1]">
                  Product
                </th>

                <th className="whitespace-nowrap p-5 font-semibold text-gray-600 sm:p-6 dark:text-[#9aa7b1]">
                  Quantity
                </th>

                <th className="whitespace-nowrap p-5 font-semibold text-gray-600 sm:p-6 dark:text-[#9aa7b1]">
                  Amount
                </th>

                <th className="whitespace-nowrap p-5 font-semibold text-gray-600 sm:p-6 dark:text-[#9aa7b1]">
                  Status
                </th>

                <th className="whitespace-nowrap p-5 font-semibold text-gray-600 sm:p-6 dark:text-[#9aa7b1]">
                  Date
                </th>

                <th className="whitespace-nowrap p-5 font-semibold text-gray-600 sm:p-6 dark:text-[#9aa7b1]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.length > 0 ? (
                orders.map((order, index) => {
                  const orderId =
                    order.orderCode ||
                    order.id ||
                    order._id?.slice(-6) ||
                    "N/A";

                  const customerName =
                    order.customerName ||
                    order.customer ||
                    order.customerId?.username ||
                    order.customerId?.name ||
                    "Unknown Customer";

                  const phone =
                    order.phoneNumber ||
                    order.phone ||
                    order.customerId?.phoneNumber ||
                    "No phone";

                  const customerImage =
                    order.customerImage ||
                    order.customerId?.profilePicture ||
                    order.customerId?.image ||
                    "";

                  const productName =
                    order.productName ||
                    order.product?.productName ||
                    order.productId?.productName ||
                    "Unknown Product";

                  const quantity = order.quantity || 0;
                  const unit = order.unit || "kg";

                  const amount =
                    order.totalPrice ||
                    order.totalAmount ||
                    order.amount ||
                    0;

                  const status =
                    order.orderStatus ||
                    order.status ||
                    "Pending";

                  const { date, time } = formatDate(
                    order.orderedOn ||
                      order.createdAt ||
                      order.date
                  );

                  const openUp =
                    index >= orders.length - 2;

                  return (
                    <tr
                      key={order._id || orderId}
                      className="border-b border-gray-100 transition-colors last:border-none hover:bg-gray-50 dark:border-[#29343c] dark:hover:bg-[#192128]"
                    >
                      {/* Order ID */}
                      <td className="p-5 text-sm font-medium text-slate-900 sm:p-6 dark:text-[#f5f7f8]">
                        {orderId}
                      </td>

                      {/* Customer */}
                      <td className="p-5 sm:p-6">
                        <div className="flex min-w-56 items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-100 font-bold text-green-600 dark:bg-[#123126] dark:text-[#00c767]">
                            {customerImage ? (
                              <img
                                src={customerImage}
                                alt={customerName}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span>
                                {customerName
                                  .charAt(0)
                                  .toUpperCase()}
                              </span>
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="max-w-48 truncate font-semibold text-slate-900 dark:text-[#f5f7f8]">
                              {customerName}
                            </p>

                            <p className="max-w-48 truncate text-sm text-gray-500 dark:text-[#9aa7b1]">
                              {phone}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Product */}
                      <td className="max-w-56 p-5 font-semibold text-slate-900 sm:p-6 dark:text-[#f5f7f8]">
                        <span className="block max-w-56 truncate">
                          {productName}
                        </span>
                      </td>

                      {/* Quantity */}
                      <td className="whitespace-nowrap p-5 text-slate-700 sm:p-6 dark:text-[#c4cdd3]">
                        {quantity} {unit}
                      </td>

                      {/* Amount */}
                      <td className="whitespace-nowrap p-5 font-semibold text-slate-900 sm:p-6 dark:text-[#f5f7f8]">
                        ₹{amount}
                      </td>

                      {/* Status */}
                      <td className="p-5 sm:p-6">
                        <span
                          className={`whitespace-nowrap rounded-full px-4 py-1 text-sm font-semibold ${statusClass(
                            status
                          )}`}
                        >
                          {displayStatus(status)}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="whitespace-nowrap p-5 sm:p-6">
                        <p className="font-medium text-slate-900 dark:text-[#f5f7f8]">
                          {date}
                        </p>

                        <p className="text-sm text-gray-500 dark:text-[#9aa7b1]">
                          {time}
                        </p>
                      </td>

                      {/* Action */}
                      <td className="relative p-5 sm:p-6">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenActionId(
                              openActionId === order._id
                                ? null
                                : order._id
                            )
                          }
                          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 dark:text-[#f5f7f8] dark:hover:bg-[#29343c]"
                          aria-label="Order actions"
                        >
                          <MoreVertical size={22} />
                        </button>

                        {openActionId === order._id && (
                          <div
                            className={`absolute right-6 z-[9999] w-44 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-[#29343c] dark:bg-[#141c23] ${
                              openUp
                                ? "bottom-14"
                                : "top-14"
                            }`}
                          >
                            {status === "Pending" && (
                              <>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleStatusUpdate(
                                      order._id,
                                      "Accepted"
                                    )
                                  }
                                  className="w-full cursor-pointer px-4 py-3 text-left text-green-600 transition hover:bg-green-50 dark:hover:bg-[#123126]"
                                >
                                  Accept Order
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleStatusUpdate(
                                      order._id,
                                      "Rejected"
                                    )
                                  }
                                  className="w-full cursor-pointer px-4 py-3 text-left text-red-600 transition hover:bg-red-50 dark:hover:bg-[#321d24]"
                                >
                                  Reject Order
                                </button>
                              </>
                            )}

                            {status === "Accepted" && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleStatusUpdate(
                                    order._id,
                                    "Delivered"
                                  )
                                }
                                className="w-full cursor-pointer px-4 py-3 text-left text-blue-600 transition hover:bg-blue-50 dark:hover:bg-[#122432]"
                              >
                                Mark Delivered
                              </button>
                            )}

                            {(status === "Delivered" ||
                              status === "Rejected") && (
                              <button
                                type="button"
                                onClick={() => {
                                  setRemoveOrderData(order);
                                  setOpenActionId(null);
                                }}
                                className="w-full cursor-pointer px-4 py-3 text-left text-red-600 transition hover:bg-red-50 dark:hover:bg-[#321d24]"
                              >
                                Remove Order
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="p-10 text-center text-gray-500 dark:text-[#9aa7b1]"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {removeOrderData && (
        <RemoveOrder
          orderCode={removeOrderData.orderCode}
          onClose={() => setRemoveOrderData(null)}
          onConfirm={handleRemoveOrder}
        />
      )}
    </>
  );
};

export default OrdersTable;