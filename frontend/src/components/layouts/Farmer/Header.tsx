import { Bell, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AddProductModal from "./CreateCard";
import ProfileCard from "./ProfileCard";

const Header = ({ username }: { username: string }) => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="relative h-24 bg-[#f1f1f1] flex items-center justify-between px-8 border-b border-gray-200">
      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome Back!
        </h1>

        <p className="mt-1 text-xl text-slate-600">
          {username}
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search here..."
            className="w-[450px] h-12 rounded-2xl border border-slate-300 bg-white pl-14 pr-5 text-base outline-none transition-all focus:border-green-500"
          />
        </div>

        {/* Create */}
        <button
          onClick={() => setOpen(true)}
          className="h-12 px-7 rounded-2xl border border-slate-300 bg-white text-slate-700 font-medium transition hover:bg-gray-300 cursor-pointer"
        >
          Create
        </button>

        {/* Notification */}
        <button className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-300 cursor-pointer">
          <Bell size={22} className="text-slate-700" />
        </button>

        {/* Profile */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="h-11 w-11 rounded-full bg-slate-300 hover:ring-2 hover:ring-green-500 transition cursor-pointer overflow-hidden"
          >
            {/* Uncomment when image is available */}

            {/* <img
              src={userInfo.image}
              alt=""
              className="h-full w-full object-cover"
            /> */}
          </button>

          {profileOpen && (
            <ProfileCard
              onClose={() => setProfileOpen(false)}
            />
          )}
        </div>
      </div>

      <AddProductModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </header>
  );
};

export default Header;