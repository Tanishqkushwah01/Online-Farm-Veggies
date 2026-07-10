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