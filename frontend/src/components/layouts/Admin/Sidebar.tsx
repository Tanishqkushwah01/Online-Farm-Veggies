import {
  LayoutDashboard,
  Users,
  UserRound,
  ShoppingBag,
  ClipboardList,
  Wallet,
  Tags,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
  Leaf,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, active: true },
  { name: "Farmers", icon: UserRound },
  { name: "Customers", icon: Users },
  { name: "Products", icon: ShoppingBag },
  { name: "Orders", icon: ClipboardList },
  { name: "Payments", icon: Wallet },
  { name: "Categories", icon: Tags },
  { name: "Reports", icon: BarChart3 },
  { name: "Messages", icon: MessageSquare },
  { name: "Settings", icon: Settings },
];

const Sidebar = () => {
  return (
    <aside className=" bg-[#F8FAFC] fixed left-0 top-0 h-screen w-70 p-4">
      <div className="flex h-full flex-col rounded-2xl bg-[#f1f1f1]">
        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <Leaf size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900">
              Farm Admin
            </h1>
            <p className="text-sm text-slate-500">Dashboard Panel</p>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 space-y-1 px-3 py-5">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  item.active
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-slate-200 p-3">
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50">
            <LogOut size={19} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;