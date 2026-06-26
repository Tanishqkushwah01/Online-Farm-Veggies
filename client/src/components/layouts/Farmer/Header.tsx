
{/* <div className="h-30 w-full flex justify-between items-center rounded-tr-md bg-black"> */}

import { Bell, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="h-20 bg-white flex items-center justify-between px-8 shadow-sm">
      {/* Search Bar */}
      <div className="relative w-96">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm outline-none transition-all focus:border-green-500 focus:bg-white"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {/* Notification */}
        <button className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 transition hover:bg-gray-200">
          <Bell size={22} className="text-gray-700" />

          {/* Notification Dot */}
          <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </button>

        {/* Profile */}
        <div className="h-12 w-12 cursor-pointer rounded-full bg-slate-300"></div>
      </div>
    </header>
  );
};

export default Header;