import { MoreVertical } from "lucide-react";
import { orders } from "./dummyData";

const OrdersTable = () => {
  function statusClass(status: string) {
    if (status === "Delivered") return "bg-green-100 text-green-600";
    if (status === "Processing") return "bg-orange-100 text-orange-600";
    if (status === "Shipped") return "bg-blue-100 text-blue-600";
    return "bg-red-100 text-red-600";
  }

  function paymentClass(payment: string) {
    if (payment === "Paid") return "bg-green-100 text-green-600";
    return "bg-purple-100 text-purple-600";
  }

  return (
    <div className="bg-white overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-600 border-b border-gray-200">
            <th className="p-5">Order ID</th>
            <th className="p-5">Customer</th>
            <th className="p-5">Items</th>
            <th className="p-5">Amount</th>
            <th className="p-5">Payment</th>
            <th className="p-5">Status</th>
            <th className="p-5">Date</th>
            <th className="p-5">Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b border-gray-100 hover:bg-gray-50"
            >
              <td className="p-5 font-semibold text-slate-900">{order.id}</td>

              <td className="p-5">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-600">
                    {order.customer.charAt(0)}
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {order.customer}
                    </h3>
                    <p className="text-sm text-gray-500">{order.phone}</p>
                  </div>
                </div>
              </td>

              <td className="p-5">{order.items} items</td>

              <td className="p-5 font-semibold">₹{order.amount}</td>

              <td className="p-5">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${paymentClass(
                    order.payment
                  )}`}
                >
                  {order.payment}
                </span>
              </td>

              <td className="p-5">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${statusClass(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </td>

              <td className="p-5">
                <p className="font-medium">{order.date}</p>
                <p className="text-sm text-gray-500">{order.time}</p>
              </td>

              <td className="p-5">
                <button className="h-9 w-9 rounded-lg hover:bg-gray-100 flex items-center justify-center">
                  <MoreVertical size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;