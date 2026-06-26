import { Bell, ChevronDown, Search, Sun } from "lucide-react";

interface HeaderProps {
  username: string;
}

const Header = ({ username }: HeaderProps) => {
  return (
    <header className="flex w-full items-center justify-between px-8 py-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome Back!
        </h1>

        <p className="mt-1 text-xl font-medium text-slate-600">
          {username}
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search here..."
            className="h-14 w-[350px] rounded-xl border border-slate-300 bg-transparent pl-12 pr-4 text-slate-700 outline-none focus:border-indigo-500"
          />
        </div>

        <Bell size={22} />
        <Sun size={22} />

        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-slate-300" />

          <div>
            <h2 className="font-bold text-slate-900">Admin</h2>
            <p className="text-sm text-slate-500">Super Admin</p>
          </div>

          <ChevronDown size={18} />
        </div>
      </div>
    </header>
  );
};

export default Header;