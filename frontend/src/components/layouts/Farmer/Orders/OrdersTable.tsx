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

const OrdersTable = ({ orders, loading, fetchOrders }: OrdersTableProps) => {
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const [removeOrderData, setRemoveOrderData] = useState<any | null>(null);

  const statusClass = (status: string) => {
    if (status === "Pending") return "bg-orange-100 text-orange-600";
    if (status === "Accepted") return "bg-blue-100 text-blue-600";
    if (status === "Delivered") return "bg-green-100 text-green-600";
    if (status === "Rejected") return "bg-red-100 text-red-600";
    return "bg-gray-100 text-gray-600";
  };

  const displayStatus = (status: string) => {
    return status === "Accepted" ? "Processing" : status;
  };

  const formatDate = (value?: string) => {
    if (!value) return { date: "-", time: "" };

    const d = new Date(value);

    if (isNaN(d.getTime())) {
      return { date: "-", time: "" };
    }

    return {
      date: d.toLocaleDateString("en-IN"),
      time: d.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const handleStatusUpdate = async (orderId: string, status: string) => {
    try {
      const response = await updateOrderStatus(orderId, status);

      if (response.data.success) {
        toast.success(response.data.message || "Order updated");
        setOpenActionId(null);
        fetchOrders();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleRemoveOrder = async () => {
    if (!removeOrderData?._id) return;

    const response = await removeOrder(removeOrderData._id);

    if (response.data.success) {
      toast.success(response.data.message || "Order removed");
      setRemoveOrderData(null);
      fetchOrders();
    }
  };

  if (loading) {
    return <p className="bg-white p-6">Loading orders...</p>;
  }

  return (
    <>
      <div className="overflow-visible bg-white">
        <table className="w-full min-w-250">
          <thead>
            <tr className="border-b border-gray-200 text-left">
              <th className="p-6">Order ID</th>
              <th className="p-6">Customer</th>
              <th className="p-6">Product</th>
              <th className="p-6">Quantity</th>
              <th className="p-6">Amount</th>
              <th className="p-6">Status</th>
              <th className="p-6">Date</th>
              <th className="p-6">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => {
                const orderId =
                  order.orderCode || order.id || order._id?.slice(-6) || "N/A";

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
                  order.totalPrice || order.totalAmount || order.amount || 0;

                const status = order.orderStatus || order.status || "Pending";

                const { date, time } = formatDate(
                  order.orderedOn || order.createdAt || order.date
                );

                const openUp = index >= orders.length - 2;

                return (
                  <tr
                    key={order._id || orderId}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-6">{orderId}</td>

                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-green-100 font-bold text-green-600">
                          {customerImage ? (
                            <img
                              src={customerImage}
                              alt={customerName}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span>{customerName.charAt(0).toUpperCase()}</span>
                          )}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {customerName}
                          </p>
                          <p className="text-sm text-gray-500">{phone}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-6 font-semibold">{productName}</td>

                    <td className="p-6">
                      {quantity} {unit}
                    </td>

                    <td className="p-6 font-semibold">₹{amount}</td>

                    <td className="p-6">
                      <span
                        className={`rounded-full px-4 py-1 text-sm font-semibold ${statusClass(
                          status
                        )}`}
                      >
                        {displayStatus(status)}
                      </span>
                    </td>

                    <td className="p-6">
                      <p className="font-medium">{date}</p>
                      <p className="text-sm text-gray-500">{time}</p>
                    </td>

                    <td className="relative p-6">
                      <button
                        onClick={() =>
                          setOpenActionId(
                            openActionId === order._id ? null : order._id
                          )
                        }
                        className="rounded-lg p-2 cursor-pointer hover:bg-gray-100"
                      >
                        <MoreVertical size={22} />
                      </button>

                      {openActionId === order._id && (
                        <div
                          className={`absolute right-6 z-9999 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl ${
                            openUp ? "bottom-14" : "top-14"
                          }`}
                        >
                          {status === "Pending" && (
                            <>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(order._id, "Accepted")
                                }
                                className="w-full px-4 py-3 text-left text-green-600 hover:bg-green-50"
                              >
                                Accept Order
                              </button>

                              <button
                                onClick={() =>
                                  handleStatusUpdate(order._id, "Rejected")
                                }
                                className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50"
                              >
                                Reject Order
                              </button>
                            </>
                          )}

                          {status === "Accepted" && (
                            <button
                              onClick={() =>
                                handleStatusUpdate(order._id, "Delivered")
                              }
                              className="w-full px-4 py-3 text-left text-blue-600 hover:bg-blue-50"
                            >
                              Mark Delivered
                            </button>
                          )}

                          {(status === "Delivered" || status === "Rejected") && (
                            <button
                              onClick={() => {
                                setRemoveOrderData(order);
                                setOpenActionId(null);
                              }}
                              className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50"
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
                <td colSpan={8} className="p-10 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
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