// import {
//   AlertTriangle,
//   ArrowRight,
//   Bell,
//   CheckCircle,
//   Package,
//   Star,
//   X,
//   XCircle,
// } from "lucide-react";

// type NotificationCardProps = {
//   onClose: () => void;
//   onViewAll: () => void;
// };

// const notifications = [
//   {
//     id: 1,
//     title: "New Order",
//     message: "Rahul Sharma placed an order for Fresh Cucumber.",
//     time: "5 min ago",
//     icon: Package,
//     color: "bg-green-100 text-green-600",
//   },
//   {
//     id: 2,
//     title: "Product Low Stock",
//     message: "Tomato stock is running low. Only 4 left.",
//     time: "20 min ago",
//     icon: AlertTriangle,
//     color: "bg-orange-100 text-orange-600",
//   },
//   {
//     id: 3,
//     title: "New Product Review",
//     message: "A customer gave 5 stars to your product.",
//     time: "1 hour ago",
//     icon: Star,
//     color: "bg-yellow-100 text-yellow-600",
//   },
//   {
//     id: 4,
//     title: "Order Delivered",
//     message: "Order #ORD1023 has been delivered.",
//     time: "2 hours ago",
//     icon: CheckCircle,
//     color: "bg-blue-100 text-blue-600",
//   },
//   {
//     id: 5,
//     title: "Order Cancelled",
//     message: "Order #ORD1024 has been cancelled.",
//     time: "Yesterday",
//     icon: XCircle,
//     color: "bg-red-100 text-red-600",
//   },
// ];

// const NotificationCard = ({ onClose, onViewAll }: NotificationCardProps) => {
//   return (
//     <div className="absolute right-0 top-13 z-[99999] w-[325px] rounded-[22px] border border-gray-100 bg-white p-3 shadow-2xl">
//       <div className="mb-2.5 flex items-center justify-between">
//         <div className="flex items-center gap-2.5">
//           <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
//             <Bell size={17} />
//           </div>

//           <div>
//             <h2 className="text-[17px] font-bold leading-5 text-slate-900">
//               Notifications
//             </h2>
//             <p className="text-[11px] text-slate-500">Recent updates</p>
//           </div>
//         </div>

//         <button
//           onClick={onClose}
//           className="cursor-pointer rounded-full p-1.5 transition hover:bg-gray-100"
//         >
//           <X size={18} className="text-slate-500" />
//         </button>
//       </div>

//       <div className="space-y-1.5">
//         {notifications.slice(0, 5).map((item) => {
//           const Icon = item.icon;

//           return (
//             <div
//               key={item.id}
//               className="flex gap-2 rounded-xl bg-gray-50 p-2 transition hover:bg-gray-100"
//             >
//               <div
//                 className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${item.color}`}
//               >
//                 <Icon size={15} />
//               </div>

//               <div className="min-w-0 flex-1">
//                 <h3 className="text-[13px] font-semibold leading-4 text-slate-900">
//                   {item.title}
//                 </h3>

//                 <p className="mt-0.5 truncate text-[12px] leading-4 text-slate-500">
//                   {item.message}
//                 </p>

//                 <p className="mt-0.5 text-[10px] font-medium text-slate-400">
//                   {item.time}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <button
//         onClick={onViewAll}
//         className="mt-2.5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-green-600 py-2 text-[13px] font-semibold text-white transition hover:bg-green-700"
//       >
//         View All Notifications
//         <ArrowRight size={15} />
//       </button>
//     </div>
//   );
// };

// export default NotificationCard;

import {
  AlertTriangle,
  ArrowRight,
  Bell,
  CheckCircle,
  Package,
  Star,
  UserRound,
  X,
  XCircle,
  Ban,
} from "lucide-react";
import { useNotification } from "../../../hooks/useNotification";

type NotificationCardProps = {
  onClose: () => void;
  onViewAll: () => void;
};

const notificationStyles = {
  new_order: {
    icon: Package,
    color: "bg-green-100 text-green-600",
  },
  order_cancelled: {
    icon: XCircle,
    color: "bg-red-100 text-red-600",
  },
  product_low_stock: {
    icon: AlertTriangle,
    color: "bg-orange-100 text-orange-600",
  },
  product_out_of_stock: {
    icon: Ban,
    color: "bg-gray-200 text-gray-700",
  },
  new_product_review: {
    icon: Star,
    color: "bg-yellow-100 text-yellow-600",
  },
  new_farmer_review: {
    icon: UserRound,
    color: "bg-purple-100 text-purple-600",
  },
  order_accepted: {
    icon: CheckCircle,
    color: "bg-blue-100 text-blue-600",
  },
  order_rejected: {
    icon: XCircle,
    color: "bg-red-100 text-red-600",
  },
};

const formatTime = (date: string) => {
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
};

const NotificationCard = ({ onClose, onViewAll }: NotificationCardProps) => {
  const {
    latestNotifications,
    loadingNotifications,
    readNotification,
  } = useNotification();

  return (
    <div className="absolute right-0 top-13 z-[99999] w-[325px] rounded-[22px] border border-gray-100 bg-white p-3 shadow-2xl">
      <div className="mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
            <Bell size={17} />
          </div>

          <div>
            <h2 className="text-[17px] font-bold leading-5 text-slate-900">
              Notifications
            </h2>
            <p className="text-[11px] text-slate-500">Recent updates</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="cursor-pointer rounded-full p-1.5 transition hover:bg-gray-100"
        >
          <X size={18} className="text-slate-500" />
        </button>
      </div>

      <div className="space-y-1.5">
        {loadingNotifications ? (
          <div className="rounded-xl bg-gray-50 p-4 text-center text-xs font-medium text-slate-500">
            Loading notifications...
          </div>
        ) : latestNotifications.length === 0 ? (
          <div className="rounded-xl bg-gray-50 p-4 text-center text-xs font-medium text-slate-500">
            No new notifications
          </div>
        ) : (
          latestNotifications.map((item) => {
            const style = notificationStyles[item.type];
            const Icon = style.icon;

            return (
              <button
                key={item._id}
                onClick={() => {
                  if (!item.isRead) {
                    readNotification(item._id);
                  }
                }}
                className={`flex w-full cursor-pointer gap-2 rounded-xl p-2 text-left transition hover:bg-gray-100 ${
                  item.isRead ? "bg-gray-50" : "bg-green-50"
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${style.color}`}
                >
                  <Icon size={15} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="truncate text-[13px] font-semibold leading-4 text-slate-900">
                      {item.title}
                    </h3>

                    {!item.isRead && (
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                    )}
                  </div>

                  <p className="mt-0.5 truncate text-[12px] leading-4 text-slate-500">
                    {item.message}
                  </p>

                  <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                    {formatTime(item.createdAt)}
                  </p>
                </div>
              </button>
            );
          })
        )}
      </div>

      <button
        onClick={onViewAll}
        className="mt-2.5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-green-600 py-2 text-[13px] font-semibold text-white transition hover:bg-green-700"
      >
        View All Notifications
        <ArrowRight size={15} />
      </button>
    </div>
  );
};

export default NotificationCard;