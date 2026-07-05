import {
  ArrowLeft,
  ShoppingBag,
  Truck,
  CheckCircle,
  Clock,
} from "lucide-react";

type OrdersProps = {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
};

const Orders = ({ setActivePage }: OrdersProps) => {
  const orders = [
    {
      id: "ORD-1001",
      productName: "Fresh Tomato",
      quantity: "2 kg",
      price: 80,
      status: "Delivered",
      date: "03 July 2026",
      image: "https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=500",
    },
    {
      id: "ORD-1002",
      productName: "Organic Potato",
      quantity: "5 kg",
      price: 150,
      status: "On the way",
      date: "02 July 2026",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500",
    },
    {
      id: "ORD-1003",
      productName: "Green Capsicum",
      quantity: "1 kg",
      price: 60,
      status: "Pending",
      date: "01 July 2026",
      image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=500",
    },
  ];

  const getStatusIcon = (status: string) => {
    if (status === "Delivered") {
      return <CheckCircle size={18} className="text-green-600" />;
    }

    if (status === "On the way") {
      return <Truck size={18} className="text-blue-600" />;
    }

    return <Clock size={18} className="text-yellow-600" />;
  };

  return (
    <div className="min-h-screen bg-[#F5F7F5] px-8 py-8">
      <button
        onClick={() => setActivePage("home")}
        className="mb-8 flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 cursor-pointer"
      >
        <ArrowLeft size={22} />
        Go Back
      </button>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
          <ShoppingBag size={36} className="text-green-700" />
          My Orders
        </h1>
        <p className="text-gray-500 mt-2">
          All your vegetable orders are visible here
        </p>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition p-5 flex items-center gap-5"
            >
              <img
                src={order.image}
                alt={order.productName}
                className="h-24 w-24 rounded-xl object-cover"
              />

              <div className="flex-1">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {order.productName}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Order ID: {order.id}
                    </p>

                    <p className="text-sm text-gray-500">
                      Date: {order.date}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-green-700">
                      ₹{order.price}
                    </p>

                    <p className="text-sm text-gray-500">
                      Qty: {order.quantity}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-700">
                    {getStatusIcon(order.status)}
                    {order.status}
                  </div>

                  <button className="px-5 py-2 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition cursor-pointer">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-[60vh] flex flex-col items-center justify-center text-center">
          <ShoppingBag size={75} className="text-gray-300 mb-4" />

          <h2 className="text-2xl font-bold text-gray-800">
            No orders found
          </h2>

          <p className="text-gray-500 mt-2">
            Your placed orders will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default Orders;