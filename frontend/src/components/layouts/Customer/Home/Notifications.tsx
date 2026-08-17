// import {
//   ArrowLeft,
//   Bell,
//   CheckCircle,
//   Clock,
//   Trash2,
//   XCircle,
// } from "lucide-react";
// import { useEffect, useMemo, useState } from "react";
// import { useNotification } from "../../../hooks/useNotification";
// import type { NotificationType } from "../../../context/NotificationContext";


// type NotificationStyle = {
//   icon: React.ElementType;
//   color: string;
//   bg: string;
// };

// const notificationStyles: Partial<Record<NotificationType, NotificationStyle>> =
//   {
//     order_accepted: {
//       icon: CheckCircle,
//       color: "text-green-600",
//       bg: "bg-green-100",
//     },
//     order_rejected: {
//       icon: XCircle,
//       color: "text-red-600",
//       bg: "bg-red-100",
//     },
//   };

// const filters = ["All", "Accepted", "Rejected", "Unread"];

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

// import { type ActivePage } from "../../../context/CustomerNavigationContext"; // path apne project ke hisaab se

// type NotificationProps = {
//   setActivePage: (page: ActivePage) => void;
// };
// const Notifications = ({ setActivePage }: NotificationProps) => {
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

//   const customerNotifications = useMemo(() => {
//     return notifications.filter(
//       (item) => item.type === "order_accepted" || item.type === "order_rejected"
//     );
//   }, [notifications]);

//   const filteredNotifications = useMemo(() => {
//     if (activeFilter === "Accepted") {
//       return customerNotifications.filter(
//         (item) => item.type === "order_accepted"
//       );
//     }

//     if (activeFilter === "Rejected") {
//       return customerNotifications.filter(
//         (item) => item.type === "order_rejected"
//       );
//     }

//     if (activeFilter === "Unread") {
//       return customerNotifications.filter((item) => !item.isRead);
//     }

//     return customerNotifications;
//   }, [activeFilter, customerNotifications]);

//   const customerUnreadCount = customerNotifications.filter(
//     (item) => !item.isRead
//   ).length;

//   const readCount = Math.max(
//     customerNotifications.length - customerUnreadCount,
//     0
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="flex items-center justify-between gap-4">
//         <button
//           onClick={() => setActivePage("home")}
//           className="flex cursor-pointer items-center gap-2 rounded-xl bg-green-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
//         >
//           <ArrowLeft size={18} />
//           Go Back
//         </button>

//         {customerUnreadCount > 0 && (
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
//               Track your order updates and important alerts.
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
//         <div className="rounded-3xl bg-white p-5 shadow-sm">
//           <p className="text-sm text-gray-500">Total Notifications</p>
//           <h2 className="mt-1 text-3xl font-bold text-slate-900">
//             {customerNotifications.length}
//           </h2>
//         </div>

//         <div className="rounded-3xl bg-white p-5 shadow-sm">
//           <p className="text-sm text-gray-500">Unread</p>
//           <h2 className="mt-1 text-3xl font-bold text-red-500">
//             {customerUnreadCount}
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
//                       : "border-green-500 bg-green-50"
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

// export default Notifications;




import {
  ArrowLeft,
  Bell,
  CheckCircle,
  Clock,
  Trash2,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNotification } from "../../../hooks/useNotification";
import type { NotificationType } from "../../../context/NotificationContext";

type NotificationStyle = {
  icon: React.ElementType;
  color: string;
  bg: string;
};

const notificationStyles: Partial<
  Record<NotificationType, NotificationStyle>
> = {
  order_accepted: {
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  order_rejected: {
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-100",
  },
};

const filters = ["All", "Accepted", "Rejected", "Unread"];

const formatTime = (date: string) => {
  const time = new Date(date).getTime();

  if (Number.isNaN(time)) return "";

  const diff = Date.now() - time;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days === 1) return "Yesterday";

  return `${days} days ago`;
};

import { type ActivePage } from "../../../context/CustomerNavigationContext";

type NotificationProps = {
  setActivePage: (page: ActivePage) => void;
};

const Notifications = ({ setActivePage }: NotificationProps) => {
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

  const customerNotifications = useMemo(() => {
    return notifications.filter(
      (item) =>
        item.type === "order_accepted" ||
        item.type === "order_rejected"
    );
  }, [notifications]);

  const filteredNotifications = useMemo(() => {
    if (activeFilter === "Accepted") {
      return customerNotifications.filter(
        (item) => item.type === "order_accepted"
      );
    }

    if (activeFilter === "Rejected") {
      return customerNotifications.filter(
        (item) => item.type === "order_rejected"
      );
    }

    if (activeFilter === "Unread") {
      return customerNotifications.filter((item) => !item.isRead);
    }

    return customerNotifications;
  }, [activeFilter, customerNotifications]);

  const customerUnreadCount = customerNotifications.filter(
    (item) => !item.isRead
  ).length;

  const readCount = Math.max(
    customerNotifications.length - customerUnreadCount,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 transition-colors duration-200 sm:px-6 sm:py-7 lg:p-8 dark:bg-[#0f171f]">
      {/* Top Actions */}
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <button
          onClick={() => setActivePage("home")}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-green-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>

        {customerUnreadCount > 0 && (
          <button
            onClick={readAllNotifications}
            className="cursor-pointer rounded-xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-[#192128] dark:hover:bg-[#29343c]"
          >
            Mark All Read
          </button>
        )}
      </div>

      {/* Header */}
      <div className="mt-8 rounded-3xl bg-linear-to-r from-green-600 to-green-500 p-6 text-white shadow-lg sm:p-8">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/20">
            <Bell size={34} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>

            <p className="mt-1 text-green-100">
              Track your order updates and important alerts.
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
            {customerNotifications.length}
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-sm transition-colors duration-200 dark:bg-[#141c23]">
          <p className="text-sm text-gray-500 dark:text-[#9aa7b1]">
            Unread
          </p>

          <h2 className="mt-1 text-3xl font-bold text-red-500">
            {customerUnreadCount}
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

      {/* Notifications */}
      <div className="mt-6 rounded-3xl bg-transparent">
        {/* Filters */}
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

        {/* Loading */}
        {loadingNotifications ? (
          <div className="rounded-2xl bg-white p-10 text-center text-sm font-semibold text-gray-500 shadow-sm dark:bg-[#141c23] dark:text-[#9aa7b1]">
            Loading notifications...
          </div>
        ) : filteredNotifications.length === 0 ? (
          /* Empty */
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
          /* Notification List */
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
                      : "border-green-500 bg-green-50 dark:border-[#00c767] dark:bg-[#123126]"
                  }`}
                >
                  <div className="flex min-w-0 gap-4">
                    <div
                      className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-full ${style.bg} dark:bg-[#192128]`}
                    >
                      <Icon
                        size={24}
                        className={`${style.color} dark:text-[#00c767]`}
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="wrap-break-word text-lg font-bold text-slate-900 dark:text-[#f5f7f8]">
                          {item.title}
                        </h2>

                        {!item.isRead && (
                          <span className="rounded-full bg-green-600 px-2 py-1 text-xs font-bold text-white">
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

export default Notifications;