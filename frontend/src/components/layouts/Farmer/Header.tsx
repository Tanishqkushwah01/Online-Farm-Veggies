// import { Bell, CalendarDays, Clock3, User } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import ProfileCard from "./ProfileCard";
// import NotificationCard from "./Notifications/NotificationCard";
// import { useNotification } from "../../hooks/useNotification";

// type HeaderProps = {
//   username: string;
//   setActivePage: React.Dispatch<React.SetStateAction<string>>;
// };

// const Header = ({ username, setActivePage }: HeaderProps) => {
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [notificationOpen, setNotificationOpen] = useState(false);

//   const { unreadCount } = useNotification();

//   const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

//   const profileRef = useRef<HTMLDivElement>(null);
//   const notificationRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (
//         profileRef.current &&
//         !profileRef.current.contains(e.target as Node)
//       ) {
//         setProfileOpen(false);
//       }

//       if (
//         notificationRef.current &&
//         !notificationRef.current.contains(e.target as Node)
//       ) {
//         setNotificationOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const today = new Date();

//   const formattedDate = today.toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "long",
//     year: "numeric",
//   });

//   const dayName = today.toLocaleDateString("en-IN", {
//     weekday: "long",
//   });

//   const lastLogin = userInfo.lastLogin
//     ? new Date(userInfo.lastLogin).toLocaleString("en-IN", {
//         day: "2-digit",
//         month: "short",
//         hour: "numeric",
//         minute: "2-digit",
//       })
//     : "First Login";

//   return (
//     <header className="relative flex h-24 items-center justify-between border-b border-gray-200 bg-[#f1f1f1] px-8">
//       <div>
//         <h1 className="text-3xl font-bold text-slate-900">Welcome Back!</h1>
//         <p className="mt-1 text-xl text-slate-600">{username}</p>
//       </div>

//       <div className="flex items-center gap-5">
//         <div className="group flex h-16 min-w-55 cursor-pointer items-center gap-4 rounded-2xl border border-gray-200 bg-[#f1f1f1] px-5 shadow-[0_6px_16px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:bg-gray-300 hover:shadow-[0_10px_24px_rgba(15,23,42,0.12)]">
//           <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/70 transition duration-300 group-hover:bg-white">
//             <Clock3 size={24} className="text-green-600" />
//           </div>

//           <div>
//             <p className="text-base font-bold text-slate-900">Last Login</p>
//             <p className="text-sm font-medium text-slate-600">{lastLogin}</p>
//           </div>
//         </div>

//         <div className="group flex h-16 min-w-60 cursor-pointer items-center gap-4 rounded-2xl border border-gray-200 bg-[#f1f1f1] px-5 shadow-[0_6px_16px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:bg-gray-300 hover:shadow-[0_10px_24px_rgba(15,23,42,0.12)]">
//           <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/70 transition duration-300 group-hover:bg-white">
//             <CalendarDays size={24} className="text-slate-700" />
//           </div>

//           <div>
//             <p className="text-base font-bold text-slate-900">
//               {formattedDate}
//             </p>
//             <p className="text-sm font-medium text-slate-600">{dayName}</p>
//           </div>
//         </div>

//         <div ref={notificationRef} className="relative">
//           <button
//             onClick={() => {
//               setNotificationOpen((prev) => !prev);
//               setProfileOpen(false);
//             }}
//             className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition hover:bg-gray-300"
//           >
//             <Bell size={22} className="text-slate-700" />

//             {unreadCount > 0 && (
//               <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-green-600 ring-2 ring-[#f1f1f1]" />
//             )}
//           </button>

//           {notificationOpen && (
//             <NotificationCard
//               onClose={() => setNotificationOpen(false)}
//               onViewAll={() => {
//                 setNotificationOpen(false);
//                 setActivePage("notifications");
//               }}
//             />
//           )}
//         </div>

//         <div ref={profileRef} className="relative">
//           <button
//             onClick={() => {
//               setProfileOpen((prev) => !prev);
//               setNotificationOpen(false);
//             }}
//             className="h-11 w-11 cursor-pointer overflow-hidden rounded-full bg-slate-300 transition hover:ring-2 hover:ring-green-500"
//           >
//             {userInfo.profilePicture ? (
//               <img
//                 src={userInfo.profilePicture}
//                 alt="Profile"
//                 className="h-full w-full object-cover"
//               />
//             ) : (
//               <div className="flex h-full w-full items-center justify-center bg-[#D7E3F2]">
//                 <User size={22} className="text-gray-600" />
//               </div>
//             )}
//           </button>

//           {profileOpen && <ProfileCard onClose={() => setProfileOpen(false)} />}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import { Bell, CalendarDays, Clock3, Menu, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ProfileCard from "./ProfileCard";
import NotificationCard from "./Notifications/NotificationCard";
import { useNotification } from "../../hooks/useNotification";

type HeaderProps = {
  username: string;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
  onMenuClick: () => void;
};

const Header = ({
  username,
  setActivePage,
  onMenuClick,
}: HeaderProps) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const { unreadCount } = useNotification();

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target as Node)
      ) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const dayName = today.toLocaleDateString("en-IN", {
    weekday: "long",
  });

  const lastLogin = userInfo.lastLogin
    ? new Date(userInfo.lastLogin).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
      })
    : "First Login";

  return (
    <header
      className="
        relative
        flex
        min-h-24
        flex-col
        justify-center
        border-b
        border-gray-200
        bg-[#f1f1f1]
        px-4
        py-4
        transition-colors
        duration-200
        sm:px-5
        md:px-6
        lg:flex-row
        lg:items-center
        lg:justify-between
        lg:px-8
        lg:py-0
        dark:border-[#29343c]
        dark:bg-[#141c23]
      "
    >
      {/* Mobile / Tablet Top Row */}
      <div className="flex w-full items-center justify-between gap-3 lg:contents">
        {/* Welcome */}
        <div className="flex min-w-0 items-center gap-3">
          {/* Hamburger - mobile/tablet only */}
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open sidebar"
            className="
              flex
              h-10
              w-10
              shrink-0
              cursor-pointer
              items-center
              justify-center
              rounded-lg
              text-slate-700
              transition
              hover:bg-gray-200
              lg:hidden
              dark:text-[#f5f7f8]
              dark:hover:bg-[#192128]
            "
          >
            <Menu size={23} />
          </button>

          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold text-slate-900 sm:text-3xl dark:text-[#f5f7f8] lg:text-3xl">
              Welcome Back!
            </h1>

            <p className="mt-1 truncate text-base text-slate-600 sm:text-lg lg:text-xl dark:text-[#9aa7b1]">
              {username}
            </p>
          </div>
        </div>

        {/* Mobile / Tablet Actions */}
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          {/* Notification */}
          <div ref={notificationRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setNotificationOpen((prev) => !prev);
                setProfileOpen(false);
              }}
              className="
                relative
                flex
                h-10
                w-10
                cursor-pointer
                items-center
                justify-center
                rounded-full
                transition
                hover:bg-gray-200
                dark:hover:bg-[#192128]
              "
            >
              <Bell
                size={22}
                className="text-slate-700 dark:text-[#f5f7f8]"
              />

              {unreadCount > 0 && (
                <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-green-600 ring-2 ring-[#f1f1f1] dark:ring-[#141c23]" />
              )}
            </button>

            {notificationOpen && (
              <NotificationCard
                onClose={() => setNotificationOpen(false)}
                onViewAll={() => {
                  setNotificationOpen(false);
                  setActivePage("notifications");
                }}
              />
            )}
          </div>

          {/* Profile */}
          <div ref={profileRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setProfileOpen((prev) => !prev);
                setNotificationOpen(false);
              }}
              className="
                h-11
                w-11
                cursor-pointer
                overflow-hidden
                rounded-full
                bg-slate-300
                transition
                hover:ring-2
                hover:ring-green-500
              "
            >
              {userInfo.profilePicture ? (
                <img
                  src={userInfo.profilePicture}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#D7E3F2] dark:bg-[#192128]">
                  <User
                    size={22}
                    className="text-gray-600 dark:text-[#f5f7f8]"
                  />
                </div>
              )}
            </button>

            {profileOpen && (
              <ProfileCard
                onClose={() => setProfileOpen(false)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Information + Desktop Actions */}
      <div
        className="
          mt-4
          grid
          w-full
          grid-cols-1
          gap-3
          sm:grid-cols-2
          lg:mt-0
          lg:flex
          lg:w-auto
          lg:items-center
          lg:gap-5
        "
      >
        {/* Last Login */}
        <div
          className="
            group
            flex
            h-16
            min-w-0
            cursor-pointer
            items-center
            gap-4
            rounded-2xl
            border
            border-gray-200
            bg-[#f1f1f1]
            px-4
            shadow-[0_6px_16px_rgba(15,23,42,0.08)]
            transition
            duration-300
            hover:-translate-y-1
            hover:bg-gray-300
            hover:shadow-[0_10px_24px_rgba(15,23,42,0.12)]
            sm:px-5
            lg:min-w-55
            dark:border-[#29343c]
            dark:bg-[#141c23]
            dark:hover:bg-[#192128]
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-white/70
              transition
              duration-300
              group-hover:bg-white
              dark:bg-[#192128]
              dark:group-hover:bg-[#29343c]
            "
          >
            <Clock3 size={24} className="text-green-600" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900 sm:text-base dark:text-[#f5f7f8]">
              Last Login
            </p>

            <p className="truncate text-xs font-medium text-slate-600 sm:text-sm dark:text-[#9aa7b1]">
              {lastLogin}
            </p>
          </div>
        </div>

        {/* Date */}
        <div
          className="
            group
            flex
            h-16
            min-w-0
            cursor-pointer
            items-center
            gap-4
            rounded-2xl
            border
            border-gray-200
            bg-[#f1f1f1]
            px-4
            shadow-[0_6px_16px_rgba(15,23,42,0.08)]
            transition
            duration-300
            hover:-translate-y-1
            hover:bg-gray-300
            hover:shadow-[0_10px_24px_rgba(15,23,42,0.12)]
            sm:px-5
            lg:min-w-60
            dark:border-[#29343c]
            dark:bg-[#141c23]
            dark:hover:bg-[#192128]
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-white/70
              transition
              duration-300
              group-hover:bg-white
              dark:bg-[#192128]
              dark:group-hover:bg-[#29343c]
            "
          >
            <CalendarDays
              size={24}
              className="text-slate-700 dark:text-[#f5f7f8]"
            />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900 sm:text-base dark:text-[#f5f7f8]">
              {formattedDate}
            </p>

            <p className="truncate text-xs font-medium text-slate-600 sm:text-sm dark:text-[#9aa7b1]">
              {dayName}
            </p>
          </div>
        </div>

        {/* Desktop Notification */}
        <div
          ref={notificationRef}
          className="relative hidden lg:block"
        >
          <button
            type="button"
            onClick={() => {
              setNotificationOpen((prev) => !prev);
              setProfileOpen(false);
            }}
            className="
              relative
              flex
              h-10
              w-10
              cursor-pointer
              items-center
              justify-center
              rounded-full
              transition
              hover:bg-gray-300
              dark:hover:bg-[#192128]
            "
          >
            <Bell size={22} className="text-slate-700 dark:text-[#f5f7f8]" />

            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-green-600 ring-2 ring-[#f1f1f1] dark:ring-[#141c23]" />
            )}
          </button>

          {notificationOpen && (
            <NotificationCard
              onClose={() => setNotificationOpen(false)}
              onViewAll={() => {
                setNotificationOpen(false);
                setActivePage("notifications");
              }}
            />
          )}
        </div>

        {/* Desktop Profile */}
        <div
          ref={profileRef}
          className="relative hidden lg:block"
        >
          <button
            type="button"
            onClick={() => {
              setProfileOpen((prev) => !prev);
              setNotificationOpen(false);
            }}
            className="
              h-11
              w-11
              cursor-pointer
              overflow-hidden
              rounded-full
              bg-slate-300
              transition
              hover:ring-2
              hover:ring-green-500
            "
          >
            {userInfo.profilePicture ? (
              <img
                src={userInfo.profilePicture}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#D7E3F2] dark:bg-[#192128]">
                <User
                  size={22}
                  className="text-gray-600 dark:text-[#f5f7f8]"
                />
              </div>
            )}
          </button>

          {profileOpen && (
            <ProfileCard
              onClose={() => setProfileOpen(false)}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;