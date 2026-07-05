import { useState, useRef, useEffect } from "react";
import {
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Heart,
  User,
} from "lucide-react";
import ProfileCard from "./ProfileCard";

// type HeaderProps = {
//   setActivePage: React.Dispatch<React.SetStateAction<string>>;
//   setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
// };
type HeaderProps = {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
  onFilterClick: () => void;
};

const Header = ({ setActivePage, onFilterClick }: HeaderProps) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const user = JSON.parse(localStorage.getItem("userInfo")!);

  // const userInfo = {
  //   username: "Tanishq Kushwah",
  //   email: "tanishq@gmail.com",
  //   profilePicture: "",
  // };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200 px-8 py-4">
      <div className="max-w-full mx-auto flex items-center justify-between gap-8">

        {/* Logo */}
        <div
          onClick={() => setActivePage("home")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="h-12 w-12 rounded-xl bg-green-600 flex items-center justify-center text-white text-xl font-bold">
            🌿
          </div>

          <div>
            <h1 className="text-2xl font-bold text-green-700">
              Farm Veggies
            </h1>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="flex items-center bg-gray-100 rounded-full px-5 h-14">
            <Search className="text-gray-500" size={22} />

            <input
              type="text"
              placeholder="Search fresh vegetables..."
              className="flex-1 bg-transparent outline-none px-3 text-gray-700"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-start gap-5">
          {/* Orders */}
          <button
            onClick={() => setActivePage("orders")}
            className="w-16 flex flex-col items-center cursor-pointer group">
            <div className="h-10 w-10 flex items-center justify-center">
              <ShoppingBag
                size={24}
                className="text-gray-700 group-hover:text-green-600 transition"
              />
            </div>

            <span className="text-xs mt-1 text-gray-700 group-hover:text-green-600 transition">
              Orders
            </span>
          </button>

          {/* Filter */}
          <button
            onClick={onFilterClick}
            className="flex flex-col items-center text-gray-700 hover:text-green-600 transition cursor-pointer">
            <div className="h-10 w-10 flex items-center justify-center">
              <SlidersHorizontal
                size={24}
                className="text-gray-700 group-hover:text-green-600 transition"
              />
            </div>

            <span className="text-xs mt-1 text-gray-700 group-hover:text-green-600 transition">
              Filter
            </span>
          </button>
          {/* <button
            onClick={() => setFilterOpen((prev) => !prev)}
            className="flex flex-col items-center text-gray-700 hover:text-green-600 transition cursor-pointer"
          >
            <SlidersHorizontal size={24} />
            <span className="text-sm mt-1">Filter</span>
          </button> */}

          {/* Wishlist */}
          <button
            onClick={() => setActivePage("wishlist")}
            className="w-16 flex flex-col items-center cursor-pointer group">
            <div className="relative h-10 w-10 flex items-center justify-center">
              <Heart
                size={24}
                className="text-gray-700 group-hover:text-red-500 transition"
              />

              <span className="absolute top-0 right-0 translate-x-1 -translate-y-1 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] font-semibold flex items-center justify-center">
                3
              </span>
            </div>

            <span className="text-xs mt-1 text-gray-700 group-hover:text-red-500 transition">
              Wishlist
            </span>
          </button>

          {/* Profile */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-16 flex flex-col items-center cursor-pointer group"
            >
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center transition group-hover:bg-green-600 overflow-hidden">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User
                    size={22}
                    className="text-green-700 group-hover:text-white transition"
                  />
                )}
              </div>

              <span className="text-xs mt-1 text-gray-700 group-hover:text-green-600 transition">
                Profile
              </span>
            </button>

            {profileOpen && (
              <ProfileCard
                user={user}
                onSettings={() => {
                  setProfileOpen(false);
                  setActivePage("settings");
                }}
                onPrivacy={() => {
                  setProfileOpen(false);
                  setActivePage("privacy");
                }}
                onHelp={() => {
                  setProfileOpen(false);
                  setActivePage("help");
                }}
                onNotification={() => {
                  setProfileOpen(false);
                  setActivePage("notifications");
                }}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;