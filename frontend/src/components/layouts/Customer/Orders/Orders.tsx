// // import {
// //   ArrowLeft,
// //   ShoppingBag,
// //   Truck,
// //   CheckCircle,
// //   Clock,
// // } from "lucide-react";

// // type OrdersProps = {
// //   setActivePage: React.Dispatch<React.SetStateAction<string>>;
// // };

// // const Orders = ({ setActivePage }: OrdersProps) => {
// //   const orders = [
// //     {
// //       id: "ORD-1001",
// //       productName: "Fresh Tomato",
// //       quantity: "2 kg",
// //       price: 80,
// //       status: "Delivered",
// //       date: "03 July 2026",
// //       image: "https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=500",
// //     },
// //     {
// //       id: "ORD-1002",
// //       productName: "Organic Potato",
// //       quantity: "5 kg",
// //       price: 150,
// //       status: "On the way",
// //       date: "02 July 2026",
// //       image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500",
// //     },
// //     {
// //       id: "ORD-1003",
// //       productName: "Green Capsicum",
// //       quantity: "1 kg",
// //       price: 60,
// //       status: "Pending",
// //       date: "01 July 2026",
// //       image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=500",
// //     },
// //   ];

// //   const getStatusIcon = (status: string) => {
// //     if (status === "Delivered") {
// //       return <CheckCircle size={18} className="text-green-600" />;
// //     }

// //     if (status === "On the way") {
// //       return <Truck size={18} className="text-blue-600" />;
// //     }

// //     return <Clock size={18} className="text-yellow-600" />;
// //   };

// //   return (
// //     <div className="min-h-screen bg-[#F5F7F5] px-8 py-8">
// //       <button
// //         onClick={() => setActivePage("home")}
// //         className="mb-8 flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 cursor-pointer"
// //       >
// //         <ArrowLeft size={22} />
// //         Go Back
// //       </button>

// //       <div className="mb-8">
// //         <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
// //           <ShoppingBag size={36} className="text-green-700" />
// //           My Orders
// //         </h1>
// //         <p className="text-gray-500 mt-2">
// //           All your vegetable orders are visible here
// //         </p>
// //       </div>

// //       {orders.length > 0 ? (
// //         <div className="space-y-5">
// //           {orders.map((order) => (
// //             <div
// //               key={order.id}
// //               className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition p-5 flex items-center gap-5"
// //             >
// //               <img
// //                 src={order.image}
// //                 alt={order.productName}
// //                 className="h-24 w-24 rounded-xl object-cover"
// //               />

// //               <div className="flex-1">
// //                 <div className="flex items-center justify-between gap-4">
// //                   <div>
// //                     <h2 className="text-xl font-bold text-gray-900">
// //                       {order.productName}
// //                     </h2>

// //                     <p className="text-sm text-gray-500 mt-1">
// //                       Order ID: {order.id}
// //                     </p>

// //                     <p className="text-sm text-gray-500">
// //                       Date: {order.date}
// //                     </p>
// //                   </div>

// //                   <div className="text-right">
// //                     <p className="text-lg font-bold text-green-700">
// //                       ₹{order.price}
// //                     </p>

// //                     <p className="text-sm text-gray-500">
// //                       Qty: {order.quantity}
// //                     </p>
// //                   </div>
// //                 </div>

// //                 <div className="mt-4 flex items-center justify-between">
// //                   <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-700">
// //                     {getStatusIcon(order.status)}
// //                     {order.status}
// //                   </div>

// //                   <button className="px-5 py-2 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition cursor-pointer">
// //                     View Details
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       ) : (
// //         <div className="h-[60vh] flex flex-col items-center justify-center text-center">
// //           <ShoppingBag size={75} className="text-gray-300 mb-4" />

// //           <h2 className="text-2xl font-bold text-gray-800">
// //             No orders found
// //           </h2>

// //           <p className="text-gray-500 mt-2">
// //             Your placed orders will appear here.
// //           </p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Orders;

// import { useEffect, useState } from "react";
// import {
//   CalendarDays,
//   MapPin,
//   Package,
//   IndianRupee,
//   User,
// } from "lucide-react";
// import { getCustomerOrders } from "../../../Api/customerApi"; // change path if needed

// type Order = {
//   _id: string;
//   quantity: number;
//   totalPrice: number;
//   requiredDate: string;
//   createdAt: string;
//   status: string;

//   productId: {
//     _id: string;
//     productName: string;
//     image: string;
//     unit: string;
//     price: number;
//   };

//   farmerId: {
//     username: string;
//     farmName: string;
//     city: string;
//   };
// };

// const Orders = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchOrders = async () => {
//     try {
//       const response = await getCustomerOrders();

//       if (response.data.success) {
//         setOrders(response.data.orders);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex h-[70vh] items-center justify-center text-lg font-semibold">
//         Loading Orders...
//       </div>
//     );
//   }

//   if (orders.length === 0) {
//     return (
//       <div className="flex h-[70vh] items-center justify-center">
//         <div className="rounded-3xl border bg-white p-10 shadow">
//           <Package className="mx-auto mb-4 text-gray-600 hover:text-green-600" size={60} />
//           <h2 className="text-2xl font-bold text-center">
//             No Orders Found
//           </h2>
//           <p className="mt-2 text-center text-gray-500">
//             You haven't placed any orders yet.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#F5F7F5] p-8">
//       <div className="mx-auto max-w-7xl">
//         <h1 className="mb-8 text-4xl font-bold text-green-700">
//           My Orders
//         </h1>

//         <div className="space-y-6">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
//             >
//               {/* <div className="grid md:grid-cols-[220px_1fr]">
//                 <img
//                   src={order.productId.image}
//                   alt={order.productId.productName}
//                   className="h-56 w-full object-cover"
//                 /> */}
//               <div className="grid md:grid-cols-[220px_1fr]">
//                 <div className="h-full">
//                   <img
//                     src={order.productId.image}
//                     alt={order.productId.productName}
//                     className="h-full w-full object-cover"
//                   />
//                 </div>

//                 <div className="p-6">
//                   <div className="flex flex-wrap items-center justify-between gap-4">
//                     <div>
//                       <h2 className="text-2xl font-bold">
//                         {order.productId.productName}
//                       </h2>

//                       <p className="mt-1 text-gray-500">
//                         Order ID : {order._id}
//                       </p>
//                     </div>

//                     <span
//                       className={`rounded-full px-4 py-2 text-sm font-semibold ${order.status === "Delivered"
//                           ? "bg-green-100 text-green-700"
//                           : order.status === "Cancelled"
//                             ? "bg-red-100 text-red-700"
//                             : "bg-yellow-100 text-yellow-700"
//                         }`}
//                     >
//                       {order.status}
//                     </span>
//                   </div>

//                   <div className="mt-6 grid gap-4 md:grid-cols-2">
//                     <div className="flex items-center gap-3">
//                       <Package className="text-green-600" />
//                       <div>
//                         <p className="text-gray-500">Quantity</p>
//                         <p className="font-semibold">
//                           {order.quantity} {order.productId.unit}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <IndianRupee className="text-green-600" />
//                       <div>
//                         <p className="text-gray-500">Total Price</p>
//                         <p className="font-semibold">
//                           ₹{order.totalPrice}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <CalendarDays className="text-green-600" />
//                       <div>
//                         <p className="text-gray-500">
//                           Required Date
//                         </p>
//                         <p className="font-semibold">
//                           {new Date(
//                             order.requiredDate
//                           ).toLocaleDateString()}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <User className="text-green-600" />
//                       <div>
//                         <p className="text-gray-500">Farmer</p>
//                         <p className="font-semibold">
//                           {order.farmerId.farmName}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <MapPin className="text-green-600" />
//                       <div>
//                         <p className="text-gray-500">Location</p>
//                         <p className="font-semibold">
//                           {order.farmerId.city}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <CalendarDays className="text-green-600" />
//                       <div>
//                         <p className="text-gray-500">Ordered On</p>
//                         <p className="font-semibold">
//                           {new Date(
//                             order.createdAt
//                           ).toLocaleDateString()}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-6 flex gap-4">
//                     <button className="rounded-xl cursor-pointer bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700">
//                       Cancel Order
//                     </button>

//                     <button className="rounded-xl cursor-pointer border border-green-600 px-6 py-3 font-semibold text-green-600 transition hover:bg-green-50">
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Orders;

// import {
//   CalendarDays,
//   Hash,
//   IndianRupee,
//   MapPin,
//   Package,
//   Phone,
//   User,
// } from "lucide-react";
// import useOrder from "../../../hooks/useOrder";
// import useWebNavigate from "../../../hooks/useWebNavigate";


// const Orders = () => {
//   const { orders, loading } = useOrder();
//    const { gotoProductDetails } = useWebNavigate();


//   if (loading) {
//     return (
//       <div className="flex h-[70vh] items-center justify-center text-lg font-semibold">
//         Loading Orders...
//       </div>
//     );
//   }

//   if (orders.length === 0) {
//     return (
//       <div className="flex h-[70vh] items-center justify-center">
//         <div className="rounded-3xl border bg-white p-10 shadow">
//           <Package
//             className="mx-auto mb-4 text-gray-600 hover:text-green-600"
//             size={60}
//           />
//           <h2 className="text-center text-2xl font-bold">No Orders Found</h2>
//           <p className="mt-2 text-center text-gray-500">
//             You haven't placed any orders yet.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#F5F7F5] p-8">
//       <div className="mx-auto max-w-7xl">
//         <h1 className="mb-8 text-4xl font-bold text-green-700">My Orders</h1>

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

//                       {/* <p className="mt-1 text-gray-500">
//                         Order Code : #{order.orderCode}
//                       </p> */}
//                     </div>

//                     <span
//                       className={`rounded-full px-4 py-2 text-sm font-semibold ${
//                         order.orderStatus === "Delivered"
//                           ? "bg-green-100 text-green-700"
//                           : order.orderStatus === "Cancelled"
//                           ? "bg-red-100 text-red-700"
//                           : "bg-yellow-100 text-yellow-700"
//                       }`}
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
//                           {order.orderCode}
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
//                     <button className="cursor-pointer rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700">
//                       Cancel Order
//                     </button>

//                     <button
//                       onClick={() => gotoProductDetails(order.productId)}
//                      className="cursor-pointer rounded-xl border border-green-600 px-6 py-3 font-semibold text-green-600 transition hover:bg-green-50">
//                       View Product
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
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

const Orders = () => {
  const { orders, loading ,removeOrderLocally} = useOrder();
  const { gotoProductDetails } = useWebNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<{
    orderId: string;
    orderCode: string;
    productName: string;
  } | null>(null);

  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);

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
      <div className="flex h-[70vh] items-center justify-center text-lg font-semibold">
        Loading Orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="rounded-3xl border bg-white p-10 shadow">
          <Package
            className="mx-auto mb-4 text-gray-600 hover:text-green-600"
            size={60}
          />
          <h2 className="text-center text-2xl font-bold">No Orders Found</h2>
          <p className="mt-2 text-center text-gray-500">
            You haven't placed any orders yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7F5] p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold text-green-700">My Orders</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
            >
              <div className="grid items-stretch md:grid-cols-[220px_1fr]">
                <div className="h-56 md:h-full">
                  <img
                    src={order.productImage}
                    alt={order.productName}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold">
                        {order.productName}
                      </h2>
                    </div>

                    <span
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${order.orderStatus === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.orderStatus === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="flex items-center gap-3">
                      <Hash className="text-green-600" />
                      <div>
                        <p className="text-gray-500">Order ID</p>
                        <p className="break-all font-semibold">
                          #{order.orderCode}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Package className="text-green-600" />
                      <div>
                        <p className="text-gray-500">Quantity</p>
                        <p className="font-semibold">{order.quantity}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <IndianRupee className="text-green-600" />
                      <div>
                        <p className="text-gray-500">Total Price</p>
                        <p className="font-semibold">₹{order.totalPrice}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <CalendarDays className="text-green-600" />
                      <div>
                        <p className="text-gray-500">Required Date</p>
                        <p className="font-semibold">
                          {new Date(order.requiredDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <User className="text-green-600" />
                      <div>
                        <p className="text-gray-500">Farm Name</p>
                        <p className="font-semibold">{order.farmName}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="text-green-600" />
                      <div>
                        <p className="text-gray-500">Location</p>
                        <p className="font-semibold">{order.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="text-green-600" />
                      <div>
                        <p className="text-gray-500">Farmer Phone</p>
                        <p className="font-semibold">{order.phoneNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <CalendarDays className="text-green-600" />
                      <div>
                        <p className="text-gray-500">Ordered On</p>
                        <p className="font-semibold">
                          {new Date(order.orderedOn).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-4">
                    {/* <button className="cursor-pointer rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700">
                      Cancel Order
                    </button> */}
                    <button
                      onClick={() => {
                        setSelectedOrder({
                          orderId: order._id,
                          orderCode: order.orderCode,
                          productName: order.productName,
                        });

                        setShowCancelModal(true);
                      }}
                      className="cursor-pointer rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                    >
                      Cancel Order
                    </button>

                    <button
                      onClick={() => handleViewProduct(order.productId)}
                      disabled={loadingProductId === order.productId}
                      className="cursor-pointer rounded-xl border border-green-600 px-6 py-3 font-semibold text-green-600 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-60"
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
        //   <CancelOrder
        //   orderId={selectedOrder.orderId}
        //   productName={selectedOrder.productName}
        //   orderCode={selectedOrder.orderCode}
        //   onClose={() => {
        //     setShowCancelModal(false);
        //     setSelectedOrder(null);
        //   }}
        //   onSuccess={() => {
        //     // fetchOrders();
        //   }}
        // />
      )}
    </div>

  );
};

export default Orders;