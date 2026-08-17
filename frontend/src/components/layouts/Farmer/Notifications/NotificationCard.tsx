// import {
//   AlertTriangle,
//   ArrowRight,
//   Bell,
//   CheckCircle,
//   Package,
//   Star,
//   UserRound,
//   X,
//   XCircle,
//   Ban,
// } from "lucide-react";
// import { useNotification } from "../../../hooks/useNotification";

// type NotificationCardProps = {
//   onClose: () => void;
//   onViewAll: () => void;
// };

// const notificationStyles = {
//   new_order: {
//     icon: Package,
//     color: "bg-green-100 text-green-600",
//   },
//   order_cancelled: {
//     icon: XCircle,
//     color: "bg-red-100 text-red-600",
//   },
//   product_low_stock: {
//     icon: AlertTriangle,
//     color: "bg-orange-100 text-orange-600",
//   },
//   product_out_of_stock: {
//     icon: Ban,
//     color: "bg-gray-200 text-gray-700",
//   },
//   new_product_review: {
//     icon: Star,
//     color: "bg-yellow-100 text-yellow-600",
//   },
//   new_farmer_review: {
//     icon: UserRound,
//     color: "bg-purple-100 text-purple-600",
//   },
//   order_accepted: {
//     icon: CheckCircle,
//     color: "bg-blue-100 text-blue-600",
//   },
//   order_rejected: {
//     icon: XCircle,
//     color: "bg-red-100 text-red-600",
//   },
// };

// const formatTime = (date: string) => {
//   const diff = Date.now() - new Date(date).getTime();
//   const minutes = Math.floor(diff / 60000);
//   const hours = Math.floor(diff / 3600000);
//   const days = Math.floor(diff / 86400000);

//   if (minutes < 1) return "Just now";
//   if (minutes < 60) return `${minutes} min ago`;
//   if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
//   if (days === 1) return "Yesterday";
//   return `${days} days ago`;
// };

// const NotificationCard = ({ onClose, onViewAll }: NotificationCardProps) => {
//   const {
//     latestNotifications,
//     loadingNotifications,
//     readNotification,
//   } = useNotification();

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
//         {loadingNotifications ? (
//           <div className="rounded-xl bg-gray-50 p-4 text-center text-xs font-medium text-slate-500">
//             Loading notifications...
//           </div>
//         ) : latestNotifications.length === 0 ? (
//           <div className="rounded-xl bg-gray-50 p-4 text-center text-xs font-medium text-slate-500">
//             No new notifications
//           </div>
//         ) : (
//           latestNotifications.map((item) => {
//             const style = notificationStyles[item.type];
//             const Icon = style.icon;

//             return (
//               <button
//                 key={item._id}
//                 onClick={() => {
//                   if (!item.isRead) {
//                     readNotification(item._id);
//                   }
//                 }}
//                 className={`flex w-full cursor-pointer gap-2 rounded-xl p-2 text-left transition hover:bg-gray-100 ${
//                   item.isRead ? "bg-gray-50" : "bg-green-50"
//                 }`}
//               >
//                 <div
//                   className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${style.color}`}
//                 >
//                   <Icon size={15} />
//                 </div>

//                 <div className="min-w-0 flex-1">
//                   <div className="flex items-center gap-1.5">
//                     <h3 className="truncate text-[13px] font-semibold leading-4 text-slate-900">
//                       {item.title}
//                     </h3>

//                     {!item.isRead && (
//                       <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
//                     )}
//                   </div>

//                   <p className="mt-0.5 truncate text-[12px] leading-4 text-slate-500">
//                     {item.message}
//                   </p>

//                   <p className="mt-0.5 text-[10px] font-medium text-slate-400">
//                     {formatTime(item.createdAt)}
//                   </p>
//                 </div>
//               </button>
//             );
//           })
//         )}
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
    color:
      "bg-green-100 text-green-600 dark:bg-[#123126] dark:text-[#00c767]",
  },

  order_cancelled: {
    icon: XCircle,
    color:
      "bg-red-100 text-red-600 dark:bg-[#321d24] dark:text-[#ff6578]",
  },

  product_low_stock: {
    icon: AlertTriangle,
    color:
      "bg-orange-100 text-orange-600 dark:bg-[#35261b] dark:text-[#ffad63]",
  },

  product_out_of_stock: {
    icon: Ban,
    color:
      "bg-gray-200 text-gray-700 dark:bg-[#29343c] dark:text-[#9aa7b1]",
  },

  new_product_review: {
    icon: Star,
    color:
      "bg-yellow-100 text-yellow-600 dark:bg-[#352e18] dark:text-[#f3c969]",
  },

  new_farmer_review: {
    icon: UserRound,
    color:
      "bg-purple-100 text-purple-600 dark:bg-[#2b2035] dark:text-[#c59aff]",
  },

  order_accepted: {
    icon: CheckCircle,
    color:
      "bg-blue-100 text-blue-600 dark:bg-[#122432] dark:text-[#66b8ff]",
  },

  order_rejected: {
    icon: XCircle,
    color:
      "bg-red-100 text-red-600 dark:bg-[#321d24] dark:text-[#ff6578]",
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

const NotificationCard = ({
  onClose,
  onViewAll,
}: NotificationCardProps) => {
  const {
    latestNotifications,
    loadingNotifications,
    readNotification,
  } = useNotification();

  return (
    <>
      {/* Mobile backdrop */}
      <button
        type="button"
        aria-label="Close notification panel"
        onClick={onClose}
        className="
          fixed
          inset-0
          z-99998
          bg-black/30
          backdrop-blur-[1px]
          sm:hidden
        "
      />

      {/* Notification Card */}
      <div
        className="
          fixed
          left-1/2
          top-20
          z-99999
          w-[calc(100vw-1rem)]
          max-w-81.25
          -translate-x-1/2
          rounded-[22px]
          border
          border-gray-100
          bg-white
          p-3
          shadow-2xl
          transition-colors
          duration-200

          dark:border-[#29343c]
          dark:bg-[#141c23]

          sm:absolute
          sm:left-auto
          sm:right-0
          sm:top-13
          sm:w-81.25
          sm:max-w-81.25
          sm:translate-x-0
        "
      >
        {/* Header */}
        <div className="mb-2.5 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-[#123126] dark:text-[#00c767]">
              <Bell size={17} />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-[17px] font-bold leading-5 text-slate-900 dark:text-[#f5f7f8]">
                Notifications
              </h2>

              <p className="text-[11px] text-slate-500 dark:text-[#71808a]">
                Recent updates
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 cursor-pointer rounded-full p-1.5 transition hover:bg-gray-100 dark:hover:bg-[#192128]"
            aria-label="Close notifications"
          >
            <X
              size={18}
              className="text-slate-500 dark:text-[#9aa7b1]"
            />
          </button>
        </div>

        {/* Notifications */}
        <div className="max-h-[55vh] space-y-1.5 overflow-y-auto no-scrollbar">
          {loadingNotifications ? (
            <div className="rounded-xl bg-gray-50 p-4 text-center text-xs font-medium text-slate-500 dark:bg-[#192128] dark:text-[#9aa7b1]">
              Loading notifications...
            </div>
          ) : latestNotifications.length === 0 ? (
            <div className="rounded-xl bg-gray-50 p-4 text-center text-xs font-medium text-slate-500 dark:bg-[#192128] dark:text-[#9aa7b1]">
              No new notifications
            </div>
          ) : (
            latestNotifications.map((item) => {
              const style = notificationStyles[item.type];

              if (!style) return null;

              const Icon = style.icon;

              return (
                <button
                  key={item._id}
                  type="button"
                  onClick={() => {
                    if (!item.isRead) {
                      readNotification(item._id);
                    }
                  }}
                  className={`flex w-full min-w-0 cursor-pointer gap-2 rounded-xl p-2 text-left transition ${
                    item.isRead
                      ? "bg-gray-50 hover:bg-gray-100 dark:bg-[#192128] dark:hover:bg-[#29343c]"
                      : "bg-green-50 hover:bg-green-100 dark:bg-[#123126] dark:hover:bg-[#173d2e]"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${style.color}`}
                  >
                    <Icon size={15} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex min-w-0 items-center gap-1.5">
                      <h3 className="min-w-0 truncate text-[13px] font-semibold leading-4 text-slate-900 dark:text-[#f5f7f8]">
                        {item.title}
                      </h3>

                      {!item.isRead && (
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                      )}
                    </div>

                    <p className="mt-0.5 truncate text-[12px] leading-4 text-slate-500 dark:text-[#9aa7b1]">
                      {item.message}
                    </p>

                    <p className="mt-0.5 text-[10px] font-medium text-slate-400 dark:text-[#71808a]">
                      {formatTime(item.createdAt)}
                    </p>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* View All */}
        <button
          type="button"
          onClick={onViewAll}
          className="
            mt-2.5
            flex
            w-full
            cursor-pointer
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-green-600
            py-2
            text-[13px]
            font-semibold
            text-white
            transition
            hover:bg-green-700
          "
        >
          View All Notifications
          <ArrowRight size={15} />
        </button>
      </div>
    </>
  );
};

export default NotificationCard;