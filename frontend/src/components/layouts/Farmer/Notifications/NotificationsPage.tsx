// import {
//   AlertTriangle,
//   ArrowLeft,
//   Ban,
//   Bell,
//   Clock,
//   Package,
//   Star,
//   Trash2,
//   UserRound,
//   XCircle,
// } from "lucide-react";
// import { useEffect, useMemo, useState } from "react";
// import { useNotification } from "../../../hooks/useNotification";
// import type { NotificationType } from "../../../context/NotificationContext";

// type NotificationsPageProps = {
//   setActivePage: React.Dispatch<React.SetStateAction<string>>;
// };

// type NotificationStyle = {
//   icon: React.ElementType;
//   color: string;
//   bg: string;
//   border: string;
//   unreadBg: string;
//   category: "Orders" | "Inventory" | "Reviews";
// };

// const notificationStyles: Partial<Record<NotificationType, NotificationStyle>> =
//   {
//     new_order: {
//       icon: Package,
//       color: "text-green-600",
//       bg: "bg-green-100",
//       border: "border-green-500",
//       unreadBg: "bg-green-50",
//       category: "Orders",
//     },
//     order_cancelled: {
//       icon: XCircle,
//       color: "text-red-600",
//       bg: "bg-red-100",
//       border: "border-red-500",
//       unreadBg: "bg-red-50",
//       category: "Orders",
//     },
//     product_low_stock: {
//       icon: AlertTriangle,
//       color: "text-orange-600",
//       bg: "bg-orange-100",
//       border: "border-orange-500",
//       unreadBg: "bg-orange-50",
//       category: "Inventory",
//     },
//     product_out_of_stock: {
//       icon: Ban,
//       color: "text-red-600",
//       bg: "bg-red-100",
//       border: "border-red-500",
//       unreadBg: "bg-red-50",
//       category: "Inventory",
//     },
//     new_product_review: {
//       icon: Star,
//       color: "text-yellow-600",
//       bg: "bg-yellow-100",
//       border: "border-yellow-500",
//       unreadBg: "bg-yellow-50",
//       category: "Reviews",
//     },
//     new_farmer_review: {
//       icon: UserRound,
//       color: "text-purple-600",
//       bg: "bg-purple-100",
//       border: "border-purple-500",
//       unreadBg: "bg-purple-50",
//       category: "Reviews",
//     },
//   };

// const filters = ["All", "Orders", "Inventory", "Reviews", "Unread"];

// const formatTime = (date: string) => {
//   const time = new Date(date).getTime();
//   if (Number.isNaN(time)) return "";

//   const diff = Date.now() - time;
//   const minutes = Math.floor(diff / 60000);
//   const hours = Math.floor(diff / 3600000);
//   const days = Math.floor(diff / 86400000);

//   if (minutes < 1) return "Just now";
//   if (minutes < 60) return `${minutes} min ago`;
//   if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
//   if (days === 1) return "Yesterday";

//   return `${days} days ago`;
// };

// const NotificationsPage = ({ setActivePage }: NotificationsPageProps) => {
//   const [activeFilter, setActiveFilter] = useState("All");

//   const {
//     notifications,
//     loadingNotifications,
//     fetchNotifications,
//     readNotification,
//     readAllNotifications,
//     removeNotification,
//   } = useNotification();

//   useEffect(() => {
//     fetchNotifications(1, 20);
//   }, [fetchNotifications]);

//   const farmerNotifications = useMemo(() => {
//     return notifications.filter((item) =>
//       [
//         "new_order",
//         "order_cancelled",
//         "product_low_stock",
//         "product_out_of_stock",
//         "new_product_review",
//         "new_farmer_review",
//       ].includes(item.type)
//     );
//   }, [notifications]);

//   const farmerUnreadCount = farmerNotifications.filter(
//     (item) => !item.isRead
//   ).length;

//   const readCount = Math.max(farmerNotifications.length - farmerUnreadCount, 0);

//   const filteredNotifications = useMemo(() => {
//     if (activeFilter === "Unread") {
//       return farmerNotifications.filter((item) => !item.isRead);
//     }

//     if (activeFilter === "All") return farmerNotifications;

//     return farmerNotifications.filter((item) => {
//       const style = notificationStyles[item.type];
//       return style?.category === activeFilter;
//     });
//   }, [activeFilter, farmerNotifications]);

//   return (
//     <div className="min-h-full bg-gray-100 p-8">
//       <div className="flex items-center justify-between gap-4">
//         <button
//           onClick={() => setActivePage("dashboard")}
//           className="flex cursor-pointer items-center gap-2 rounded-xl bg-green-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
//         >
//           <ArrowLeft size={18} />
//           Go Back
//         </button>

//         {farmerUnreadCount > 0 && (
//           <button
//             onClick={readAllNotifications}
//             className="cursor-pointer rounded-xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
//           >
//             Mark All Read
//           </button>
//         )}
//       </div>

//       <div className="mt-8 rounded-3xl bg-linear-to-r from-green-600 to-green-500 p-8 text-white shadow-lg">
//         <div className="flex items-center gap-4">
//           <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
//             <Bell size={34} />
//           </div>

//           <div>
//             <h1 className="text-3xl font-bold">Notifications</h1>
//             <p className="mt-1 text-green-100">
//               Track your orders, reviews and stock alerts.
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
//         <div className="rounded-3xl bg-white p-5 shadow-sm">
//           <p className="text-sm text-gray-500">Total Notifications</p>
//           <h2 className="mt-1 text-3xl font-bold text-slate-900">
//             {farmerNotifications.length}
//           </h2>
//         </div>

//         <div className="rounded-3xl bg-white p-5 shadow-sm">
//           <p className="text-sm text-gray-500">Unread</p>
//           <h2 className="mt-1 text-3xl font-bold text-red-500">
//             {farmerUnreadCount}
//           </h2>
//         </div>

//         <div className="rounded-3xl bg-white p-5 shadow-sm">
//           <p className="text-sm text-gray-500">Read</p>
//           <h2 className="mt-1 text-3xl font-bold text-green-600">
//             {readCount}
//           </h2>
//         </div>
//       </div>

//       <div className="mt-6 rounded-3xl bg-transparent">
//         <div className="mb-5 flex flex-wrap gap-3">
//           {filters.map((item) => (
//             <button
//               key={item}
//               onClick={() => setActiveFilter(item)}
//               className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-semibold transition ${
//                 activeFilter === item
//                   ? "border-green-600 bg-green-600 text-white"
//                   : "border-gray-200 bg-white text-slate-600 hover:bg-green-600 hover:text-white"
//               }`}
//             >
//               {item}
//             </button>
//           ))}
//         </div>

//         {loadingNotifications ? (
//           <div className="rounded-2xl bg-white p-10 text-center text-sm font-semibold text-gray-500 shadow-sm">
//             Loading notifications...
//           </div>
//         ) : filteredNotifications.length === 0 ? (
//           <div className="rounded-2xl bg-white p-14 text-center shadow-sm">
//             <Bell size={60} className="mx-auto text-gray-300" />
//             <h2 className="mt-4 text-xl font-bold text-slate-900">
//               No Notifications
//             </h2>
//             <p className="mt-1 text-sm text-gray-500">
//               You're all caught up.
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {filteredNotifications.map((item) => {
//               const style = notificationStyles[item.type];
//               if (!style) return null;

//               const Icon = style.icon;

//               return (
//                 <div
//                   key={item._id}
//                   onClick={() => {
//                     if (!item.isRead) readNotification(item._id);
//                   }}
//                   className={`flex cursor-pointer items-start justify-between gap-5 rounded-2xl border-l-4 p-5 shadow-sm transition hover:shadow-md ${
//                     item.isRead
//                       ? "border-gray-300 bg-white"
//                       : `${style.border} ${style.unreadBg}`
//                   }`}
//                 >
//                   <div className="flex min-w-0 gap-4">
//                     <div
//                       className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-full ${style.bg}`}
//                     >
//                       <Icon size={24} className={style.color} />
//                     </div>

//                     <div className="min-w-0">
//                       <div className="flex items-center gap-2">
//                         <h2 className="truncate text-lg font-bold text-slate-900">
//                           {item.title}
//                         </h2>

//                         {!item.isRead && (
//                           <span className="rounded-full bg-green-600 px-2 py-1 text-xs font-bold text-white">
//                             New
//                           </span>
//                         )}
//                       </div>

//                       <p className="mt-1 text-sm text-gray-600">
//                         {item.message}
//                       </p>

//                       <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-gray-400">
//                         <Clock size={15} />
//                         {formatTime(item.createdAt)}
//                       </div>
//                     </div>
//                   </div>

//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       removeNotification(item._id);
//                     }}
//                     className="cursor-pointer rounded-full p-2 text-gray-400 transition hover:bg-red-100 hover:text-red-600"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NotificationsPage;



import {
  AlertTriangle,
  ArrowLeft,
  Ban,
  Bell,
  Clock,
  Package,
  Star,
  Trash2,
  UserRound,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNotification } from "../../../hooks/useNotification";
import type { NotificationType } from "../../../context/NotificationContext";

type NotificationsPageProps = {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
};

type NotificationStyle = {
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  unreadBg: string;
  category: "Orders" | "Inventory" | "Reviews";
};

const notificationStyles: Partial<
  Record<NotificationType, NotificationStyle>
> = {
  new_order: {
    icon: Package,
    color: "text-green-600 dark:text-[#00c767]",
    bg: "bg-green-100 dark:bg-[#123126]",
    border: "border-green-500",
    unreadBg: "bg-green-50 dark:bg-[#123126]",
    category: "Orders",
  },

  order_cancelled: {
    icon: XCircle,
    color: "text-red-600 dark:text-[#ff6578]",
    bg: "bg-red-100 dark:bg-[#321d24]",
    border: "border-red-500",
    unreadBg: "bg-red-50 dark:bg-[#321d24]",
    category: "Orders",
  },

  product_low_stock: {
    icon: AlertTriangle,
    color: "text-orange-600 dark:text-[#ffad63]",
    bg: "bg-orange-100 dark:bg-[#35261b]",
    border: "border-orange-500",
    unreadBg: "bg-orange-50 dark:bg-[#35261b]",
    category: "Inventory",
  },

  product_out_of_stock: {
    icon: Ban,
    color: "text-red-600 dark:text-[#ff6578]",
    bg: "bg-red-100 dark:bg-[#321d24]",
    border: "border-red-500",
    unreadBg: "bg-red-50 dark:bg-[#321d24]",
    category: "Inventory",
  },

  new_product_review: {
    icon: Star,
    color: "text-yellow-600 dark:text-[#f3c969]",
    bg: "bg-yellow-100 dark:bg-[#352e18]",
    border: "border-yellow-500",
    unreadBg: "bg-yellow-50 dark:bg-[#352e18]",
    category: "Reviews",
  },

  new_farmer_review: {
    icon: UserRound,
    color: "text-purple-600 dark:text-[#c59aff]",
    bg: "bg-purple-100 dark:bg-[#2b2035]",
    border: "border-purple-500",
    unreadBg: "bg-purple-50 dark:bg-[#2b2035]",
    category: "Reviews",
  },
};

const filters = ["All", "Orders", "Inventory", "Reviews", "Unread"];

const formatTime = (date: string) => {
  const time = new Date(date).getTime();

  if (Number.isNaN(time)) return "";

  const diff = Date.now() - time;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }
  if (days === 1) return "Yesterday";

  return `${days} days ago`;
};

const NotificationsPage = ({
  setActivePage,
}: NotificationsPageProps) => {
  const [activeFilter, setActiveFilter] = useState("All");

  const {
    notifications,
    loadingNotifications,
    fetchNotifications,
    readNotification,
    readAllNotifications,
    removeNotification,
  } = useNotification();

  useEffect(() => {
    fetchNotifications(1, 20);
  }, [fetchNotifications]);

  const farmerNotifications = useMemo(() => {
    return notifications.filter((item) =>
      [
        "new_order",
        "order_cancelled",
        "product_low_stock",
        "product_out_of_stock",
        "new_product_review",
        "new_farmer_review",
      ].includes(item.type)
    );
  }, [notifications]);

  const farmerUnreadCount = farmerNotifications.filter(
    (item) => !item.isRead
  ).length;

  const readCount = Math.max(
    farmerNotifications.length - farmerUnreadCount,
    0
  );

  const filteredNotifications = useMemo(() => {
    if (activeFilter === "Unread") {
      return farmerNotifications.filter((item) => !item.isRead);
    }

    if (activeFilter === "All") {
      return farmerNotifications;
    }

    return farmerNotifications.filter((item) => {
      const style = notificationStyles[item.type];
      return style?.category === activeFilter;
    });
  }, [activeFilter, farmerNotifications]);

  return (
    <div className="min-h-full bg-gray-100 px-4 py-6 transition-colors duration-200 sm:px-6 sm:py-7 lg:p-8 dark:bg-[#0f171f]">
      {/* Top Actions */}
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <button
          onClick={() => setActivePage("dashboard")}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-green-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>

        {farmerUnreadCount > 0 && (
          <button
            onClick={readAllNotifications}
            className="cursor-pointer rounded-xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-[#192128] dark:hover:bg-[#29343c]"
          >
            Mark All Read
          </button>
        )}
      </div>

      {/* Hero */}
      <div className="mt-8 rounded-3xl bg-linear-to-r from-green-600 to-green-500 p-6 text-white shadow-lg sm:p-8">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/20">
            <Bell size={34} />
          </div>

          <div className="min-w-0">
            <h1 className="text-3xl font-bold">
              Notifications
            </h1>

            <p className="mt-1 wrap-break-word text-green-100">
              Track your orders, reviews and stock alerts.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-5 shadow-sm transition-colors duration-200 dark:bg-[#141c23]">
          <p className="text-sm text-gray-500 dark:text-[#9aa7b1]">
            Total Notifications
          </p>

          <h2 className="mt-1 text-3xl font-bold text-slate-900 dark:text-[#f5f7f8]">
            {farmerNotifications.length}
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-sm transition-colors duration-200 dark:bg-[#141c23]">
          <p className="text-sm text-gray-500 dark:text-[#9aa7b1]">
            Unread
          </p>

          <h2 className="mt-1 text-3xl font-bold text-red-500">
            {farmerUnreadCount}
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-sm transition-colors duration-200 dark:bg-[#141c23]">
          <p className="text-sm text-gray-500 dark:text-[#9aa7b1]">
            Read
          </p>

          <h2 className="mt-1 text-3xl font-bold text-green-600">
            {readCount}
          </h2>
        </div>
      </div>

      {/* Filters + Notifications */}
      <div className="mt-6 rounded-3xl bg-transparent">
        <div className="mb-5 flex flex-wrap gap-3">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setActiveFilter(item)}
              className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-semibold transition ${
                activeFilter === item
                  ? "border-green-600 bg-green-600 text-white"
                  : "border-gray-200 bg-white text-slate-600 hover:bg-green-600 hover:text-white dark:border-[#29343c] dark:bg-[#141c23] dark:text-[#9aa7b1]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {loadingNotifications ? (
          <div className="rounded-2xl bg-white p-10 text-center text-sm font-semibold text-gray-500 shadow-sm dark:bg-[#141c23] dark:text-[#9aa7b1]">
            Loading notifications...
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm sm:p-14 dark:bg-[#141c23]">
            <Bell
              size={60}
              className="mx-auto text-gray-300 dark:text-[#47535c]"
            />

            <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-[#f5f7f8]">
              No Notifications
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-[#9aa7b1]">
              You're all caught up.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((item) => {
              const style = notificationStyles[item.type];

              if (!style) return null;

              const Icon = style.icon;

              return (
                <div
                  key={item._id}
                  onClick={() => {
                    if (!item.isRead) {
                      readNotification(item._id);
                    }
                  }}
                  className={`flex cursor-pointer flex-col gap-4 rounded-2xl border-l-4 p-5 shadow-sm transition hover:shadow-md sm:flex-row sm:items-start sm:justify-between sm:gap-5 ${
                    item.isRead
                      ? "border-gray-300 bg-white dark:border-[#47535c] dark:bg-[#141c23]"
                      : `${style.border} ${style.unreadBg}`
                  }`}
                >
                  <div className="flex min-w-0 gap-4">
                    <div
                      className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-full ${style.bg}`}
                    >
                      <Icon
                        size={24}
                        className={style.color}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex min-w-0 flex-wrap items-center gap-2">
                        <h2 className="min-w-0 wrap-break-word text-lg font-bold text-slate-900 dark:text-[#f5f7f8]">
                          {item.title}
                        </h2>

                        {!item.isRead && (
                          <span className="shrink-0 rounded-full bg-green-600 px-2 py-1 text-xs font-bold text-white">
                            New
                          </span>
                        )}
                      </div>

                      <p className="mt-1 wrap-break-word text-sm text-gray-600 dark:text-[#9aa7b1]">
                        {item.message}
                      </p>

                      <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-gray-400 dark:text-[#71808a]">
                        <Clock size={15} />
                        {formatTime(item.createdAt)}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeNotification(item._id);
                    }}
                    className="self-end cursor-pointer rounded-full p-2 text-gray-400 transition hover:bg-red-100 hover:text-red-600 sm:self-start dark:hover:bg-[#321d24] dark:hover:text-[#ff6578]"
                    aria-label="Delete notification"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;