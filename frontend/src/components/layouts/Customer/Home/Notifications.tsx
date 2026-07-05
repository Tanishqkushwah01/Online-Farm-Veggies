import {
  ArrowLeft,
  Bell,
  ShoppingBag,
  Truck,
  CheckCircle,
  User,
  CreditCard,
  Tag,
  Clock,
} from "lucide-react";

type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type:
    | "order"
    | "delivery"
    | "payment"
    | "profile"
    | "offer"
    | "general";
};

type NotificationProps = {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
};

const Notifications = ({ setActivePage }: NotificationProps) => {
  const notifications: Notification[] = [
    {
      id: 1,
      title: "Order Confirmed",
      message: "Your order #ORD2456 has been placed successfully.",
      time: "2 mins ago",
      read: false,
      type: "order",
    },
    {
      id: 2,
      title: "Order Shipped",
      message: "Your vegetables are on the way.",
      time: "15 mins ago",
      read: false,
      type: "delivery",
    },
    {
      id: 3,
      title: "Payment Successful",
      message: "₹599 payment completed successfully.",
      time: "30 mins ago",
      read: true,
      type: "payment",
    },
    {
      id: 4,
      title: "Profile Updated",
      message: "Your profile has been updated successfully.",
      time: "Yesterday",
      read: true,
      type: "profile",
    },
    {
      id: 5,
      title: "Special Offer",
      message: "Flat 20% OFF on all fresh fruits today.",
      time: "Yesterday",
      read: false,
      type: "offer",
    },
    {
      id: 6,
      title: "Welcome",
      message: "Thank you for joining Online Farm Veggies.",
      time: "2 days ago",
      read: true,
      type: "general",
    },
  ];

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "order":
        return <ShoppingBag className="text-blue-600" size={24} />;

      case "delivery":
        return <Truck className="text-orange-500" size={24} />;

      case "payment":
        return <CreditCard className="text-green-600" size={24} />;

      case "profile":
        return <User className="text-purple-600" size={24} />;

      case "offer":
        return <Tag className="text-pink-600" size={24} />;

      default:
        return <Bell className="text-gray-600" size={24} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Go Back */}
      <button
        onClick={() => setActivePage("home")}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg cursor-pointer transition"
      >
        <ArrowLeft size={18} />
        Go Back
      </button>

      {/* Header */}
      <div className="mt-8 bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-8 text-white shadow-lg">

        <div className="flex items-center gap-4">
          <Bell size={38} />

          <div>
            <h1 className="text-3xl font-bold">
              Notifications
            </h1>

            <p className="text-green-100 mt-1">
              View all your recent activities.
            </p>
          </div>
        </div>

      </div>

      {/* Notification List */}
      <div className="mt-8 space-y-5">

        {notifications.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-2xl shadow-md p-6 flex justify-between items-start transition hover:shadow-xl border-l-4 ${
              item.read
                ? "border-gray-300"
                : "border-green-500"
            }`}
          >
            <div className="flex gap-5">

              <div className="bg-gray-100 h-14 w-14 rounded-full flex items-center justify-center">
                {getIcon(item.type)}
              </div>

              <div>

                <div className="flex items-center gap-2">

                  <h2 className="font-bold text-lg">
                    {item.title}
                  </h2>

                  {!item.read && (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                      New
                    </span>
                  )}

                </div>

                <p className="text-gray-600 mt-1">
                  {item.message}
                </p>

                <div className="flex items-center gap-2 mt-3 text-gray-400 text-sm">
                  <Clock size={15} />
                  {item.time}
                </div>

              </div>

            </div>

            <CheckCircle
              size={22}
              className={
                item.read
                  ? "text-gray-300"
                  : "text-green-600"
              }
            />
          </div>
        ))}

      </div>

      {/* Empty State */}

      {notifications.length === 0 && (
        <div className="bg-white rounded-2xl shadow-md mt-8 p-16 flex flex-col items-center">

          <Bell size={70} className="text-gray-300" />

          <h2 className="text-2xl font-semibold mt-4">
            No Notifications
          </h2>

          <p className="text-gray-500 mt-2">
            You're all caught up.
          </p>

        </div>
      )}

    </div>
  );
};

export default Notifications;