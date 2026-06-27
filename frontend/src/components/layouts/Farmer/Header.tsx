import { Bell, Search } from "lucide-react";
import { useState } from "react";
import AddProductModal from "./CreateCard";

const Header = ({ username }: { username: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <header className="h-24 bg-[#f1f1f1] flex items-center justify-between px-8 border-b border-gray-200">
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
            className="w-112.5 h-12 rounded-2xl border border-slate-300 bg-white pl-14 pr-5 text-base outline-none transition-all focus:border-green-500"
          />
        </div>

        {/* Create Button */}
        <button onClick={() => setOpen(true)}
          className="h-12 px-7 rounded-2xl border border-slate-300 bg-white text-slate-700 font-medium transition hover:bg-gray-300 cursor-pointer">
          Create
        </button>

        {/* Notification */}
        <button className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-300 cursor-pointer">
          <Bell size={22} className="text-slate-700" />
        </button>

        {/* Profile */}
        <div className="h-11 w-11 rounded-full bg-slate-300 cursor-pointer"></div>
      </div>

      <AddProductModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </header>
  );
};

export default Header;