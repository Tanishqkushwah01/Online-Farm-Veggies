import { Bell, CalendarDays, Clock3, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ProfileCard from "./ProfileCard";
import NotificationCard from "./Notifications/NotificationCard";
import { useNotification } from "../../hooks/useNotification";

type HeaderProps = {
  username: string;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
};

const Header = ({ username, setActivePage }: HeaderProps) => {
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
    <header className="relative flex h-24 items-center justify-between border-b border-gray-200 bg-[#f1f1f1] px-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome Back!</h1>
        <p className="mt-1 text-xl text-slate-600">{username}</p>
      </div>

      <div className="flex items-center gap-5">
        <div className="group flex h-16 min-w-55 cursor-pointer items-center gap-4 rounded-2xl border border-gray-200 bg-[#f1f1f1] px-5 shadow-[0_6px_16px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:bg-gray-300 hover:shadow-[0_10px_24px_rgba(15,23,42,0.12)]">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/70 transition duration-300 group-hover:bg-white">
            <Clock3 size={24} className="text-green-600" />
          </div>

          <div>
            <p className="text-base font-bold text-slate-900">Last Login</p>
            <p className="text-sm font-medium text-slate-600">{lastLogin}</p>
          </div>
        </div>

        <div className="group flex h-16 min-w-60 cursor-pointer items-center gap-4 rounded-2xl border border-gray-200 bg-[#f1f1f1] px-5 shadow-[0_6px_16px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:bg-gray-300 hover:shadow-[0_10px_24px_rgba(15,23,42,0.12)]">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/70 transition duration-300 group-hover:bg-white">
            <CalendarDays size={24} className="text-slate-700" />
          </div>

          <div>
            <p className="text-base font-bold text-slate-900">
              {formattedDate}
            </p>
            <p className="text-sm font-medium text-slate-600">{dayName}</p>
          </div>
        </div>

        <div ref={notificationRef} className="relative">
          <button
            onClick={() => {
              setNotificationOpen((prev) => !prev);
              setProfileOpen(false);
            }}
            className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition hover:bg-gray-300"
          >
            <Bell size={22} className="text-slate-700" />

            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-green-600 ring-2 ring-[#f1f1f1]" />
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

        <div ref={profileRef} className="relative">
          <button
            onClick={() => {
              setProfileOpen((prev) => !prev);
              setNotificationOpen(false);
            }}
            className="h-11 w-11 cursor-pointer overflow-hidden rounded-full bg-slate-300 transition hover:ring-2 hover:ring-green-500"
          >
            {userInfo.profilePicture ? (
              <img
                src={userInfo.profilePicture}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#D7E3F2]">
                <User size={22} className="text-gray-600" />
              </div>
            )}
          </button>

          {profileOpen && <ProfileCard onClose={() => setProfileOpen(false)} />}
        </div>
      </div>
    </header>
  );
};

export default Header;